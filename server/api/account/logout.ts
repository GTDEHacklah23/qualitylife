import Joi from "joi";
import { handler } from "../handler";

const schema = Joi.object({});

export default handler(schema, async (req, res) => {
  //clear the session
  req.session!.destroy(() => {
    res.status(200).json({ message: "Logged out" });
  });
});
