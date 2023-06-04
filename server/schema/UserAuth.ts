import mongoose from "mongoose";

const UserAuthSchema = new mongoose.Schema({
  username: String,
  pwdHash: String,
  salt: String,
});

export const UserAuth = mongoose.model("UserAuth", UserAuthSchema, "UserAuth");
