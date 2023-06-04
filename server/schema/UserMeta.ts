import mongoose from "mongoose";

const UserMetaSchema = new mongoose.Schema({
  username: String,
  email: String,
  profileImage: String,
  dateJoined: Number,
  zipCode: String,
});

export const UserMeta = mongoose.model("UserMeta", UserMetaSchema, "UserMeta");
