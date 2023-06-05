import axios from "axios";
import { whenReady } from "../util/whenReady";

whenReady(() => {
  const returnButton = document.getElementById("return") as HTMLButtonElement;

  returnButton.addEventListener("click", () => {
    window.location.href = "/forum";
  });

  //get query string
  const queryString = window.location.search;

  //get id param
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  axios.post("/api/event/join", {
    id,
  });
});
