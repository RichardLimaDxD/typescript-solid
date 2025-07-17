import { FastifyInstance } from "fastify";
import createGymController from "./createGym.controller";
import searchGymController from "./searchGym.controller";
import nearByGymsController from "./nearByGyms.controller";
import verifyJwt from "@/http/middlewares/verify-jwt";

const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms", createGymController);
  app.get("/gyms/search", searchGymController);
  app.get("/gyms/nearby", nearByGymsController);
};

export default gymsRoutes;
