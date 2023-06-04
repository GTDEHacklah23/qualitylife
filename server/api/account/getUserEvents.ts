import Joi from "joi";
import { handler } from "../handler";
import { UserEvents } from "../../schema/UserEvents";

const schema = Joi.object({});

interface SanitizedEvent {
  id: string;
  time: number;
}

interface SanitizedUserEvents {
  created: SanitizedEvent[];
  joined: SanitizedEvent[];
}

export default handler(schema, async (req, res) => {
  const username = req.session!.username;

  //check if we have a username in the session
  if (!username) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //get the user's events
  const userEvents = await UserEvents.findOne({ username }).exec();

  if (!userEvents) {
    res.status(404).json({ error: "404 - Not Found" });
    return;
  }

  const events: SanitizedUserEvents = {
    created: [],
    joined: [],
  };

  //santize and add the events to the response
  for (const event of userEvents.created) {
    events.created.push({
      id: event.id!,
      time: event.time!,
    });
  }

  for (const event of userEvents.joined) {
    events.joined.push({
      id: event.id!,
      time: event.time!,
    });
  }

  res.json(events);
});
