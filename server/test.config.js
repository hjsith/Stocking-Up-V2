const sequelize = require("./db/DBInstance");
const request = require("supertest");
const app = require("./server.js");

async function createTestUser(
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
  return;
}

async function getAuthenticatedUserCookie(inputUsername, inputPassword) {
  const resLogin = await request(app).post("/api/SignIn").send({
    username: inputUsername,
    password: inputPassword,
  });
  return resLogin.headers["set-cookie"];
}

module.exports = { getAuthenticatedUserCookie };
