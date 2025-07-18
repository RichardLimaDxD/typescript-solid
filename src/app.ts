import fastify from "fastify";
import { errorHandle } from "./error";
import fastifyJwt from "@fastify/jwt";
import env from "./env";
import usersRoutes from "./http/controllers/users/routes";
import authRoutes from "./http/controllers/auth/routes";
import healthRoutes from "./http/controllers/health/routes";
import gymsRoutes from "./http/controllers/gyms/routes";
import CheckInsRoutes from "./http/controllers/check-ins/routes";
import fastifyCookie from "@fastify/cookie";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(healthRoutes);
app.register(usersRoutes);
app.register(authRoutes);
app.register(gymsRoutes);
app.register(CheckInsRoutes);

app.setErrorHandler(errorHandle);

export default app;
