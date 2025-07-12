import { userSchema } from "@/schemas/users.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import RegisterUseCase from "@/application/useCases/users/registerUseCase";
import UsersPrismaRepository from "@/repositories/prisma/users.prisma.repository";

const usersRegisterController = async (
  request: FastifyRequest,
  response: FastifyReply,
): Promise<void> => {
  const { name, email, password } = userSchema.parse(request.body);

  try {
    const prismaUsersRepository = new UsersPrismaRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(409).send({ message: error.message });
    }

    return response.status(500).send({ message: "Internal server error" });
  }
};

export default usersRegisterController;
