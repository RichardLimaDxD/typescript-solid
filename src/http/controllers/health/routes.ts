import { FastifyInstance } from "fastify";
import healthCheckController from "./health-check.controller";

const healthRoutes = async (app: FastifyInstance) => {
  app.get("/health", healthCheckController);
};

export default healthRoutes;
