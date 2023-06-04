import { Router } from "express";
const router = Router();

import accountRouter from "./account/routes";
router.use("/account", accountRouter);

import eventRouter from "./event/routes";
router.use("/event", eventRouter);

export default router;
