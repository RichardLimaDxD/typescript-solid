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

export interface GetUserMethicsUseCaseRequest {
  userId: string;
}

export interface GetUserMethicsUseCaseResponse {
  checkInsCount: number;
}

export interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

export interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}
