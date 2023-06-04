import Joi from "joi";
import { handler } from "../handler";
import { EventEntry } from "../../schema/Event";

const schema = Joi.object({
  ids: Joi.array().items(Joi.string()).required(),
});

interface SanitizedEvent {
  id: string;
  image: string;
  name: string;
  description: string;
  startTimestamp: number;
  endTimestamp: number;
  location: string;
  zipCode: string;
  author: string;
  tags: string[];
  attendees: number;
}

export default handler(schema, async (req, res) => {
  const username = req.session!.username;

  //check if we have a username in the session
  if (!username) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //get all the events
  const events = await EventEntry.find({
    id: { $in: req.body.ids },
  }).exec();

  //santize and add the events to the response
  const sanitizedEvents: SanitizedEvent[] = [];

  for (const event of events) {
    sanitizedEvents.push({
      id: event.id!,
      image: event.image!,
      name: event.name!,
      description: event.description!,
      startTimestamp: event.startTimestamp!,
      endTimestamp: event.endTimestamp!,
      location: event.location!,
      zipCode: event.zipCode!,
      author: event.author!,
      tags: event.tags!,
      attendees: event.attendees!,
    });
  }

  res.json(sanitizedEvents);
});
