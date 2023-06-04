import mongoose from "mongoose";

const UserEventsSchema = new mongoose.Schema({
  username: String,
  created: [{ id: String, time: Number }],
  joined: [{ id: String, time: Number }],
});

export const UserEvents = mongoose.model(
  "UserEvents",
  UserEventsSchema,
  "UserEvents"
);
