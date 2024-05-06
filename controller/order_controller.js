const { createOrder,findOrderByOrderItem } = require("../usecase/order_usecase");

const createOrderHandler = async (req, res) => {
  const newDataOrder = req.body;

  try {
    const order = createOrder(newDataOrder);

    res.status(201).json({ message: "created order succesfully",data: order });
  } catch (error) {
    res.status(500).json({ mesage: error.mesage });
  }
};

const getOrderByOrderItemHandler = async(req,res)=> {
  try {
    const order = await findOrderByOrderItem()
    console.log(order)
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ mesage: error.mesage });
  }
}

module.exports = {
  createOrderHandler,
  getOrderByOrderItemHandler
};
