const express = require("express");
const {
  createOrderHandler,getOrderByOrderItemHandler
} = require("../controller/order_controller");

const router = express.Router();

router.post("/orders", createOrderHandler);
router.get("/orders", getOrderByOrderItemHandler);

module.exports = router;