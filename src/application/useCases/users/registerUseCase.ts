import { AppError } from "@/error";
import {
  UserRegisterUseCaseRequest,
  UserRegisterUseCaseResponse,
} from "@/interfaces/users.interface";
import UsersRepository from "@/repositories/user.repository";
import { hash } from "bcryptjs";

class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: UserRegisterUseCaseRequest): Promise<UserRegisterUseCaseResponse> {
    const password_hash: string = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new AppError("User already exists", 409);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}

export default RegisterUseCase;
