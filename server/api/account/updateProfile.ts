import Joi from "joi";
import { handler } from "../handler";
import { UserProfile } from "../../schema/UserProfile";

const schema = Joi.object({
  biography: Joi.string().required(),
  displayName: Joi.string().min(1).max(40).required(),
});

export default handler(schema, async (req, res, parsed) => {
  const { biography, displayName } = parsed;
  const username = req.session!.username;

  //check if we have a username in the session
  if (!username) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //update the user profile
  try {
    await UserProfile.updateOne(
      { username },
      { biography, displayName }
    ).exec();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ message: "200 - OK" });
});
