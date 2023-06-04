import Joi from "joi";
import { handler } from "../handler";
import { EventEntry } from "../../schema/Event";
import { EventRoster } from "../../schema/EventRoster";
import { UserEvents } from "../../schema/UserEvents";

const schema = Joi.object({
  id: Joi.string().required(),
});

export default handler(schema, async (req, res, parsed) => {
  const { id } = parsed;
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

  //check if the user is already in the event
  const userEvents = await UserEvents.findOne({ username });

  //loop through userEvents.joined
  for (const event of userEvents!.joined) {
    if (event.id === id) {
      res.status(400).json({ error: "400 - Invalid Request" });
      return;
    }
  }

  //add the user to the event
  try {
    await EventRoster.updateOne({ id }, { $push: { attendees: username } });
    await event.updateOne({ attendees: event.attendees! + 1 });
    await UserEvents.updateOne(
      { username },
      { $push: { joined: { id, time: Date.now() } } }
    );
  } catch (e) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ message: "200 - OK" });
});
