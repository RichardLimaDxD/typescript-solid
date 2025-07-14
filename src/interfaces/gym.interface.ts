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

export interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

export interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

export interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export interface GymFindManyNearbyParams {
  latitude: number;
  longitude: number;
}
