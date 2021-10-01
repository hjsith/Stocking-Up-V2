const app = require("../server.js");
const request = require("supertest");
const sequelize = require("../db/DBInstance");
const { getAuthenticatedUserCookie } = require("../test.config");

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
});
