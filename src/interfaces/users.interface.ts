import z from "zod";
import { userSchema } from "@/schemas/users.chema";
import { User } from "prisma/generated";

export type UserRegisterUseCaseRequest = z.infer<typeof userSchema>;

export interface UserRegisterUseCaseResponse {
  user: User;
}
