import factoryCreateGymUseCase from "@/application/factories/createGymUseCase";
import { gymSchema } from "@/schemas/gym.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

const createGymController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { title, description, phone, latitude, longitude } = gymSchema.parse(
    request.body,
  );

  try {
    const registerGymUseCase = factoryCreateGymUseCase();

    await registerGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return response.status(201).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).send({ message: error.message });
    }

    if (error instanceof Error) {
      return response.status(400).send({ message: error.message });
    }

    return response.status(500).send({ message: "Internal server error" });
  }
};

export default createGymController;
