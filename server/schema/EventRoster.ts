import mongoose from "mongoose";

const EventRosterSchema = new mongoose.Schema({
  id: String,
  attendees: [String],
});

export const EventRoster = mongoose.model(
  "EventRoster",
  EventRosterSchema,
  "EventRoster"
);
