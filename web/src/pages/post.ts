import { whenReady } from "../util/whenReady";

whenReady(() => {
  const returnButton = document.getElementById("return") as HTMLButtonElement;

  returnButton.addEventListener("click", () => {
    window.location.href = "/forum";
  });
});
