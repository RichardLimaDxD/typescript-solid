import { CheckIn } from "prisma/generated";

export interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}
