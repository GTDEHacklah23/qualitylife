import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  username: String,
  biography: String,
  displayName: String,
  badges: [String],
  points: Number,
  eventsHosted: Number,
  eventsAttended: Number,
  totalHours: Number,
});

export const UserProfile = mongoose.model(
  "UserProfile",
  UserProfileSchema,
  "UserProfile"
);
