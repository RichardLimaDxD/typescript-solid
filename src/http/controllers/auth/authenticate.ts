import factoryAuthenticateUseCase from "@/application/useCases/auth/factories/authenticateUseCase";
import authenticateSchema from "@/schemas/auth.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

const authenticateController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const authenticateUseCase = factoryAuthenticateUseCase();

    await authenticateUseCase.execute({ email, password });

    return response.status(200).send();
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).send({ message: error.message });
    }

    return response.status(500).send({ message: "Internal server error" });
  }
};

export default authenticateController;
