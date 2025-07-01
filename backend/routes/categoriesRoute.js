const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoriesCon");
const authenticateToken = require("../authenticate");

router.get("/", controller.GetCategories);
router.post("/",authenticateToken('admin'), controller.CreateCategory);
router.delete("/:id",authenticateToken('admin'), controller.DeleteCategory);

module.exports = router;