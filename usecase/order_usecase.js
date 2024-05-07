const { addOrder, getOrderWithOrderItem,deleteOrder } = require("../repository/Order_repository");

const createOrder =async(newDataOrder)=>{
    const order = await addOrder(newDataOrder)

    return order
}

const findOrderByOrderItem = async()=>{
    const getOrderWithOrderItems = await getOrderWithOrderItem()

    return getOrderWithOrderItems
}

const orderDelete = async(id)=>{
    const order = await deleteOrder(id)

    return order
}

module.exports={
    createOrder,
    findOrderByOrderItem,
    orderDelete
}