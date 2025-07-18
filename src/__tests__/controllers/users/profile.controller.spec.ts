import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../app";
import createAndAuthenticateUser from "@/__tests__/utils/createAndAuthUsers";

describe("Profile Controller - GET /profile", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({ name: "Sonic" }),
      }),
    );
  });
});
