const createDbConnection = require("../config/Database");

const getCarts = async()=> {
    const db = await createDbConnection()

    const cart = await db.query("SELECT * FROM Cart")

    return cart
}

const getCartById = async(id)=>{
    const db = await createDbConnection()

    const categoryById = await db.query("SELECT * FROM Cart WHERE id=?",[id])

    if(categoryById.length === 0){
        throw new Error('Id Not Found')
    }

    return categoryById
}

const addCart = async(newDataCart)=> {
    const db = createDbConnection()

    const {quantity,amount,userId,productId} = newDataCart

    const cart = (await db).query("INSERT INTO Cart (quantity,amount, user_id,product_id) VALUES (?,?,?,?)", [quantity,amount,userId,productId])

    return cart
}

const updateCart = async(id,updateDataCart)=>{
    const db= await createDbConnection()

    const { quantity,amount,userId,productId } = updateDataCart

    const cart = await db.query("UPDATE Cart SET quantity=?,amount=?,user_id=?,product_id=? WHERE id=?",[quantity,amount,userId,productId,id])

    return cart
}

const deleteCart = async(id)=> {
    const db =  await createDbConnection()

    const cart = db.query("DELETE FROM Cart WHERE id=?",[id])

    return cart
}

module.exports={
    getCarts,
    addCart,
    getCartById,
    updateCart,
    deleteCart
}