import { User } from "prisma/generated";

interface AuthInterfaceUseCaseRequest {
  email: string;
  password: string;
}

interface AuthInterfaceUseCaseResponse {
  user: User;
}

export { AuthInterfaceUseCaseRequest, AuthInterfaceUseCaseResponse };
