import app from "../server.js";
import request from "supertest";
import sequelize from "../db/DBInstance.js";
import { getAuthenticatedUserCookie } from "../test.config.js";
import { createListing } from "../functions/Listing.js";
import { getInvestor } from "../functions/Investor.js";
import { getOrdersByInvestor } from "../functions/Order.js";
import { getAllExecutedOrdersByInvestor } from "../functions/Holding.js";
import { createPrice } from "../functions/Price.js";

let user;
let cookie = "";

beforeAll(async () => {
  await sequelize.sync();

  // Create user in database
  user = await request(app).post("/api/SignUp").send({
    firstName: "Test",
    lastName: "Tester",
    email: "Testing@Email",
    password: "Password",
    username: "TestUser",
  });

  //Create a listing in database
  await createListing(
    "TVK",
    "Test Name",
    "Test Industry",
    1000,
    1000,
    0.1,
    0.1,
    0.1
  );

  //Create a price for the listing in database
  await createPrice("TVK", 5);
});

beforeEach(async () => {
  cookie = await getAuthenticatedUserCookie("TestUser", "Password");
});

// Unit test to for a successfull order
describe("Orders endpoint", () => {
  it("Succesfully buy", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({
        investorID: user.body.id,
        quantityOrder: 5,
        orderTime: new Date(),
        typeOfOrder: "BUY",
        listingID: "TVK",
        executionTime: new Date(),
      })
      .set("cookie", cookie);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });
  //Unit test if an unauthorised user attempts to create an order
  it("Cannot create the order due to not being an authorised user", async () => {
    const res = await request(app).post("/api/orders").send({
      investorID: user.body.id,
      quantityOrder: 3,
      orderTime: new Date(),
      typeOfOrder: "BUY",
      listingID: "TVK",
      executionTime: new Date(),
    });
    expect(res.status).toEqual(401);
  });
  //Unit test if there is a bad request when creating an order

  it("Send a bad request", async () => {
    const res = await request(app).post("/api/orders").set("cookie", cookie);

    expect(res.status).toEqual(400);
  });
});
