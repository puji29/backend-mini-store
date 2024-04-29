const { createProduct,findAllProduct,findById } = require("../usecase/Product_usecase");

const createProductHandler = async(req,res)=>{
    try {
        const newDataProduct = {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          sellingPrice: req.body.sellingPrice,
          stock: req.body.stock,
          image: req.body.file,
          url: req.body.url,
          categoryId: req.body.categoryId,
        };
    
        const result = await createProduct(req, newDataProduct);
    
        res.status(201).json({
          message: "add new Slider succesfully",
          data: result,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const findAllProductHandler = async(req,res)=> {
    try {
        const product = await findAllProduct()

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

const findByIdHandler = async(req,res)=> {
    try {
        const id = req.params.id
        const product = await findById(id)

        res.status(200).json(product)
    } catch (error) {
        if(error.message === 'ID Not Found'){
            res.status(404).json({message: "ID Not Found"})
        }else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = {
    createProductHandler,
    findAllProductHandler,
    findByIdHandler
}