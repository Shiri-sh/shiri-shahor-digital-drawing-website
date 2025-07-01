const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentsCon");
const authenticateToken = require("../authenticate");

router.get("/:drawingId", controller.getAllCommentsByDrawing);
router.post("/", authenticateToken(), controller.CreateComment);
router.delete("/:id",authenticateToken(), controller.DeleteComment);

module.exports = router;