import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../app";

describe("Auth Controller - PATCH /refresh/token", () => {
  beforeEach(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh token", async () => {
    await request(app.server).post("/users").send({
      name: "Batman",
      email: "batman@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/auth").send({
      email: "batman@example.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie");

    const refreshTokenResponse = await request(app.server)
      .patch("/refresh/token")
      .set("Cookie", cookies!)
      .send();

    expect(refreshTokenResponse.statusCode).toBe(200);
    expect(refreshTokenResponse.body).toEqual({
      token: expect.any(String),
    });

    expect(refreshTokenResponse.get("Set-Cookie")).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken=")]),
    );
  });
});
