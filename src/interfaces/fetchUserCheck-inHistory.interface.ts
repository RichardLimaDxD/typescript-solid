import { CheckIn } from "prisma/generated";

export interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
}

export interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[];
}
