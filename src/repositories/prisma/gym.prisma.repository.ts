import prisma from "@/database/prisma";
import { Gym, Prisma } from "prisma/generated";
import GymRepository from "../gym.repository";
import { GymFindManyNearbyParams } from "@/interfaces/gym.interface";

class GymPrismaRepository implements GymRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    });

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return gyms;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: GymFindManyNearbyParams): Promise<Gym[]> {
    const gyms: Gym[] = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) *
      cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) +
      sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}

export default GymPrismaRepository;
