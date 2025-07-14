import {
  SearchGymsUseCaseRequest,
  SearchGymsUseCaseResponse,
} from "@/interfaces/gym.interface";
import GymRepository from "@/repositories/gym.repository";

class SearchGymsUseCase {
  constructor(private gymRepository: GymRepository) {}
  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return { gyms };
  }
}

export default SearchGymsUseCase;
