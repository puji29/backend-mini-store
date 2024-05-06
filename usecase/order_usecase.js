const { addOrder, getOrderWithOrderItem } = require("../repository/Order_repository");

const createOrder =async(newDataOrder)=>{
    const order = await addOrder(newDataOrder)

    return order
}

const findOrderByOrderItem = async()=>{
    const getOrderWithOrderItems = await getOrderWithOrderItem()

    return getOrderWithOrderItems
}

module.exports={
    createOrder,
    findOrderByOrderItem
}