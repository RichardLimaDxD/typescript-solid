import { Prisma, CheckIn } from "prisma/generated";
import CheckInRepository from "../check-in.repository";
import prisma from "@/database/prisma";

class CheckInPrismaRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfTheDay = new Date(date.setHours(23, 59, 59, 999));

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    });

    return checkIn;
  }
}

export default CheckInPrismaRepository;
