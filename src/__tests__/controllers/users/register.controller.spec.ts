import app from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Register Controller - POST /users", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Batman",
      email: "batman@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
  });
});
