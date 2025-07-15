import factoryGetProfileUseCase from "@/application/factories/getProfileUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

const profileController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  await request.jwtVerify();

  const getUserProfileUseCase = factoryGetProfileUseCase();

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  });

  return response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
};

export default profileController;
