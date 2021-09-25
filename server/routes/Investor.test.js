const { app } = require("../index");
const { request } = require("supertest");
const db = require("./DBInstance");
const { getInvestor } = require("../functions/Investor");

describe("Investor endpoint", () => {
  it("Successfully retrieved user", async () => {
    const res = await request(app).get("/api/investor").send({
      userID: "1ad0df57-12ae-494f-81ec-34fcc5acf38",
    });
    expect(res.status).toEqual(200);
  });

  it("Fail to retrieved user", async () => {
    const res = await request(app).get("/api/investor").send({
      userID: "Obviously not an ID",
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toContain("User could not be found.");
  });
});
