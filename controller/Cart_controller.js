const {
  findCarts,
  createCart,
  findCartById,
  cartUpdate,
  cartDelete
} = require("../usecase/Cart_usecase");

const findCartHandler = async (req, res) => {
  try {
    const cart = await findCarts();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const findByidHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const cart = await findCartById(id);
   
    res.status(200).json(cart);
  } catch (error) {
    if (error.message === "Id Not Found") {
      res.status(404).json({ message: "ID Not Found" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const updateHandler = async(req,res)=>{
    try {
        const id = req.params.id
        const updateDataCart = req.body

        const updateCart = await cartUpdate(id,updateDataCart)

        res.status(200).json({ message: "updated cart succesfully", data: updateCart })

    } catch (error) {
        res.status(500).json({mesage: error.mesage })
    }
}

const createHandler = async (req, res) => {
  try {
    const newDataCart = {
      quantity: req.body.quantity,
      amount: req.body.amount,
      userId: req.body.userId,
      productId: req.body.productId,
    };

    const cart = createCart(newDataCart);

    res.status(201).json({ message: "add new cart succesfully", data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHandler = async(req,res)=> {

    try {
        const id = req.params.id
        const cart = await cartDelete(id)
    
        res.status(200).json({message: "deleted cart succesfully"})
    } catch (error) {
        res.status(500).json({message: error.mesage})
    }
}

module.exports = {
  findCartHandler,
  createHandler,
  findByidHandler,
  updateHandler,
  deleteHandler
};
