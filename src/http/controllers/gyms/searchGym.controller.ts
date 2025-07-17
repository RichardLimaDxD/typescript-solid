import factorySearchGymsUseCase from "@/application/factories/searchGymsUseCase";
import { gymsSearchSchema } from "@/schemas/gym.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

const searchGymController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { query, page } = gymsSearchSchema.parse(request.query);

  try {
    const searchGymUseCase = factorySearchGymsUseCase();

    const { gyms } = await searchGymUseCase.execute({
      query,
      page,
    });

    return response.status(200).send({ gyms });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).send({ message: error.message });
    }

    if (error instanceof Error) {
      return response.status(500).send({ message: error.message });
    }

    return response.status(500).send({ message: "Internal server error" });
  }
};

export default searchGymController;
