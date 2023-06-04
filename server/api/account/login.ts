import Joi from "joi";
import { handler } from "../handler";
import { UserAuth } from "../../schema/UserAuth";
import { hashPassword } from "../../auth/hashPassword";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(12).required(),
  password: Joi.string().min(8).max(30).required(),
});

export default handler(schema, async (req, res, parsed) => {
  const { username, password } = parsed;

  //find the user
  const userObj = await UserAuth.findOne({ username }).exec();

  if (!userObj) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //check the password
  const salt: string = userObj.salt!;
  const pwdHash = hashPassword(password, salt);

  if (pwdHash !== userObj.pwdHash) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //set the session
  req.session!.username = username;
  res.status(200).json({ username });
});
