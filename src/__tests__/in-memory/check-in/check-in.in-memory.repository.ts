import CheckInRepository from "@/repositories/check-in.repository";
import { randomUUID } from "crypto";
import { Prisma, CheckIn } from "prisma/generated";
import dayjs from "dayjs";

class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    _date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(_date).startOf("day");
    const endOfTheDay = dayjs(_date).endOf("day");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === data.id);

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = data;
    }

    return data;
  }
}

export default InMemoryCheckInRepository;
