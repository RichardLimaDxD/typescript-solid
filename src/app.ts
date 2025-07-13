import fastify from "fastify";
import appRoutes from "./http/routes/routes";
import { errorHandle } from "./error";

const app = fastify();

app.register(appRoutes);

app.setErrorHandler(errorHandle);

export default app;
