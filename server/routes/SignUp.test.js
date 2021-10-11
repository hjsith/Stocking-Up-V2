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
// User story tested:   As an investor I want to be able to access the ‘Sign up’ page so that if I don’t already have an account, I can create one using first name, last name, email and password

describe("SignUp  endpoint", () => {
  //testing endpoint
  it("Doesn't send any Sign Up details (i.e. Name,username, email or password", async () => {
    const res = await request(app).post("/api/SignUp");

    expect(res.status).toEqual(400);
  });
  it("Account has been successfully created with given details", async () => {
    const res = await request(app).post("/api/SignUp").send({
      firstName: " Sanyatest", //what is sent back
      lastName: "Duatest",
      email: "Testing123@email",
      password: "Password123",
      username: "TestUserSanya",
    });

    expect(res.status).toEqual(201);
  });

  it("Failed to create account as username already exists ", async () => {
    const res = await request(app).post("/api/SignUp").send({
      firstName: " Test",
      lastName: "Tester",
      email: "Testing@email",
      password: "Password",
      username: "TestUser",
    });
    expect(res.status).toEqual(422);
  });
});
