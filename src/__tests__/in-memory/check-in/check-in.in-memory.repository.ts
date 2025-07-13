import CheckInRepository from "@/repositories/check-in.repository";
import { randomUUID } from "crypto";
import { Prisma, CheckIn } from "prisma/generated";
import dayjs from "dayjs";

class InMemoryCheckInRepository implements CheckInRepository {
  private items: CheckIn[] = [];

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
}

export default InMemoryCheckInRepository;
