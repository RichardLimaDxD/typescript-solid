import { Gym } from "prisma/generated";

export interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export interface CreateGymUseCaseResponse {
  gym: Gym;
}
