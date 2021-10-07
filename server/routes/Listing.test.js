const app = require("../server.js");
const request = require("supertest");
const sequelize = require("../db/DBInstance");
const { getAuthenticatedUserCookie } = require("../test.config");
const { createListing } = require("../functions/Listing");

let user;
let cookie = "";

beforeAll(async () => {
  await sequelize.sync(); //mimic DB configurations

  //create test user in database
  user = await request(app).post("/api/SignUp").send({
    firstName: "Test",
    lastName: "Tester",
    email: "Testing@Email",
    password: "Password",
    username: "TestUser",
  });
  await createListing(
    "STU",
    "Stocking Up Ltd",
    "Software & Services",
    60000,
    10000000,
    20.0,
    50.0,
    10.0
  ); //use createlisting function to create test listing entry in DB
});

beforeEach(async () => {
  //before each test,
  cookie = await getAuthenticatedUserCookie("TestUser", "Password"); //return a cookie for authentication, refuse connection if no cookie
});

describe("Listing endpoint", () => {
  //prepare test suite for unit testing
  it("Successfully returns listings", async () => {
    //begin unit test #1
    const res = await request(app).get("/api/listings").set("cookie", cookie); //request DB to call route (listings)
    expect(res.status).toEqual(200); //response should be 200 OK
    expect(res.body).toEqual(expect.any(Object)); //response should include object in body - there should be content returned with response
  });
  it("Fails to return listings when user is unauthorised", async () => {
    //begin unit test #2
    const res = await request(app).get("/api/listings");
    expect(res.status).toEqual(401); //response should be 401 NOT FOUND
  });
});
