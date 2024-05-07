const express = require("express");
const {
  createOrderHandler,getOrderByOrderItemHandler,deleteOrderHandler
} = require("../controller/order_controller");

const router = express.Router();

router.post("/orders", createOrderHandler);
router.get("/orders", getOrderByOrderItemHandler);
router.delete("/orders/:id", deleteOrderHandler);

module.exports = router;