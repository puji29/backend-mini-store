const {
  getCarts,
  addCart,
  getCartById,
  updateCart,
  deleteCart
} = require("../repository/Cart_repository");

const findCarts = async () => {
  const cart = await getCarts();

  return cart;
};

const findCartById = async (id) => {
  try {
    const cart = await getCartById(id);
  
    return cart;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

const createCart = async (newDataCart) => {
 
    const cart = await addCart(newDataCart);

    return cart;
  
};

const cartUpdate = async(id,UpdateDataCart) => {
    const cart = await updateCart(id,UpdateDataCart)

    return cart
}

const cartDelete = async(id)=> {
    const cart = await deleteCart(id)

    return cart
}
module.exports = {
  findCarts,
  createCart,
  findCartById,
  cartUpdate,
  cartDelete
};
