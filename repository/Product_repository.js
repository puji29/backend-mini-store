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

module.exports ={
    addProduct,
    getAllProduct,
    getProductById
}