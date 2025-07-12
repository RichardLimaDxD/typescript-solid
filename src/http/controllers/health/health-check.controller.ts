import { FastifyReply, FastifyRequest } from "fastify";

const healthCheckController = async (
  _request: FastifyRequest,
  response: FastifyReply,
) => {
  return response.status(200).send({ status: "server is healthy" });
};

export default healthCheckController;
