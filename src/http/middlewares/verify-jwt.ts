import { FastifyReply, FastifyRequest } from "fastify";

const verifyJwt = async (request: FastifyRequest, response: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    return response.status(401).send({
      message: "Unauthorized",
    });
  }
};

export default verifyJwt;
