import { AppError } from "@/error";
import {
  ValidateCheckInUseCaseRequest,
  ValidateCheckInUseCaseResponse,
} from "@/interfaces/check-in.interface";
import CheckInRepository from "@/repositories/check-in.repository";
import dayjs from "dayjs";

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) throw new AppError("Check-in not found", 404);

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (distanceInMinutesFromCheckInCreation > 20)
      throw new AppError("Check-in expired", 400);

    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
