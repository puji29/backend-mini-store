const express = require("express")
const { createProductHandler,findAllProductHandler,findByIdHandler } = require("../controller/Product_controller")

const router = express.Router()

router.post('/products', createProductHandler)
router.get('/products', findAllProductHandler)
router.get('/products/:id', findByIdHandler)

module.exports = router