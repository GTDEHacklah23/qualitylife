//starts a simple server
import { app } from "./app";

//connects to the database
import "./util/connectdb";

import apiRouter from "./api/routes";
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.render("index.njk", { user: req.session.username || "none" });
});

app.get("/signup", (req, res) => {
  res.render("signup.njk", { user: req.session.username || "none" });
});
app.get("/leaderboard", (req, res) => {
  res.render("leaderboard.njk");
});

app.get("/login", (req, res) => {
  res.render("login.njk", { user: req.session.username || "none" });
});

app.get("/newpost", (req, res) => {
  res.render("newpost.njk");
});

import forumHandler from "./pages/forum";
app.get("/forum", forumHandler);

import postHandler from "./pages/post";
app.get("/post", postHandler);

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});
