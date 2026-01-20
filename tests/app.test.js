jest.mock("multer-storage-cloudinary", () => {
  return function CloudinaryStorage() {
    return {};
  };
});

const request = require("supertest");
const app = require("../app");

test("Unknown route returns 404", async () => {
  const res = await request(app).get("/some-random-route");
  expect(res.statusCode).toBe(404);
});

test("Trigger error route returns 400", async () => {
  const res = await request(app).get("/trigger-error");
  expect(res.statusCode).toBe(400);
});

test("Login page loads", async () => {
  const res = await request(app).get("/login");
  expect(res.statusCode).toBe(200);
});
