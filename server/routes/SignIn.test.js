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
// user story: As an investor I want to be able to sign into my account with username and password so that I can gain access to ‘Stocking Up’ and be able to use its functionalities for my account

describe("SignIn  endpoint", () => {
  //testing endpoint
  it("Doesn't send any username or password", async () => {
    const res = await request(app).post("/api/SignIn");

    expect(res.status).toEqual(400);
  });
  it("Gives correct sign in details to log in ", async () => {
    const res = await request(app).post("/api/SignIn").send({
      username: "TestUser", // what is sent back
      password: "Password",
    });

    expect(res.status).toEqual(200);
  });

  it("Passwords do not match or username is incorrect", async () => {
    const res = await request(app).post("/api/SignIn").send({
      username: "Name1", // what is sent back
      password: "Apples",
    });
    expect(res.status).toEqual(401);
  });
});
