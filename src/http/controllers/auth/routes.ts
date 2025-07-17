import { FastifyInstance } from "fastify";
import authenticateController from "./authenticate.controller";

const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth", authenticateController);
};

export default authRoutes;
