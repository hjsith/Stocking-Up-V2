import app from "../server.js";
import request from "supertest";
import sequelize from "../db/DBInstance.js";
import { getAuthenticatedUserCookie, createTestUser } from "../test.config.js";
import { createListing } from "../functions/Listing.js";

let user;
let cookie = "";
let commentID = "";

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
  await request(app).post("/api/newThread").send({
    ThreadID: "TH-TLG",
    ListingID: "TLG",
    Title: "Test Listing",
    Description: "Test Listing",
  });
});

beforeEach(async () => {
  cookie = await getAuthenticatedUserCookie("TestUser", "Password");
});

describe("Comments endpoint", () => {
  //Unit tests for /api/newComment
  it("Successfully create comment", async () => {
    const res = await request(app)
      .post("/api/newComment")
      .send({
        InvestorID: user.body.id,
        ThreadID: "TH-TLG",
        DateAdded: new Date(),
        Comment: "Hello",
        ListingPrice: 0.1,
      })
      .set("cookie", cookie);
    commentID = res.body.CommentID;
    expect(res.status).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });
  it("Unauthorised to create comment", async () => {
    const res = await request(app).post("/api/newComment").send({
      InvestorID: user.body.id,
      ThreadID: "TH-TLG",
      DateAdded: "2021-10-01 10:06:35.0000000 +00:00",
      Comment: "Hello",
      ListingPrice: 0.1,
    });
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/comments
  it("Successfully retrieved comments", async () => {
    const res = await request(app)
      .get("/api/comments?ThreadID=TH-TLG")
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
  it("Unauthorized to retrieved comments", async () => {
    const res = await request(app).get("/api/comments?ThreadID=TH-TLG");
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/commentCount
  it("Successfully retrieve count of comments for a user", async () => {
    const res = await request(app)
      .get("/api/commentCount?userID=" + user.body.id)
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
    expect(res.body.count).toEqual(1);
  });
  it("Unauthorized to retrieve comment count", async () => {
    const res = await request(app).get(
      "/api/commentCount?userID=" + user.body.id
    );
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/editComment
  it("Successfully edit comment", async () => {
    const res = await request(app)
      .put("/api/editComment")
      .send({
        ThreadID: "TH-TLG",
        CommentID: commentID,
        newMessage: "New Message",
      })
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
  });
  it("Unable to edit comment due to incorrect request body", async () => {
    const res = await request(app)
      .put("/api/editComment")
      .set("cookie", cookie);
    expect(res.status).toEqual(400);
  });
  it("Unable to edit comment due to incorrect commentID", async () => {
    const res = await request(app)
      .put("/api/editComment")
      .send({ CommentID: "BLAH", newMessage: "New Message" })
      .set("cookie", cookie);
    expect(res.status).toEqual(409);
  });
  it("Unauthorized to edit comment", async () => {
    const res = await request(app)
      .put("/api/editComment")
      .send({ CommentID: commentID, newMessage: "New Message" });
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/likeComment
  it("Successfully liked comment", async () => {
    const res = await request(app)
      .put("/api/likeComment")
      .send({ CommentID: commentID })
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
  });
  it("Unable to like comment due to bad request body", async () => {
    const res = await request(app)
      .put("/api/likeComment")
      .set("cookie", cookie);
    expect(res.status).toEqual(400);
  });
  it("Unable to like comment due to incorrect commentID", async () => {
    const res = await request(app)
      .put("/api/likeComment")
      .send({ CommentID: "BLAH" })
      .set("cookie", cookie);
    expect(res.status).toEqual(409);
  });
  it("Unauthorized to like comment", async () => {
    const res = await request(app)
      .put("/api/likeComment")
      .send({ CommentID: commentID });
    expect(res.status).toEqual(401);
  });

  //Unit tests for /api/unlikeComment
  it("Successfully unliked comment", async () => {
    const res = await request(app)
      .put("/api/unlikeComment")
      .send({ CommentID: commentID })
      .set("cookie", cookie);
    expect(res.status).toEqual(200);
  });
  it("Unable to unlike comment due to bad request body", async () => {
    const res = await request(app)
      .put("/api/unlikeComment")
      .set("cookie", cookie);
    expect(res.status).toEqual(400);
  });
  it("Unable to unlike comment due to incorrect commentID", async () => {
    const res = await request(app)
      .put("/api/unlikeComment")
      .send({ CommentID: "BLAH" })
      .set("cookie", cookie);
    expect(res.status).toEqual(409);
  });
  it("Unauthorized to unlike comment", async () => {
    const res = await request(app)
      .put("/api/unlikeComment")
      .send({ CommentID: commentID });
    expect(res.status).toEqual(401);
  });
});
