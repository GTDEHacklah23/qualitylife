import { Request, Response } from "express";
import { EventEntry } from "../schema/Event";
import { UserEvents } from "../schema/UserEvents";

export default async function handler(req: Request, res: Response) {
  const { id } = req.query;

  if (!id) {
    //404
    res.status(404).json({ message: "Not Found" });
    return;
  }

  //get the event from the database
  const event = await EventEntry.findOne({ id: id }).exec();

  if (!event) {
    //404
    res.status(404).json({ message: "Not Found" });
    return;
  }

  //pull the author's events
  const authorEvents = await UserEvents.findOne({
    username: event.author,
  }).exec();

  if (!authorEvents) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  //get the event creation time
  const creationTime = authorEvents.created.find(
    (e) => e.id === event.id
  )?.time;

  if (!creationTime) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  //convert the unix timestamp into a mm/dd/yyyy format
  const date = new Date(event.startTimestamp as number);
  const dateString = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const startTimeString = date.toTimeString().split(" ")[0];
  const finish = new Date(event.endTimestamp as number);
  const finishTimeString = finish.toTimeString().split(" ")[0];

  //render the page
  res.render("post.njk", {
    event: event,
    data: {
      date: dateString,
      startTime: startTimeString,
      endTime: finishTimeString,
    },
    user: req.session.username || "none",
  });
}
