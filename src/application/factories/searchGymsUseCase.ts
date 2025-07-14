import GymPrismaRepository from "@/repositories/prisma/gym.prisma.repository";
import SearchGymsUseCase from "../useCases/gym/searchGymsUseCase";

const factorySearchGymsUseCase = () => {
  const repository = new GymPrismaRepository();
  const useCase = new SearchGymsUseCase(repository);

  return useCase;
};

export default factorySearchGymsUseCase;
