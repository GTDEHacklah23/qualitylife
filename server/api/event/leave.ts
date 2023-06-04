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

  //remove the event from the user's joined events
  userEvents!.joined = userEvents!.joined.filter((event) => event.id !== id);

  try {
    userEvents!.save();
  } catch (e) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  //remove the user from the event
  try {
    await EventRoster.updateOne({ id }, { $pull: { attendees: username } });
    await event.updateOne({ attendees: event.attendees! - 1 });
  } catch (e) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ message: "200 - OK" });
});
