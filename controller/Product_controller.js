const {
  createProduct,
  findAllProduct,
  findById,
  findProductByCategory,
} = require("../usecase/Product_usecase");

const createProductHandler = async (req, res) => {
  try {
    const newDataProduct = req.body;

    const result = await createProduct(req, newDataProduct);

    res.status(201).json({
      message: "add new Slider succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllProductHandler = async (req, res) => {
  try {
    const product = await findAllProduct();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const findByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await findById(id);

    res.status(200).json(product);
  } catch (error) {
    if (error.message === "ID Not Found") {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const getproductByCategoryHandler = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const products = await findProductByCategory(categoryName);
    res.json(products);
  } catch (error) {
    if (error.message === "No products found for this category") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
module.exports = {
  createProductHandler,
  findAllProductHandler,
  findByIdHandler,
  getproductByCategoryHandler,
};
