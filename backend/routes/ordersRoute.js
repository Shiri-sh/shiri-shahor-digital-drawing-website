const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controller = require("../controllers/ordersCon");
const authenticateToken = require("../authenticate");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "ordersPic/"); 
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });

router.post("/", upload.single("ReferenceImagePath"),authenticateToken('client'), controller.CreateOrder);
router.get("/userOrders",authenticateToken(), controller.GetOrdersOfUser);
router.get('/',authenticateToken('admin'), controller.GetOrders);
router.put('/:orderId/status',authenticateToken('admin'), controller.UpdateOrderStatus);
router.put('/:orderId/price',authenticateToken('admin'), controller.UpdateOrderPrice);
router.delete('/:orderId',authenticateToken('client'), controller.DeleteOrder);

module.exports = router;