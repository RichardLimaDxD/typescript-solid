import factoryGetUserMetricsUseCase from "@/application/factories/getUserMetricsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

const metricsCheckInController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const getUserMetricsUseCase = factoryGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return response.status(200).send({ checkInsCount });
};

export default metricsCheckInController;
