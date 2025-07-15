import UsersPrismaRepository from "@/repositories/prisma/users.prisma.repository";
import GetUserProfileUseCase from "../useCases/users/getProfileUseCase";

const factoryGetProfileUseCase = () => {
  const repository = new UsersPrismaRepository();
  const useCase = new GetUserProfileUseCase(repository);

  return useCase;
};

export default factoryGetProfileUseCase;
