import {
  GetUserMethicsUseCaseRequest,
  GetUserMethicsUseCaseResponse,
} from "@/interfaces/check-in.interface";
import CheckInRepository from "@/repositories/check-in.repository";

class GetUserMethicsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute(
    request: GetUserMethicsUseCaseRequest,
  ): Promise<GetUserMethicsUseCaseResponse> {
    const { userId } = request;

    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}

export default GetUserMethicsUseCase;
