const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/drawingsCon");
const authenticateToken = require("../authenticate");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'portraits/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = uuidv4() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.get("/:categoryId", controller.GetDrawingsByCategory);
router.post("/",upload.single("Source"), authenticateToken('admin'),controller.CreateDrawing);
router.put("/Name/:id",authenticateToken('admin'), controller.UpdateDrawingName);
router.put("/Description/:id",authenticateToken('admin'), controller.UpdateDrawingDescription);
router.put("/Category/:id",authenticateToken('admin'), controller.UpdateDrawingCategory);
router.delete("/:id",authenticateToken('admin'), controller.DeleteDrawing);

module.exports = router;