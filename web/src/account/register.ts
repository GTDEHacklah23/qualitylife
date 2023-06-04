import axios from "axios";
import Joi from "joi";

export async function register(
  username: string,
  password: string,
  email: string,
  zipCode: number
): Promise<string> {
  //do some preliminary validation
  const isUsernameValid = Joi.string()
    .alphanum()
    .min(3)
    .max(12)
    .validate(username);
  const isPasswordValid = Joi.string().min(8).max(30).validate(password);
  const isEmailValid = Joi.string()
    .email({ tlds: { allow: false } })
    .validate(email);
  const isZipCodeValid = Joi.number()
    .integer()
    .min(10000)
    .max(99999)
    .validate(zipCode);

  if (
    isUsernameValid.error ||
    isPasswordValid.error ||
    isEmailValid.error ||
    isZipCodeValid.error
  ) {
    throw new Error("Invalid details");
  }
  
  try {
    const response = await axios.post(
      "/api/account/new",
      {
        username,
        password,
        email,
        zipCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.username as string;
  } catch (error: any) {
    //if error is 409
    if (error.response.status === 409) {
      throw new Error("Username already taken");
    }

    throw error;
  }
}
