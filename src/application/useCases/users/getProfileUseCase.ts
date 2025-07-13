import { AppError } from "@/error";
import { GetUserProfileUseCaseResponse } from "@/interfaces/users.interface";
import UsersRepository from "@/repositories/user.repository";

class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      user,
    };
  }
}

export default GetUserProfileUseCase;
