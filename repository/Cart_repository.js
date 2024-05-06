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

const getCartByUserId = async (userId) => {
    const db = await createDbConnection();
  
    try {
      // Query untuk mendapatkan data cart berdasarkan user_id
      const [cartRows] = await db.execute(`
        SELECT c.id,c.quantity, c.amount, c.user_id, c.product_id FROM Cart c
        JOIN User u ON c.user_id = u.user_id
        WHERE c.user_id = ?;`, [userId]);
  
      // Memeriksa apakah cartRows kosong
      if (cartRows.length === 0) {
        return []; // atau Anda bisa melempar error atau mengembalikan nilai lain yang menandakan tidak ada data
      }
  
      // Array untuk menyimpan data produk
      const productsData = [];
  
      // Loop melalui setiap baris untuk mendapatkan data produk
      for (const row of cartRows) {
        const [productRows] = await db.query("SELECT * FROM Proudct WHERE id = ?", [row.product_id]);
        // Menambahkan data produk ke array dengan informasi cart
        productsData.push({
          cart: row,
          product: productRows[0] // Asumsi bahwa setiap product_id hanya mengembalikan satu baris
        });
      }
  
      return productsData;
    } catch (error) {
      throw error;
    }
  };
  

const addCart = async(newDataCart)=> {
    const db = await createDbConnection(); 

    const { quantity, amount, userId, productId } = newDataCart;


    const result = await db.query("INSERT INTO Cart (quantity, amount, user_id, product_id) VALUES (?, ?, ?, ?)", [quantity, amount, userId, productId]);


    return result;
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
    getCartByUserId,
    updateCart,
    deleteCart
}