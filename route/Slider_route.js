const express = require("express")
const { findAllHandler,addHandler,findByIdHandler } = require("../controller/Slider_controller")

const router = express.Router()

router.get('/sliders', findAllHandler)
router.get('/sliders/:id', findByIdHandler)
router.post('/sliders', addHandler)

module.exports = router