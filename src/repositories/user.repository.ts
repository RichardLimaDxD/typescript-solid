import { Prisma, User } from "prisma/generated";

abstract class UsersRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}

export default UsersRepository;
