const createDbConnection = require("../config/Database");

const getSliders = async () => {
  const db = await createDbConnection();

  const slider = await db.query("SELECT * FROM Slider");

  return slider;
};

const getSliderById = async(id)=> {
    const db = await createDbConnection()
    
    const [sliderById] = await db.query("SELECT * FROM Slider WHERE id=?",[id])
    
    if(sliderById.length === 0){
        throw new Error('ID Not Found')
    }

    return sliderById
}

const addSlider = async (newDataSlider) => {
  const db = await createDbConnection();
  const { name, image, url,type } = newDataSlider;

  const result = await db.query(
    "INSERT INTO Slider (name, image, url, type) VALUES (?,?,?,?)",
    [name, image, url, type]
  );

  return result;
};

module.exports = {
  getSliders,
  addSlider,
  getSliderById
};
