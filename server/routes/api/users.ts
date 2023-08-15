import express from "express";
const router = express.Router();

import usersCtrl from "../../controllers/api/users";
import requireLogin from "../../middleware/requireLogin.ts";

router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/check-token", requireLogin(), usersCtrl.checkToken);

export default router;
