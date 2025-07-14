import { CheckIn, Prisma } from "prisma/generated";

abstract class CheckInRepository {
  abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  abstract findById(id: string): Promise<CheckIn | null>;
  abstract findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null>;

  abstract findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  abstract countByUserId(userId: string): Promise<number>;
  abstract save(data: CheckIn): Promise<CheckIn>;
}

export default CheckInRepository;
