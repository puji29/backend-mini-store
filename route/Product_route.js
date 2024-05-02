const express = require("express")
const { createProductHandler,findAllProductHandler,findByIdHandler,getproductByCategoryHandler } = require("../controller/Product_controller")

const router = express.Router()

router.post('/products', createProductHandler)
router.get('/products', findAllProductHandler)
router.get('/products/:id', findByIdHandler)
router.get('/products/category/:categoryName', getproductByCategoryHandler)

module.exports = router