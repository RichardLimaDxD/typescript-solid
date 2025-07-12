import z from "zod";
import { userSchema } from "@/schemas/users.schema";
import { User } from "prisma/generated";

export type UserRegisterUseCaseRequest = z.infer<typeof userSchema>;

export interface UserRegisterUseCaseResponse {
  user: User;
}
