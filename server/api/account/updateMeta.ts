import Joi from "joi";
import { handler } from "../handler";
import { lookup } from "zipcodes";
import { UserMeta } from "../../schema/UserMeta";

const schema = Joi.object({
  email: Joi.string().email().required(),
  profileImage: Joi.string().required(),
  zipCode: Joi.number().integer().min(10000).max(99999).required(),
});

export default handler(schema, async (req, res, parsed) => {
  const { email, profileImage, zipCode } = parsed;
  const username = req.session!.username;

  //check if we have a username in the session
  if (!username) {
    res.status(401).json({ error: "401 - Unauthorized" });
    return;
  }

  //check if the zip code is valid
  const zipInfo = lookup(parseInt(zipCode));

  if (!zipInfo) {
    res.status(400).json({ error: "400 - Invalid Request" });
    return;
  }

  //update the user meta
  try {
    await UserMeta.updateOne(
      { username },
      { email, profileImage, zipCode }
    ).exec();
  } catch (err) {
    res.status(500).json({ error: "500 - Internal Server Error" });
    return;
  }

  res.status(200).json({ message: "200 - OK" });
});
