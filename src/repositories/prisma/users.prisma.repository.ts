import prisma from "@/database/prisma";
import { Prisma, User } from "prisma/generated";
import UsersRepository from "../user.repository";

class UsersPrismaRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersPrismaRepository;
