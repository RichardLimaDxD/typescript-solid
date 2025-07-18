import { FastifyInstance } from "fastify";
import authenticateController from "./authenticate.controller";
import refreshTokenController from "./refreshToken.controller";

const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth", authenticateController);

  app.patch("/refresh/token", refreshTokenController);
};

export default authRoutes;
