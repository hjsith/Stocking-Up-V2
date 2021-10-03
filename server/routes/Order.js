const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getOrdersByInvestor,
  createOrder,
  getAllPendingOrders,
  getAllPendingOrdersByInvestor,
} = require("../functions/Order");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

// this section retrieves all the orders and also orders for each investor ID
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

//this section retrieves all orders with a 'PENDING' status
router.get("/orders/pending/all", async (req, res) => {
  const orders = await getAllPendingOrders();

  return res.status(StatusCodes.OK).json(orders);
});
//this section retrieves all orders with a 'PENDING' status for each investor

router.get("/orders/pending", async (req, res) => {
  const orders = await getAllPendingOrdersByInvestor(req.query.investorID);

  return res.status(StatusCodes.OK).json(orders);
});
//this section of the code creates the order based on what the user inputs in the front end

router.post("/orders", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
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
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

module.exports = router;
