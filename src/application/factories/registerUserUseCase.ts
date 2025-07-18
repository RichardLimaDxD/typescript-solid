import UsersPrismaRepository from "@/repositories/prisma/users.prisma.repository";
import RegisterUseCase from "../useCases/users/registerUserUseCase";

const factoryRegisterUseCase = () => {
  const repository = new UsersPrismaRepository();
  const useCase = new RegisterUseCase(repository);

  return useCase;
};

export default factoryRegisterUseCase;
