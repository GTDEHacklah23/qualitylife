import Joi from "joi";
import { handler } from "../handler";
import { lookup } from "zipcodes";
import { validTags } from "../../util/tags";
import { EventEntry } from "../../schema/Event";

const schema = Joi.object({
  id: Joi.string().required(),
  image: Joi.string().required(),
  name: Joi.string().min(1).max(40).required(),
  description: Joi.string().min(1).max(500).required(),
  startTimestamp: Joi.number().integer().required(),
  endTimestamp: Joi.number().integer().required(),
  location: Joi.string().min(1).max(80).required(),
  zipCode: Joi.number().integer().min(10000).max(99999).required(),
  tags: Joi.array().items(Joi.string()).required(),
});

export default handler(schema, async (req, res, parsed) => {
  const {
    image,
    name,
    description,
    startTimestamp,
    endTimestamp,
    location,
    zipCode,
    tags,
  } = parsed;
  const username = req.session!.username;

  //check if we have a username in the session
  if (!username) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //check if the event exists
  const event = await EventEntry.findOne({ id: parsed.id });

  if (!event) {
    res.status(400).json({ error: "400 - Invalid Request" });
    return;
  }

  //check if the user is the owner of the event
  if (event.author !== username) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //check if the zip code is valid
  const zipInfo = lookup(parseInt(zipCode));

  if (!zipInfo) {
    res.status(400).json({ error: "400 - Invalid Request" });
    return;
  }

  //check if the start time is before the end time
  if (startTimestamp >= endTimestamp) {
    res.status(400).json({ error: "400 - Invalid Request" });
    return;
  }

  //check if the tags are valid
  for (const tag of tags) {
    if (!validTags.includes(tag)) {
      res.status(400).json({ error: "400 - Invalid Request" });
      return;
    }
  }

  //update the event
  try {
    await EventEntry.updateOne(
      { id: parsed.id },
      {
        image,
        name,
        description,
        startTimestamp,
        endTimestamp,
        location,
        zipCode,
        tags,
      }
    ).exec();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ message: "Event updated" });
});
