import { AppError } from "@/error";
import {
  CheckInUseCaseRequest,
  CheckInUseCaseResponse,
} from "@/interfaces/check-in.interface";
import CheckInRepository from "@/repositories/check-in.repository";
import GymRepository from "@/repositories/gym.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

class CreateCheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new AppError("Gym not found", 404);
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new AppError("Gym is too far away", 400);
    }

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
