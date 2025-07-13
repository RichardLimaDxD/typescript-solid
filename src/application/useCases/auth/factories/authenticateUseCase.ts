import UsersPrismaRepository from "@/repositories/prisma/users.prisma.repository";
import { AuthenticateUseCase } from "../authenticateUseCase";

const factoryAuthenticateUseCase = () => {
  const usersRepository = new UsersPrismaRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
};

export default factoryAuthenticateUseCase;
