//This file is used to add types to the session object
//Also a horrible hack to get the customizable session object to work with typescript
//Uses declaration merging
//https://www.typescriptlang.org/docs/handbook/declaration-merging.html
//Import of module stops existing types from being overwritten
//Solution found https://github.com/expressjs/session/issues/799#issuecomment-761549526

import "express-session";
declare module "express-session" {
  interface SessionData {
    username: string;
  }
}
