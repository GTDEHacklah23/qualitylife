import Joi from "joi";
import { handler } from "../handler";
import { UserAuth } from "../../schema/UserAuth";
import { saltshaker } from "../../auth/saltshaker";
import { hashPassword } from "../../auth/hashPassword";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
});

export default handler(schema, async (req, res, parsed) => {
  const { username, password } = parsed;

  //check if the username is taken
  const result = await UserAuth.findOne({ username }).exec();

  if (result) {
    res.status(409).json({ error: "409 - Conflict" });
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

  await newUser.save();

  res.status(200).json({ username });
});