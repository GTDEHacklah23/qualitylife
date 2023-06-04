import { Router } from "express";
const router = Router();

import topHandler from "./top";
router.get("/top", topHandler);

export default router;
