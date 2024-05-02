const path = require("path");
const fs = require("fs");
const { getSliders, addSlider,getSliderById } = require("../repository/Slider_repository");

const findAllSlider =  async() => {
  const [row] = await getSliders();

  return row;
};

const findSliderById = async(id)=> {
    try {
        const slider = await getSliderById(id)
        return slider
    } catch (error) {
        console.error("Error: ", error)
        throw error
    }
}
const createSlider = async (req, newDataSlider) => {
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
    newDataSlider.image = fileName;
    newDataSlider.url = url;

    const result = await addSlider(newDataSlider);
    return result;
  } catch (error) {
    console.log(error);
    throw error; // Pastikan untuk melempar error agar bisa ditangkap oleh catch di controller
  }
};

module.exports = {
  findAllSlider,
  createSlider,
  findSliderById
};
