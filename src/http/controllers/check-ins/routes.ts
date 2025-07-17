import verifyJwt from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import createCheckInController from "./createCheck-ins.controller";
import historyCheckInController from "./historycCheck-in.controller";
import metricsCheckInController from "./methicsCheck-in.controller";
import validateCheckInController from "./validateCheck-in.controller";

const CheckInsRoutes = (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/check-ins", createCheckInController);

  app.get("/check-ins/history", historyCheckInController);
  app.get("/check-ins/metrics", metricsCheckInController);

  app.patch("/check-ins/:checkInId/validate", validateCheckInController);
};

export default CheckInsRoutes;
