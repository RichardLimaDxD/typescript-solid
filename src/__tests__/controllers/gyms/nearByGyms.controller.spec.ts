import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../app";
import createAndAuthenticateUser from "@/__tests__/utils/createAndAuthUsers";

describe("Near By Gyms Controller - GET /gyms/nearby", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description",
        phone: null,
        latitude: -27.0092052,
        longitude: -49.0401091,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const searchResponse = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(searchResponse.statusCode).toBe(200);
    expect(searchResponse.body.gyms).toHaveLength(1);
    expect(searchResponse.body.gyms[0]).toEqual(
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    );
  });
});
