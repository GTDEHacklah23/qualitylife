import "../util/env";
import expressSession from "express-session";

const oneDay = 1000 * 60 * 60 * 24;

//double check that a SESSION_SECRET is set
if (!process.env.SESSION_SECRET) {
  console.warn(
    "SESSION_SECRET environment variable not set, cannot operate securely!"
  );
}

//double check that a MONGO_SECRET is set
if (!process.env.MONGO_SECRET) {
  console.warn(
    "MONGO_SECRET environment variable not set, cannot operate securely!"
  );
}

//database link
import MongoStore from "connect-mongo";

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  mongoOptions: {},
  collectionName: "sessions",
  crypto: {
    secret: process.env.MONGO_SECRET || "SuperSecretMongoSecret",
  },
});

export const sessionMiddleware = expressSession({
  cookie: {
    maxAge: oneDay,
    secure: process.env.ENVIROMENT !== "dev",
  },
  name: "session",
  secret: process.env.SESSION_SECRET || "superSecretSecret",
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  store: sessionStore,
});
