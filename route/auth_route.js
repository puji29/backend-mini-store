const express = require("express");
const {
  loginHandler
} = require("../controller/auth_controller");

const router = express.Router();

router.post("/login", loginHandler);

module.exports = router;