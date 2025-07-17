import factoryUserCheckInsHistoryUseCase from "@/application/factories/userCheck-insHistoryUseCase";
import { checkInHistoryQuerySchema } from "@/schemas/check-in.schema";
import { FastifyReply, FastifyRequest } from "fastify";

const historyCheckInController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const checkInHistoryUseCase = factoryUserCheckInsHistoryUseCase();

  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return response.status(200).send({ checkIns });
};

export default historyCheckInController;
