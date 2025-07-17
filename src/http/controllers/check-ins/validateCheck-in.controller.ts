import factoryValidateCheckInUseCase from "@/application/factories/validateCheck-inUseCase";
import { checkInValidateParamsSchema } from "@/schemas/check-in.schema";
import { FastifyReply, FastifyRequest } from "fastify";

const validateCheckInController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { checkInId } = checkInValidateParamsSchema.parse(request.params);

  const validateCheckInUseCase = factoryValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return response.status(204).send();
};

export default validateCheckInController;
