import Joi from "joi";
import { handler } from "../handler";
import { EventEntry } from "../../schema/Event";
import { EventRoster } from "../../schema/EventRoster";
import { UserEvents } from "../../schema/UserEvents";
import { UserProfile } from "../../schema/UserProfile";
import { deltaToHours } from "../../util/deltaToHours";

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

  //this is a hacky way of doing this, but it works
  const lengthBefore = userEvents!.joined.length;
  userEvents!.joined = userEvents!.joined.filter((event) => event.id !== id);
  const lengthAfter = userEvents!.joined.length;

  //if the length didn't change, the user wasn't in the event
  if (lengthBefore == lengthAfter) {
    res.status(400).json({ error: "400 - Invalid Request" });
    return;
  }

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

  //calculate the number of hours in the event
  const hours = deltaToHours(event.startTimestamp!, event.endTimestamp!);

  //remove stats from the user
  try {
    await UserProfile.updateOne(
      { username },
      { $inc: { points: -5, eventsAttended: -1, totalHours: -hours } }
    );

    //and the event creator 5 points
    await UserProfile.updateOne(
      { username: event.author },
      { $inc: { points: -5 } }
    );
  } catch (e) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ message: "200 - OK" });
});
