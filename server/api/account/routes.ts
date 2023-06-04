import { Router } from "express";
const router = Router();

import newHandler from "./new";
router.post("/new", newHandler);

import loginHandler from "./login";
router.post("/login", loginHandler);

export default router;
