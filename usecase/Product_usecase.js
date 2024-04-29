const path = require("path");
const fs = require("fs");
const {
  addProduct,
  getAllProduct,
  getProductById,
} = require("../repository/Product_repository");

const createProduct = async (req, newDataProduct) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("No file upload found");
    }
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      throw new Error("Invalid image type");
    }
    if (fileSize > 5000000) {
      throw new Error("Image must be less than 5 MB");
    }

    const savePath = `./public/images/${fileName}`;
    await file.mv(savePath);

    // Log untuk memastikan URL telah dibuat dengan benar
    console.log("File URL:", url);

    // Pastikan untuk menugaskan URL ke property yang benar
    newDataProduct.image = fileName;
    newDataProduct.url = url;

    const result = await addProduct(newDataProduct);
    return result;
  } catch (error) {
    console.log(error);
    throw error; // Pastikan untuk melempar error agar bisa ditangkap oleh catch di controller
  }
};

const findAllProduct = async () => {
  const product = await getAllProduct();

  return product;
};

const findById = async (id) => {
  try {
    const productById = await getProductById(id);

    return productById;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
module.exports = {
  createProduct,
  findAllProduct,
  findById
};
