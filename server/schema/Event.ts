import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  id: String,
  image: String,
  name: String,
  description: String,
  startTimestamp: Number,
  endTimestamp: Number,
  location: String,
  zipCode: String,
  author: String,
  tags: [String],
  attendees: Number,
});

export const Event = mongoose.model("Event", EventSchema, "Event");
