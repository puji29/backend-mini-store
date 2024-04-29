const createDbConnection = require("../config/Database.js");

const getCategory = async()=>{
    const db = await createDbConnection()
    const category = await db.query("SELECT * FROM Category")

    return category
} 
const getCategoryById = async(id)=> {
    const db = await createDbConnection()

    const [categoryById] = await db.query("SELECT * FROM Category WHERE id=?",[id])

    if(categoryById.length === 0){
        throw new Error('Id Not found')
    }
    return categoryById
}

const addCategory= async(newDataCategory)=>{
    const db = await createDbConnection()
    const {name,image,url} = newDataCategory

    const result = await db.query("INSERT INTO Category (name, image, url) VALUES (?,?,?)",[name,image,url])

    return result
}

module.exports= {
    getCategory,
    addCategory,
    getCategoryById
}