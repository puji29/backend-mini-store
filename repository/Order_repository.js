const createDbConnection = require("../config/Database");

const addOrder = async (newDataOrder) => {
  const db = await createDbConnection();

  const {
    username,
    email,
    phone,
    zip,
    address,
    totalOrderAmount,
    userId,
    paymentId,
    quantity,
    amount,
    productId,
  } = newDataOrder;

  const [orderItem] = await db.query(
    "INSERT INTO order_item_list (quantity,amount,product_id) VALUES (?,?,?)",
    [quantity, amount, productId]
  );

  if (orderItem.error) {
    throw new Error("Error inserting into order_item_list: " + orderItem.error);
  }

  const orderItemId = orderItem.insertId;

  const [order] = await db.query(
    "INSERT INTO `Order` (username,email,phone,zip,address,total_order_amount,user_id,payment_id,order_item_id) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      username,
      email,
      phone,
      zip,
      address,
      totalOrderAmount,
      userId,
      paymentId,
      orderItemId,
    ]
  );

  if (order.error) {
    throw new Error("Error inserting into Order: " + order.error);
  }

  return order;
};

const getOrderWithOrderItem = async () => {
    const db = await createDbConnection()

    const orders = await db.query("SELECT * FROM `Order` JOIN order_item_list ON `Order`.order_item_id = order_item_list.id")

   
    return orders
};

module.exports = {
  addOrder,
  getOrderWithOrderItem,
};
