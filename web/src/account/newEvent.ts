import axios from "axios";
import Joi from "joi";

export async function newEvent(
  name: string,
  description: string,
  startTimestamp: number,
  endTimestamp: number,
  location: string,
  zipCode: number,
  tags: string[]
): Promise<string> {
  const isNameValid = Joi.string().min(1).max(30).validate(name);
  const isDescriptionValid = Joi.string().min(1).max(500).validate(description);
  const isStartTimestampValid = Joi.number().integer().validate(startTimestamp);
  const isEndTimestampValid = Joi.number().integer().validate(endTimestamp);
  const isLocationValid = Joi.string().min(1).max(80).validate(location);
  const isZipCodeValid = Joi.number()
    .integer()
    .min(10000)
    .max(99999)
    .validate(zipCode);
  const isTagsValid = Joi.array().items(Joi.string()).validate(tags);

  if (
    isNameValid.error ||
    isDescriptionValid.error ||
    isStartTimestampValid.error ||
    isEndTimestampValid.error ||
    isLocationValid.error ||
    isZipCodeValid.error ||
    isTagsValid.error
  ) {
    throw new Error("Invalid argument");
  }

  try {
    const response = await axios.post(
      "/api/event/new",
      {
        image: "default",
        name,
        description,
        startTimestamp,
        endTimestamp,
        location,
        zipCode,
        tags,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.id as string;
  } catch (error: any) {
    //400
    if (error.response.status === 400) {
      throw new Error("Invalid argument");
    }

    //401
    if (error.response.status === 401) {
      throw new Error("Unauthorized");
    }

    throw error;
  }
}
