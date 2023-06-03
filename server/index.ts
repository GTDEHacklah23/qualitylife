//starts a simple server
import { app } from "./app";

app.get("/", (req, res) => {
  res.render("index.njk");
});
