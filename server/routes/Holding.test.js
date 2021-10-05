const app = require("../server.js");
const request = require("supertest");
const sequelize = require("../db/DBInstance");
const {
  getAuthenticatedUserCookie,
  createTestUser,
} = require("../test.config");
const { createListing } = require("../functions/Listing");

const { createPrice } = require("../functions/Price");

let cookie = "";
let user;
let order;

beforeAll(async () => {
  // Create test Investor in database
  user = await request(app).post("/api/SignUp").send({
    firstName: "Test",
    lastName: "Tester",
    email: "Testing@Email",
    password: "Password",
    username: "TestUser",
  });

  //Create test Listing
  await createListing(
    "TLG",
    "Test listing",
    "Test industry",
    0,
    0,
    0.1,
    0.1,
    0.1
  );

  //Create test Price for listing from Price table
  await createPrice("TLG", 7.8);

  //Create test Order
  order = await request(app).post("/api/orders").send({
    investorID: user.body.id,
    quantityOrder: 12,
    orderTime: "2021-10-02 12:30:36.0000000 +00:00",
    typeOfOrder: "BUY",
    listingID: "TLG",
    executionTime: "2021-10-02 12:30:36.0000000 +00:00",
  });
});

beforeEach(async () => {
  cookie = await getAuthenticatedUserCookie("TestUser", "Password");
});

describe("Watchlist endpoint", () => {
  //Unit tests for /api/holdings - to create Holding
  it("Successfully create holding", async () => {
    const res = await request(app)
      .post("/api/holdings")
      .send({
        investorID: user.body.id,
        listingID: "TLG",
        orderID: order.body.OrderID,
        current: 1,
      })
      .set("cookie", cookie);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });
  it("Unauthorised to create watchlist", async () => {
    const res = await request(app).post("/api/watchlist").send({
      InvestorID: user.body.id,
      ListingID: "TLG",
    });
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/holdings - to get Holding

  it("Successfully retrieved holdings", async () => {
    const res = await request(app)
      .get("/api/holdings?investorID=" + user.body.id)
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
  it("Unauthorized to retrieve comments", async () => {
    const res = await request(app).get(
      "/api/holdings?InvestorID=" + user.body.id
    );
    expect(res.status).toEqual(401);
  });
});
