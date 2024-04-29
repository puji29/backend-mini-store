const path = require("path");
const fs = require("fs");
const {
  getCategory,
  addCategory,
  getCategoryById
} = require("../repository/Category_repository");

const findCategory = async () => {
  const [row] = await getCategory();

  return row;
};

const findCategoryById = async(id)=>{
  try {
    const category = await getCategoryById(id)

    return category
  } catch (error) {
    console.error("Error: ", error)
    throw error
  }


}
const createCategory = async (req, newDataCategory) => {
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
      console.log('File URL:', url);
  
      // Pastikan untuk menugaskan URL ke property yang benar
      newDataCategory.image = fileName;
      newDataCategory.url = url;
  
  
      const result = await addCategory(newDataCategory);
      return result;
    } catch (error) {
      console.log(error);
      throw error; // Pastikan untuk melempar error agar bisa ditangkap oleh catch di controller
    }
  };
  
module.exports = {
  findCategory,
  createCategory,
  findCategoryById

};
