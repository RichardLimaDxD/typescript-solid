import { AppError } from "@/error";
import {
  AuthInterfaceUseCaseRequest,
  AuthInterfaceUseCaseResponse,
} from "@/interfaces/auth.interface";
import UsersRepository from "@/repositories/user.repository";
import { compare } from "bcryptjs";

class AuthenticateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthInterfaceUseCaseRequest): Promise<AuthInterfaceUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 404);
    }

    const doesPasswordMatchs = await compare(password, user.password_hash);

    if (!doesPasswordMatchs) {
      throw new AppError("Invalid credentials", 404);
    }

    // const token = sign({ email }, process.env.JWT_SECRET, {
    //   subject: user.id,
    // });

    return {
      user,
    };
  }
}

export { AuthenticateUseCase };
