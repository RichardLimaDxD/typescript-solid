import {
  FetchUserCheckInHistoryUseCaseRequest,
  FetchUserCheckInHistoryUseCaseResponse,
} from "@/interfaces/fetchUserCheck-inHistory.interface";
import CheckInPrismaRepository from "@/repositories/prisma/check-in.prisma.repository";

class FetchUserInCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInPrismaRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}

export default FetchUserInCheckInsHistoryUseCase;
