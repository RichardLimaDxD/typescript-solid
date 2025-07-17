import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../app";
import createAndAuthenticateUser from "@/__tests__/utils/createAndAuthUsers";
import prisma from "@/database/prisma";

describe("History Check-in Controller - GET /check-ins/history", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get check-in history", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.checkIns).toHaveLength(2);
    expect(response.body.checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: gym.id,
          user_id: user.id,
        }),
        expect.objectContaining({
          gym_id: gym.id,
          user_id: user.id,
        }),
      ]),
    );
  });
});
