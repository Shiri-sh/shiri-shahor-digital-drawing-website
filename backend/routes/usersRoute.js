const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersCon");

router.post("/login", controller.GetUserByPassword);
router.post("/signup", controller.CreateUser);

module.exports = router;