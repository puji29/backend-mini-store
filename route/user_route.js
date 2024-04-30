const express = require("express")
const { createHandler } = require("../controller/user_controller")

const router = express.Router()

router.get('/users')
router.post('/users', createHandler)

module.exports = router