import CheckInPrismaRepository from "@/repositories/prisma/check-in.prisma.repository";
import { ValidateCheckInUseCase } from "../useCases/check-in/validateCheck-inUseCase";

const factoryValidateCheckInUseCase = () => {
  const repository = new CheckInPrismaRepository();
  const useCase = new ValidateCheckInUseCase(repository);

  return useCase;
};

export default factoryValidateCheckInUseCase;
