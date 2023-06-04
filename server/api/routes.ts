import { Router } from "express";
const router = Router();

import accountRouter from "./account/routes";
router.use("/account", accountRouter);

export default router;
