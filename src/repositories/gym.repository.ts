import { Gym, Prisma } from "prisma/generated";

abstract class GymRepository {
  abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
  abstract findById(id: string): Promise<Gym | null>;
}

export default GymRepository;
