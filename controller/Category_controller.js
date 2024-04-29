const {
  findCategory,
  createCategory,
  findCategoryById,
} = require("../usecase/Category_usecase");

const findHandler = async (req, res) => {
  try {
    const category = await findCategory();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "failed get data category" });
    console.log(error.message);
  }
};

const findByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await findCategoryById(id);

    res.status(200).json(category);
  } catch (error) {
    if (error.message === "Id Not found") {
      res.status(404).json({ message: "ID Not Found" });
    } else {
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
    };

    const result = await createCategory(req, newDataCategory);

    res.status(201).json({
      message: "add new category succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findHandler,
  addHandler,
  findByIdHandler
};
