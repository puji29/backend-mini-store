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

  const orderItemIds = [];
  for (let i = 0; i < quantity.length; i++) {
    const [orderItem] = await db.query(
      "INSERT INTO order_item_list (quantity,amount,product_id) VALUES (?,?,?)",
      [quantity[i], amount[i], productId[i]]
    );

    if (orderItem.error) {
      throw new Error(
        "Error inserting into order_item_list: " + orderItem.error
      );
    }

    orderItemIds.push(orderItem.insertId);
  }

  const [order] = await db.query(
    "INSERT INTO `Order` (username,email,phone,zip,address,total_order_amount,user_id,payment_id,order_item_id) VALUES (?,?,?,?,?,?,?,?,?)",
    [username, email, phone, zip, address, totalOrderAmount, userId, paymentId,orderItemIds[0]]
  );

  if (order.error) {
    throw new Error("Error inserting into Order: " + order.error);
  }

  for (let i = 0; i < orderItemIds.length; i++) {
    const [orderItemOrder] = await db.query(
      "INSERT INTO `OrderItemOrder` (order_id, order_item_id) VALUES (?,?)",
      [order.insertId, orderItemIds[i]]
    );

    if (orderItemOrder.error) {
      throw new Error(
        "Error inserting into OrderItemOrder: " + orderItemOrder.error
      );
    }
  }

  return order;
};


const getOrderWithOrderItem = async () => {
  const db = await createDbConnection();

  const orders = await db.query(
    "SELECT * FROM `Order` JOIN order_item_list ON `Order`.order_item_id = order_item_list.id"
  );

  return orders;
};

const getOrderByUserId = async (userId) => {
  const db = await createDbConnection();

  const [rows] = await db.query(
    "SELECT `Order`.*, order_item_list.quantity, order_item_list.amount, `Proudct`.name, `Proudct`.url, `Proudct`.sellingPrice FROM `Order` JOIN `OrderItemOrder` ON `Order`.id = `OrderItemOrder`.order_id JOIN order_item_list ON `OrderItemOrder`.order_item_id = order_item_list.id JOIN `Proudct` ON order_item_list.product_id = `Proudct`.id WHERE `Order`.user_id = ?",
    [userId]
  );

  const orders = {};
  rows.forEach((row) => {
    if (!orders[row.id]) {
      orders[row.id] = {
        username: row.username,
        email: row.email,
        phone: row.phone,
        zip: row.zip,
        address: row.address,
        totalOrderAmount: row.total_order_amount,
        userId: row.user_id,
        paymentId: row.payment_id,
        status: row.status,
        orderItemList: [],
        createdAt: row.created_at,
      };
    }

    orders[row.id].orderItemList.push({
      quantity: row.quantity,
      amount: row.amount,
      product: {
        name: row.name,
        image: row.url,
        sellingPrice: row.sellingPrice,
      },
    });
  });

  return Object.values(orders);
};


const deleteOrder = async (id) => {
  const db = await createDbConnection();

  const order = await db.query(
    "DELETE o,oi FROM `Order` o INNER JOIN order_item_list oi ON o.order_item_id = oi.id WHERE o.id=?",
    [id]
  );

  return order;
};

module.exports = {
  addOrder,
  getOrderWithOrderItem,
  deleteOrder,
  getOrderByUserId,
};
