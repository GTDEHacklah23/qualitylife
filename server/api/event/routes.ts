import { Router } from "express";
const router = Router();

import newHandler from "./new";
router.post("/new", newHandler);

import updateHandler from "./update";
router.post("/update", updateHandler);

export default router;
