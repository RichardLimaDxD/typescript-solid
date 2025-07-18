import { FastifyReply, FastifyRequest } from "fastify";

const verifyUserRole = (roleToVerify: "ADMIN" | "MEMBER") => {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return await response.status(401).send({ message: "Unauthorized" });
    }
  };
};

export default verifyUserRole;
