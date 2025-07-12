import { FastifyInstance } from "fastify";
import usersRegisterController from "../controllers/users/register.controller";

const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", usersRegisterController);
};

export default appRoutes;
