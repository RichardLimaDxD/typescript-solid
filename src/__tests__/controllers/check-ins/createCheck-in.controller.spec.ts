import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../app";
import createAndAuthenticateUser from "@/__tests__/utils/createAndAuthUsers";
import prisma from "@/database/prisma";

describe("Create Check-in Controller - POST /check-ins", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toBe(201);
  });
});
