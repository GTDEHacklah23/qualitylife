import { login } from "../account/login";
import { whenReady } from "../util/whenReady";

whenReady(() => {
  const submitButton = document.getElementById("submit") as HTMLButtonElement;

  const usernameInput = document.getElementById(
    "username-input"
  ) as HTMLInputElement;
  const pwdInput = document.getElementById("pwd-input") as HTMLInputElement;

  function showWarning(text: string): void {
    const warning = document.getElementById("warningtext") as HTMLDivElement;
    warning.style.display = "block";
    warning.innerText = text;
  }

  submitButton.addEventListener("click", async () => {
    try {
      const username = await login(usernameInput.value, pwdInput.value);

      //store username in local storage
      localStorage.setItem("username", username);

      //redirect to home page
      window.location.href = "/";
    } catch (err: any) {
      //if error is Invalid username or password, show warning
      if (err.message === "Invalid username or password") {
        showWarning("Invalid username or password");
      }
    }
  });
});
