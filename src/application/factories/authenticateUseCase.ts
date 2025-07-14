import UsersPrismaRepository from "@/repositories/prisma/users.prisma.repository";
import { AuthenticateUseCase } from "../useCases/auth/authenticateUseCase";

const factoryAuthenticateUseCase = () => {
  const repository = new UsersPrismaRepository();
  const useCase = new AuthenticateUseCase(repository);

  return useCase;
};

export default factoryAuthenticateUseCase;
