import { FastifyInstance } from "fastify";
import request from "supertest";
import prisma from "@/database/prisma";
import { hash } from "bcryptjs";

const createAndAuthenticateUser = async (
  app: FastifyInstance,
  isAdmin = false,
) => {
  await prisma.user.create({
    data: {
      name: "Sonic",
      email: "sonic@example.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/auth").send({
    email: "sonic@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
};

export default createAndAuthenticateUser;
