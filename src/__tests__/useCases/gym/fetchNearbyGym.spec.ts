import InMemoryGymRepository from "@/__tests__/in-memory/gym/gym.in-memory.repository";
import FetchNearByGymsUseCase from "@/application/useCases/gym/fetchNearbyGymUseCase";
import { beforeEach, describe, expect, it } from "vitest";

let gymRepository: InMemoryGymRepository;
let fetchNearByGymsUseCase: FetchNearByGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    fetchNearByGymsUseCase = new FetchNearByGymsUseCase(gymRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.1896771,
      longitude: -46.9891027,
    });

    await gymRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await fetchNearByGymsUseCase.execute({
      userLatitude: -23.1896771,
      userLongitude: -46.9891027,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
