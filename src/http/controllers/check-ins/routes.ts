import verifyJwt from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import createCheckInController from "./createCheck-ins.controller";
import historyCheckInController from "./historycCheck-in.controller";
import metricsCheckInController from "./methicsCheck-in.controller";
import validateCheckInController from "./validateCheck-in.controller";
import verifyUserRole from "@/http/middlewares/verify-user-role";

const CheckInsRoutes = (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/check-ins", createCheckInController);

  app.get("/check-ins/history", historyCheckInController);
  app.get("/check-ins/metrics", metricsCheckInController);

  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateCheckInController,
  );
};

export default CheckInsRoutes;
