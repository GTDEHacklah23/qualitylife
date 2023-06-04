//starts a simple server
import { app } from "./app";

//connects to the database
import "./util/connectdb";

import apiRouter from "./api/routes";
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.render("index.njk");
});
