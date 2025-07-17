import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../app";

describe("Auth Controller - POST /auth", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "Batman",
      email: "batman@example.com",
      password: "123456",
    });

    const response = await request(app.server).post("/auth").send({
      email: "batman@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
