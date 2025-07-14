import GymPrismaRepository from "@/repositories/prisma/gym.prisma.repository";
import FetchNearbyGymUseCase from "../useCases/gym/fetchNearbyGymUseCase";

const factoryFetchNearbyGymUseCase = () => {
  const repository = new GymPrismaRepository();
  const useCase = new FetchNearbyGymUseCase(repository);

  return useCase;
};

export default factoryFetchNearbyGymUseCase;
