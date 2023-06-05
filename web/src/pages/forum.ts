import { whenReady } from "../util/whenReady";

whenReady(() => {
  const newPostButton = document.getElementById("newPost") as HTMLButtonElement;

  newPostButton.addEventListener("click", () => {
    window.location.href = "/newpost";
  });

  const allPosts = document.getElementById("allPosts") as HTMLInputElement;
  const workshops = document.getElementById("workshops") as HTMLInputElement;
  const campaigns = document.getElementById("campaigns") as HTMLInputElement;
  const seminars = document.getElementById("seminars") as HTMLInputElement;
  const miss = document.getElementById("miss") as HTMLInputElement;

  const searchButton = document.getElementById("search") as HTMLButtonElement;

  searchButton.addEventListener("click", () => {
    //construct a query string
    let query = "?";
    if (allPosts.checked) query += "allPosts=true&";
    if (workshops.checked) query += "workshops=true&";
    if (campaigns.checked) query += "campaigns=true&";
    if (seminars.checked) query += "seminars=true&";
    if (miss.checked) query += "miss=true&";

    window.location.href = "/forum" + query;
  });
});
