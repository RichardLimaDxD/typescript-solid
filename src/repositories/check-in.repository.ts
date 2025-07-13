import { CheckIn, Prisma } from "prisma/generated";

abstract class CheckInRepository {
  abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  abstract findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null>;
}

export default CheckInRepository;
