const {
  findAllSlider,
  createSlider,
  findSliderById,
} = require("../usecase/Slider_usecase");



const findAllHandler =  async(req, res) => {
  try {
    const slider = await findAllSlider();
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: "failed get data slider" });
    console.log(error);
  }
};

const findByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const slider = await findSliderById(id);

    res.status(200).json(slider);
  } catch (error) {
    if(error.message === 'ID Not Found'){
        res.status(404).json({message: "ID Not Found"})
    }else {
        res.status(500).json({ message: "Internal server error" });
    }
  }
};

const addHandler = async (req, res) => {
  try {
    const newDataCategory = {
      name: req.body.name,
      image: req.body.file,
      url: req.body.url,
      type: req.body.type,
    };

    const result = await createSlider(req, newDataCategory);

    res.status(201).json({
      message: "add new Slider succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllHandler,
  addHandler,
  findByIdHandler
};
