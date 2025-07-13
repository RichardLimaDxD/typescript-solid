import { Gym } from "prisma/generated";
import GymRepository from "../gym.repository";
import prisma from "@/database/prisma";

class GymPrismaRepository implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    });

    return gym;
  }
}

export default GymPrismaRepository;
