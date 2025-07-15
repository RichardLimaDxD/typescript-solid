import factoryAuthenticateUseCase from "@/application/factories/authenticateUseCase";
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

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    return response.status(200).send({ token });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(400).send({ message: error.message });
    }

    return response.status(500).send({ message: "Internal server error" });
  }
};

export default authenticateController;
