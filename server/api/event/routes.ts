import { Router } from "express";
const router = Router();

import newHandler from "./new";
router.post("/new", newHandler);

export default router;
