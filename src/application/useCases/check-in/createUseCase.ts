import { AppError } from "@/error";
import {
  CheckInUseCaseRequest,
  CheckInUseCaseResponse,
} from "@/interfaces/check-in.interface";
import CheckInRepository from "@/repositories/check-in.repository";

class CreateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay)
      throw new AppError("User already checked in today", 400);

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}

export default CreateCheckInUseCase;
