import Joi from "joi";
import { handler } from "../handler";
import { UserAuth } from "../../schema/UserAuth";
import { saltshaker } from "../../auth/saltshaker";
import { hashPassword } from "../../auth/hashPassword";
import { lookup } from "zipcodes";
import { UserMeta } from "../../schema/UserMeta";
import { UserProfile } from "../../schema/UserProfile";
import { UserEvents } from "../../schema/UserEvents";

//Yeah no way I'm writing that regex myself
//https://stackoverflow.com/a/12155517
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^((?=(.*[\d0-9@&#$?%!|(){}[\]]){2,})(?=(.*[a-zA-Z]){2,}).{8,})$/)
    .required(),
  email: Joi.string().email().required(),
  zipCode: Joi.number().integer().min(10000).max(99999).required(),
});

export default handler(schema, async (req, res, parsed) => {
  const { username, password, email, zipCode } = parsed;

  //check if the username is taken
  const result = await UserAuth.findOne({ username }).exec();

  if (result) {
    res.status(409).json({ error: "409 - Conflict" });
    return;
  }

  //check if the zip code is valid
  const zipInfo = lookup(parseInt(zipCode));

  if (!zipInfo) {
    res.status(400).json({ error: "400 - Invalid Request" });
    return;
  }

  //create a new user
  const salt = saltshaker();
  const pwdHash = hashPassword(password, salt);

  //remove password from memory
  delete parsed.password;

  const newUser = new UserAuth({
    username,
    pwdHash,
    salt,
  });

  //create a new user meta
  const newUserMeta = new UserMeta({
    username,
    email,
    profileImage: "",
    dateJoined: Date.now(),
    zipCode,
  });

  //create a new user profile
  const newUserProfile = new UserProfile({
    username,
    biography: "",
    displayName: username,
    badges: [],
    points: 0,
    eventsHosted: 0,
    eventsAttended: 0,
    totalHours: 0,
  });

  //create new user events entry
  const newUserEvents = new UserEvents({
    username,
    created: [],
    joined: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  //only save these if the user is successfully created

  try {
    await newUserMeta.save();
    await newUserProfile.save();
    await newUserEvents.save();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ username });
});
