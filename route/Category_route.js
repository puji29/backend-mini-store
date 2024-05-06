const express = require("express")
const { findHandler,addHandler,findByIdHandler } = require("../controller/Category_controller")


const router = express.Router()


router.get('/categories', findHandler)
router.post('/categories', addHandler)
router.get('/categories/:id', findByIdHandler)

module.exports = router