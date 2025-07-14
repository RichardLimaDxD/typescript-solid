import CheckInPrismaRepository from "@/repositories/prisma/check-in.prisma.repository";
import FetchUserInCheckInsHistoryUseCase from "../useCases/fetch/createFetchUserInCheckInsHistoryUseCase";

const factoryUserCheckInsHistoryUseCase = () => {
  const repository = new CheckInPrismaRepository();
  const useCase = new FetchUserInCheckInsHistoryUseCase(repository);

  return useCase;
};

export default factoryUserCheckInsHistoryUseCase;
