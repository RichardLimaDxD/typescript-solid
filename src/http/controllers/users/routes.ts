import { FastifyInstance } from "fastify";
import usersRegisterController from "./register.controller";
import profileController from "./profile.controller";
import verifyJwt from "@/http/middlewares/verify-jwt";

const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", usersRegisterController);

  app.get("/me", { onRequest: [verifyJwt] }, profileController);
};

export default usersRoutes;
