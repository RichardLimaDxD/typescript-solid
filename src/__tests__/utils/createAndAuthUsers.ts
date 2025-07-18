import { FastifyInstance } from "fastify";
import request from "supertest";

const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server).post("/users").send({
    name: "Sonic",
    email: "sonic@example.com",
    password: "123456",
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
