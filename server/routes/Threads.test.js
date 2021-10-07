import app from "../server.js";
import request from "supertest";
import sequelize from "../db/DBInstance.js";
import { getAuthenticatedUserCookie, createTestUser } from "../test.config.js";
import { createListing } from "../functions/Listing.js";

let cookie = "";

beforeAll(async () => {
  await sequelize.sync();

  // Create user in database
  await createTestUser(
    "Test",
    "Tester",
    "Testing@Email",
    "Password",
    "TestUser"
  );

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

describe("Threads endpoint", () => {
  //Unit tests for /api/newThread
  it("Successfully create test thread", async () => {
    const res = await request(app).post("/api/newThread").send({
      ThreadID: "TH-TLG",
      ListingID: "TLG",
      Title: "Test Listing",
      Description: "Test Listing",
    });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });

  //Unit tests for /api/threads
  it("Successfully retrieved threads", async () => {
    const res = await request(app).get("/api/threads").set("cookie", cookie);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
  it("No Authorization", async () => {
    const res = await request(app).get("/api/threads");
    expect(res.status).toEqual(401);
  });
});
