import { FastifyInstance } from "fastify";
import usersRegisterController from "../controllers/users/register.controller";
import healthCheckController from "../controllers/health/health-check.controller";
import authenticateController from "../controllers/auth/authenticate.controller";
import profileController from "../controllers/users/profile.controller";
import verifyJwt from "../middlewares/verify-jwt";

const appRoutes = async (app: FastifyInstance) => {
  Routes.publicRoutes(app);
  Routes.privateRoutes(app);
};

class Routes {
  static publicRoutes(app: FastifyInstance) {
    app.get("/health", healthCheckController);
    app.post("/users", usersRegisterController);
    app.post("/auth", authenticateController);
  }

  static privateRoutes(app: FastifyInstance) {
    app.get("/me", { onRequest: [verifyJwt] }, profileController);
  }
}

export default appRoutes;
