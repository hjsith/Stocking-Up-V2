const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllOrders } = require("../daos/Order");

// Init shared
const router = Router();

router.get("/orders", async (req, res) => {
  const orders = await getAllOrders();

  return res.status(StatusCodes.OK).json(orders);
});

module.exports = router;
