import {
  FetchNearbyGymsUseCaseRequest,
  FetchNearbyGymsUseCaseResponse,
} from "@/interfaces/gym.interface";
import GymRepository from "@/repositories/gym.repository";

class FetchNearByGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}

export default FetchNearByGymsUseCase;
