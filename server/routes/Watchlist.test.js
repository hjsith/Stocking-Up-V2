import app from "../server.js";
import request from "supertest";
import sequelize from "../db/DBInstance.js";
import { getAuthenticatedUserCookie } from "../test.config.js";
import { createListing } from "../functions/Listing.js";

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

  //Create listing
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
});

beforeEach(async () => {
  cookie = await getAuthenticatedUserCookie("TestUser", "Password");
});

describe("Watchlist endpoint", () => {
  //Unit tests for /api/watchlist - to create Watchlist
  it("Successfully create watchlist", async () => {
    const res = await request(app)
      .post("/api/watchlist")
      .send({
        investorID: user.body.id,
        listingID: "TLG",
      })
      .set("cookie", cookie);

    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });
  it("Unauthorised to create watchlist", async () => {
    const res = await request(app).post("/api/watchlist").send({
      investorID: user.body.id,
      listingID: "TLG",
    });
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/watchlist - to get Watchlist
  it("Successfully retrieved watchlist", async () => {
    const res = await request(app)
      .get("/api/watchlist?investorID=" + user.body.id)
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
  it("Unauthorized to retrieved watchlist", async () => {
    const res = await request(app).get(
      "/api/watchlist?InvestorID=" + user.body.id
    );
    expect(res.status).toEqual(401);
  });
});
