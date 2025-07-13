import { FastifyInstance } from "fastify";
import usersRegisterController from "../controllers/users/register.controller";
import healthCheckController from "../controllers/health/health-check.controller";
import authenticateController from "../controllers/auth/authenticate";

const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", usersRegisterController);
  app.get("/health", healthCheckController);
  app.post("/auth", authenticateController);
};

export default appRoutes;
