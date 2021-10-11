import sequelize from "./db/DBInstance";
import request from "supertest";
import app from "./server.js";

export async function createTestUser(
  inputFirstName,
  inputLastName,
  inputEmail,
  inputPassword,
  inputUsername
) {
  const resLogin = await request(app).post("/api/SignUp").send({
    firstName: inputFirstName,
    lastName: inputLastName,
    email: inputEmail,
    password: inputPassword,
    username: inputUsername,
  });
  return resLogin.body;
}

export async function getAuthenticatedUserCookie(inputUsername, inputPassword) {
  const resLogin = await request(app).post("/api/SignIn").send({
    username: inputUsername,
    password: inputPassword,
  });
  return resLogin.headers["set-cookie"];
}
