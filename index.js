const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
require("dotenv").config()
const CategoryRoute = require("./route/Category_route.js")
const SliderRoute = require("./route/Slider_route.js")
const ProductRoute = require("./route/Product_route.js")
const CartRoute = require("./route/Cart_route.js")
const PORT = process.env.API_PORT || 4000

app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.static("public"))
app.use(CategoryRoute)
app.use(SliderRoute)
app.use(ProductRoute)
app.use(CartRoute)



app.listen(PORT, console.log(`server running on ${PORT}`))