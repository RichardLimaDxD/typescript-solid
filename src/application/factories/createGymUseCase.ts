import GymPrismaRepository from "@/repositories/prisma/gym.prisma.repository";
import CreateGymUseCase from "../useCases/gym/createGymUseCase";

const factoryCreateGymUseCase = () => {
  const repository = new GymPrismaRepository();
  const useCase = new CreateGymUseCase(repository);

  return useCase;
};

export default factoryCreateGymUseCase;
