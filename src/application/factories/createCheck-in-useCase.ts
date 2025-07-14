import CheckInPrismaRepository from "@/repositories/prisma/check-in.prisma.repository";
import GymPrismaRepository from "@/repositories/prisma/gym.prisma.repository";
import CreateCheckInUseCase from "../useCases/check-in/createCheck-inUseCase";

const factoryCreateCheckInUseCase = () => {
  const repository = new CheckInPrismaRepository();
  const gymRepository = new GymPrismaRepository();

  const useCase = new CreateCheckInUseCase(repository, gymRepository);

  return useCase;
};

export default factoryCreateCheckInUseCase;
