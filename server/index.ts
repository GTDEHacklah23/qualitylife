//starts a simple server
import { app } from "./app";

//connects to the database
import "./util/connectdb";

import apiRouter from "./api/routes";
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.render("index.njk");
});

app.get("/signup", (req, res) => {
  res.render("signup.njk");
});

app.get("/login", (req, res) => {
  res.render("login.njk");
});

app.get("/newpost", (req, res) => {
  res.render("newpost.njk");
});

import forumHandler from "./pages/forum";
app.get("/forum", forumHandler);

import postHandler from "./pages/post";
app.get("/post", postHandler);
