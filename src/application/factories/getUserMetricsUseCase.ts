import GetUserMethicsUseCase from "../useCases/check-in/getUserMethicsUseCase";
import CheckInPrismaRepository from "@/repositories/prisma/check-in.prisma.repository";

const factoryGetUserMetricsUseCase = () => {
  const repository = new CheckInPrismaRepository();
  const useCase = new GetUserMethicsUseCase(repository);

  return useCase;
};

export default factoryGetUserMetricsUseCase;
