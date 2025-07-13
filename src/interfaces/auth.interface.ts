import { User } from "prisma/generated";

export interface AuthInterfaceUseCaseRequest {
  email: string;
  password: string;
}

export interface AuthInterfaceUseCaseResponse {
  user: User;
}
