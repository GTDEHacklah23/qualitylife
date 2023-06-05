//starts a simple server
import { app } from "./app";

//connects to the database
import "./util/connectdb";

import apiRouter from "./api/routes";
app.use("/api", apiRouter);

app.get("/in", (req, res) => {
  res.render("index.njk");
});

app.get("/signup", (req, res) => {
  res.render("signup.njk");
});

app.get("/login", (req, res) => {
  res.render("login.njk");
});
app.get("/", (req, res) => {
  res.render("forumPst.njk");
});
