import axios from "axios";
import Joi from "joi";

export async function login(
  username: string,
  password: string
): Promise<string> {
  //do some preliminary validation
  const isUsernameValid = Joi.string()
    .alphanum()
    .min(3)
    .max(12)
    .validate(username);
  const isPasswordValid = Joi.string().min(8).max(30).validate(password);

  if (isUsernameValid.error || isPasswordValid.error) {
    throw new Error("Invalid username or password");
  }

  try {
    const response = await axios.post(
      "/api/account/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.username as string;
  } catch (error: any) {
    //if error is 401
    if (error.response.status === 401) {
      throw new Error("Invalid username or password");
    }

    throw error;
  }
}
