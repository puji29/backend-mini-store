const express = require("express");
const {
  findCartHandler,
  createHandler,
  findByidHandler,
  getCartByUserIdHandler,
  updateHandler,
  deleteHandler
} = require("../controller/Cart_controller");


const router = express.Router();

router.get("/carts", findCartHandler);
router.post("/carts", createHandler);
router.get("/carts/:id", findByidHandler);
router.get("/carts/users/:userId", getCartByUserIdHandler);
router.put("/carts/:id", updateHandler);
router.delete("/carts/:id", deleteHandler);

module.exports = router;
