import app from "../server.js";
import request from "supertest";
import sequelize from "../db/DBInstance.js";
import { getAuthenticatedUserCookie } from "../test.config.js";

let user1;
let user2;
let cookie1 = "";
let cookie2 = "";

beforeAll(async () => {
  await sequelize.sync();

  // Create user1 in database
  user1 = await request(app).post("/api/SignUp").send({
    firstName: "Testing",
    lastName: "Account",
    email: "Testing@Email",
    password: "Password",
    username: "TestUser1",
  });

  // Create user2 in database
  user2 = await request(app).post("/api/SignUp").send({
    firstName: "Testing",
    lastName: "Account2",
    email: "Testing@Email",
    password: "Password",
    username: "TestUser2",
  });
});

beforeEach(async () => {
  //Wipes the friend table after each test case
  sequelize.models.Friends.destroy({
    where: {},
    truncate: true,
  });
  //Cookie for user1
  cookie1 = await getAuthenticatedUserCookie("TestUser1", "Password");
  //Cookie for user2
  cookie2 = await getAuthenticatedUserCookie("TestUser2", "Password");
});

// Unit test that tests the friends endpoint
describe("Friends endpoint", () => {
  //Unit test that checks that a user can add another user
  it("Allows user1 to add user2", async () => {
    const res = await request(app)
      .post("/api/friends/add")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie1);
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });

  //Unit test that checks that a user can accept a pending request from another user
  it("Allows user2 to accept a pending request from user1", async () => {
    await request(app)
      .post("/api/friends/add")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie1);

    const res = await request(app)
      .patch("/api/friends/accept")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie2);
    expect(res.status).toEqual(200);
  });

  //Unit test that checks that a user can deny a pending request from another user
  it("Allows user2 to deny a pending request from user1", async () => {
    await request(app)
      .post("/api/friends/add")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie1);

    const denyRes = await request(app)
      .delete("/api/friends/deny")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie2);
    expect(denyRes.status).toEqual(200);
  });

  //Unit test that checks that a user can view pending requests
  it("Allows user2 to access their pending friends list", async () => {
    await request(app)
      .post("/api/friends/add")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie1);

    const res = await request(app)
      .get("/api/friends/pending?id=" + user2.body.id)
      .send()
      .set("cookie", cookie2);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  //Unit test that checks that a user can view their friends list
  it("Allows user2 to access their friends list", async () => {
    await request(app)
      .post("/api/friends/add")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie1);

    await request(app)
      .patch("/api/friends/accept")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      })
      .set("cookie", cookie2);

    const res = await request(app)
      .get("/api/friends?id=" + user2.body.id)
      .send()
      .set("cookie", cookie2);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
  });

  //Unit test that checks that an unauthorised user cannot access the API
  it("Does not allow unauthorised connections", async () => {
    const addResponse = await request(app).post("/api/friends/add").send({
      rId: user1.body.id,
      aId: user2.body.id,
    });

    const acceptResponse = await request(app)
      .patch("/api/friends/accept")
      .send({
        rId: user1.body.id,
        aId: user2.body.id,
      });

    const denyResponse = await request(app).delete("/api/friends/deny").send({
      rId: user1.body.id,
      aId: user2.body.id,
    });

    const pendingResponse = await request(app)
      .get("/api/friends/pending?id=" + user2.body.id)
      .send();

    const friendsResponse = await request(app)
      .get("/api/friends?id=" + user2.body.id)
      .send();

    expect(addResponse.status).toEqual(401);
    expect(acceptResponse.status).toEqual(401);
    expect(denyResponse.status).toEqual(401);
    expect(pendingResponse.status).toEqual(401);
    expect(friendsResponse.status).toEqual(401);
  });
});
