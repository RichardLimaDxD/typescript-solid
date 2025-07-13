import { CheckIn } from "prisma/generated";

export interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

export interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}
