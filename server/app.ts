//creates and initializes the express app
import "./util/env";

import express from "express";

export const app = express();

import nunjucks from "nunjucks";
nunjucks.configure("./web/views", {
  autoescape: true,
  express: app,
});

const oneWeek = 1000 * 60 * 60 * 24 * 7;

const cacheTime = process.env.ENVIROMENT === "dev" ? 0 : oneWeek;

app.use("/asset", express.static("./web/assets", { maxAge: cacheTime }));

import https from "https";
import { certConfig, getCertConfig } from "./util/getCertConfig";

const httpsPort = process.env.HTTPS_PORT || 443;
let httpsCerts: certConfig = null!;
try {
  httpsCerts = getCertConfig();
  https.createServer(httpsCerts, app).listen(httpsPort);
} catch (e) {
  console.warn("Could not start HTTPS, running in HTTP-only mode");
}

import http from "http";

const httpPort = process.env.HTTP_PORT || 80;
http.createServer(app).listen(httpPort);
