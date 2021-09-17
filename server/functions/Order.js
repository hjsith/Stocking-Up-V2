const { Order } = require("../db/Models");

async function getAllOrders() {
  return await Order.findAll();
}

module.exports = { getAllOrders };
