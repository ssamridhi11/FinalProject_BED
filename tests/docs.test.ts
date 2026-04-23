import request from "supertest";
import app from "../src/app";

describe("Swagger docs", () => {
  it("serves the OpenAPI JSON at /docs.json", async () => {
    const res = await request(app).get("/docs.json").expect(200);
    expect(res.body).toHaveProperty("openapi");
    expect(res.body.openapi).toMatch(/3.0.0/);
  });
});
