import { Router } from "express";
const router = Router();

import newHandler from "./new";
router.post("/new", newHandler);

import updateHandler from "./update";
router.post("/update", updateHandler);

import joinHandler from "./join";
router.post("/join", joinHandler);

import leaveHandler from "./leave";
router.post("/leave", leaveHandler);

export default router;
