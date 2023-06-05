import { Request, Response } from "express";
import { EventEntry } from "../schema/Event";

export default async function handler(req: Request, res: Response) {
  const { workshops, campaigns, miss, seminars } = req.query;

  const filter: string[] = [];

  if (workshops) {
    filter.push("workshop");
  }

  if (campaigns) {
    filter.push("campaign");
  }

  if (miss) {
    filter.push("misc");
  }

  if (seminars) {
    filter.push("seminar");
  }

  //look for events with mat
  let events = await EventEntry.find({}).exec();

  events = events.filter((e) => {
    if (filter.length === 0) {
      return true;
    }

    //check for a shared entry in the two arrays
    for (const tag of e.tags) {
      if (filter.includes(tag)) {
        return true;
      }
    }
  });

  res.render("forum.njk", {
    events: events,
    user: req.session.username || "none",
  });
}
