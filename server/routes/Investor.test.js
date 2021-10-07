import app from "../server.js";
import request from "supertest";
import sequelize from "../db/DBInstance.js";
import { getAuthenticatedUserCookie } from "../test.config.js";

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
});

beforeEach(async () => {
  cookie = await getAuthenticatedUserCookie("TestUser", "Password");
});

describe("Investor endpoint", () => {
  it("Successfully retrieved user", async () => {
    const res = await request(app)
      .get("/api/investor?id=" + user.body.id)
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
  });
  it("Fail to retrieved user", async () => {
    const res = await request(app)
      .get("/api/investor")
      .set("cookie", cookie)
      .send({
        userID: "Obviously not an ID",
      });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toContain("User could not be found.");
  });
  it("Fail on Unauthorized User", async () => {
    const res = await request(app).get("/api/investor?id=" + user.body.id);
    expect(res.status).toEqual(401);
  });

  it("Succesfully updated password", async () => {
    const res = await request(app)
      .put("/api/updatePassword")
      .set("cookie", cookie)
      .send({
        userID: user.body.id,
        username: user.body.username,
        password: "NewPassword",
      });
    expect(res.status).toEqual(200);
  });
  it("Fail to update password on incorrect request body", async () => {
    const res = await request(app).put("/api/updatePassword");
    expect(res.status).toEqual(400);
  });
  it("Fail to update password on incorrect userID and no username", async () => {
    const res = await request(app).put("/api/updatePassword").send({
      userID: "BLAH",
      password: "NewPassword",
    });
    expect(res.status).toEqual(409);
  });
  it("Fail to update password on incorrect username and no userID", async () => {
    const res = await request(app).put("/api/updatePassword").send({
      username: "BLAH",
      password: "NewPassword",
    });
    expect(res.status).toEqual(409);
  });

  it("Succesfully retrieve all investors", async () => {
    const res = await request(app).get("/api/allInvestors");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});
