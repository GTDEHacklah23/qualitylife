import Joi from "joi";
import { handler } from "../handler";
import { UserAuth } from "../../schema/UserAuth";
import { hashPassword } from "../../auth/hashPassword";
import { UserMeta } from "../../schema/UserMeta";
import { UserProfile } from "../../schema/UserProfile";
import { UserEvents } from "../../schema/UserEvents";

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

  //delete the user
  try {
    await UserAuth.deleteOne({ username }).exec();
    await UserMeta.deleteOne({ username }).exec();
    await UserProfile.deleteOne({ username }).exec();
    await UserEvents.deleteOne({ username }).exec();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  //also end the session
  req.session.destroy(() => {
    res.status(200).json({ message: "200 - OK" });
  });
});
