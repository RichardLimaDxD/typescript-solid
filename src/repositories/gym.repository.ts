import { GymFindManyNearbyParams } from "@/interfaces/gym.interface";
import { Gym, Prisma } from "prisma/generated";

abstract class GymRepository {
  abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
  abstract findById(id: string): Promise<Gym | null>;
  abstract searchMany(query: string, page: number): Promise<Gym[]>;
  abstract findManyNearby(params: GymFindManyNearbyParams): Promise<Gym[]>;
}

export default GymRepository;
