const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getOrdersByInvestor,
  createOrder,
  getAllPendingOrders,
  getAllPendingOrdersByInvestor,
} = require("../functions/Order");

// Init shared
const router = Router();

router.get("/orders", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const orders = await getOrdersByInvestor(data.investorID);

  return res.status(StatusCodes.OK).json(orders);
});

router.get("/orders/pending/all", async (req, res) => {
  const orders = await getAllPendingOrders();

  return res.status(StatusCodes.OK).json(orders);
});

router.get("/orders/pending", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;

  const orders = await getAllPendingOrdersByInvestor(data.investorID);

  return res.status(StatusCodes.OK).json(orders);
});

router.post("/orders", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const order = await createOrder(
    data.investorID,
    data.quantityOrder,
    data.orderTime,
    data.typeOfOrder,
    data.listingID,
    data.executionTime
  );

  return res.status(StatusCodes.CREATED).json(order);
});

module.exports = router;
