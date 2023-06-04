import { Router } from "express";
const router = Router();

import newHandler from "./new";
router.post("/new", newHandler);

import loginHandler from "./login";
router.post("/login", loginHandler);

import logoutHandler from "./logout";
router.post("/logout", logoutHandler);

import deleteHandler from "./delete";
router.post("/delete", deleteHandler);

import updateMetaHandler from "./updateMeta";
router.post("/updateMeta", updateMetaHandler);

export default router;
