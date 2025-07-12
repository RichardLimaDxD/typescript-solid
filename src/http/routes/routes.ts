import { FastifyInstance } from "fastify";
import usersRegisterController from "../controllers/users/register.controller";
import healthCheckController from "../controllers/health/health-check.controller";

const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", usersRegisterController);
  app.get("/health", healthCheckController);
};

export default appRoutes;
