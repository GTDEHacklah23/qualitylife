import Joi from "joi";
import { handler } from "../handler";
import { lookup } from "zipcodes";
import { validTags } from "../../util/tags";
import { v4 as uuidv4 } from "uuid";
import { EventEntry } from "../../schema/Event";
import { EventRoster } from "../../schema/EventRoster";
import { UserEvents } from "../../schema/UserEvents";
import { UserProfile } from "../../schema/UserProfile";

const schema = Joi.object({
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

  //create the event
  const newEvent = new EventEntry({
    id: uuidv4(),
    image,
    name,
    description,
    startTimestamp,
    endTimestamp,
    location,
    zipCode,
    author: username,
    tags,
    attendees: 0,
  });

  try {
    await newEvent.save();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  //create the event roster
  const newEventRoster = new EventRoster({
    id: newEvent.id,
    attendees: [],
  });

  try {
    await newEventRoster.save();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  //add the event to the user's created events
  try {
    await UserEvents.updateOne(
      { username },
      {
        $push: {
          created: {
            id: newEvent.id,
            time: Date.now(),
          },
        },
      }
    );
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  //give the user 10 points
  try {
    await UserProfile.updateOne({ username }, { $inc: { points: 10 } });
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ id: newEvent.id });
});
