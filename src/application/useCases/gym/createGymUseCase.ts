import {
  CreateGymUseCaseRequest,
  CreateGymUseCaseResponse,
} from "@/interfaces/gym.interface";
import GymRepository from "@/repositories/gym.repository";

class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}

export default CreateGymUseCase;
