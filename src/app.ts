import fastify from "fastify";
import appRoutes from "./http/routes/routes";
import { errorHandle } from "./error";
import fastifyJwt from "@fastify/jwt";
import env from "./env";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler(errorHandle);

export default app;
