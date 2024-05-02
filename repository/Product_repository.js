const createDbConnection = require("../config/Database");

const addProduct = async(newDataProduct)=>{
    const db = await createDbConnection()

    const { name,description,price,sellingPrice,stock,image,url,categoryId } = newDataProduct

    const product = await db.query("INSERT INTO Proudct (name,description,price,sellingPrice,stock,image,url,category_id) VALUES (?,?,?,?,?,?,?,?)",[name,description,price,sellingPrice,stock,image,url,categoryId])

    return product
}

const getAllProduct = async()=>{
    const db = await createDbConnection()

    const product = await db.query("SELECT * FROM Proudct")

    return product
}

const getProductById = async(id)=>{
    const db = await createDbConnection()

    const productById = await db.query("SELECT * FROM Proudct WHERE id=?",[id])

    if(productById.length === 0){
        throw new Error('Id Not Found')
    }
    return productById
}

const getProductByCategory = async (categoryName) => {
    const db = await createDbConnection();

    
    try {
      const [rows] = await db.execute(`
         SELECT p.id, p.name, p.description, p.price,p.sellingPrice,p.stock,p.image,p.url, c.name as categoryName
         FROM Proudct p
         INNER JOIN Category c ON p.category_id = c.id
         WHERE c.name = ?`, [categoryName]);
      return rows;
    } catch (error) {
      throw error;
    }
  };

module.exports ={
    addProduct,
    getAllProduct,
    getProductById,
    getProductByCategory
}