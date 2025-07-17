import factoryCreateCheckInUseCase from "@/application/factories/createCheck-in-useCase";
import { checkInParamsSchema, checkInSchema } from "@/schemas/check-in.schema";
import { FastifyReply, FastifyRequest } from "fastify";

const createCheckInController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { gymId } = checkInParamsSchema.parse(request.params);

  const { latitude, longitude } = checkInSchema.parse(request.body);

  const createCheckInUseCase = factoryCreateCheckInUseCase();

  await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return response.status(201).send();
};

export default createCheckInController;
