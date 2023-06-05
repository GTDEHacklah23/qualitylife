import { register } from "../account/register";
import { login } from "../account/login";
import { whenReady } from "../util/whenReady";
import Joi from "joi";

whenReady(() => {
  const submitButton = document.getElementById("submit") as HTMLButtonElement;

  const emailInput = document.getElementById("email-input") as HTMLInputElement;
  const usernameInput = document.getElementById(
    "username-input"
  ) as HTMLInputElement;
  const pwdInput = document.getElementById("pwd-input") as HTMLInputElement;
  const pwdConfirmInput = document.getElementById(
    "pwd-confirm-input"
  ) as HTMLInputElement;
  const zipInput = document.getElementById("zip-input") as HTMLInputElement;

  function showWarning(text: string): void {
    const warning = document.getElementById("warningtext") as HTMLDivElement;
    warning.style.display = "block";
    warning.innerText = text;
  }

  submitButton.addEventListener("click", async () => {
    //check if the passwords match
    if (pwdInput.value !== pwdConfirmInput.value) {
      showWarning("Passwords do not match");
      return;
    }

    //check if the password matches criteria
    const isPasswordValid = Joi.string()
      .min(8)
      .max(30)
      .pattern(
        /^((?=(.*[\d0-9@&#$?%!|(){}[\]]){2,})(?=(.*[a-zA-Z]){2,}).{8,})$/
      )
      .validate(pwdInput.value);

    if (isPasswordValid.error) {
      showWarning("Password does not meet criteria");
      return;
    }

    try {
      const username = await register(
        usernameInput.value,
        pwdInput.value,
        emailInput.value,
        parseInt(zipInput.value)
      );

      //login automatically
      await login(username, pwdInput.value);

      //store username in local storage
      localStorage.setItem("username", username);

      //redirect to home page
      window.location.href = "/forum";
    } catch (err: any) {
      //if error is Invalid details, show warning
      if (err.message === "Invalid details") {
        showWarning("Invalid details");
      }

      //Username already taken
      if (err.message === "Username already taken") {
        showWarning("Username already taken");
      }
    }
  });
});
