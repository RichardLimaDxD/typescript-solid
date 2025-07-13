import { Gym } from "prisma/generated";

abstract class GymRepository {
  abstract findById(id: string): Promise<Gym | null>;
}

export default GymRepository;
