import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getOrdersByInvestor,
  createOrder,
  getAllPendingOrders,
  getAllPendingOrdersByInvestor,
  cancelOrder,
  confirmOrder,
  getAllOrdersByInvestor,
} from "../functions/Order.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

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

router.get("/orders/all", async (req, res) => {
  const orders = await getAllOrdersByInvestor(req.query.investorID);

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
    if (order == "Error") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You do not have shares in this company" });
    } else {
      return res.status(StatusCodes.CREATED).json(order);
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.put("/cancelOrders", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const cancelledOrder = await cancelOrder(data.orderID);
  return res.status(StatusCodes.CREATED).end();
});

router.put("/confirmedOrders", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const confirmedOrder = await confirmOrder(data.orderID);
  return res.status(StatusCodes.CREATED).end();
});

export default router;
