import express from "express";
const router = express.Router();

import * as notesCtrl from "../../controllers/api/notes";
import requireLogin from "../../middleware/requireLogin";

router.post("/", requireLogin(), notesCtrl.createOne);
router.put("/:id", requireLogin(), notesCtrl.updateOne);
router.delete("/:id", requireLogin(), notesCtrl.deleteOne);
router.get("/", requireLogin(), notesCtrl.readUserOwned);

export default router;
