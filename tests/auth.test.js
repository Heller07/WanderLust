jest.mock("multer-storage-cloudinary", () => {
  return function CloudinaryStorage() {
    return {};
  };
});
const request = require("supertest");
const app = require("../app");

describe("Authentication Flow", () => {
  let agent;

  beforeAll(() => {
    // Supertest agent keeps cookies between requests
    agent = request.agent(app);
  });

  test("User can sign up", async () => {
    const res = await agent
      .post("/signup")
      .type("form")
      .send({
        username: "testuser",
        email: "testuser@test.com",
        password: "password123",
      });

    // Most Passport apps redirect after signup
    expect(res.statusCode).toBe(302);
  });

  test("User can log in", async () => {
    const res = await agent
      .post("/login")
      .type("form")
      .send({
        username: "testuser",
        password: "password123",
      });

    expect(res.statusCode).toBe(302);
  });

  test("Logged-in user can access protected route", async () => {
    const res = await agent.get("/listings");
    expect(res.statusCode).toBe(200);
  });
});
