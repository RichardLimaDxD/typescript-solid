import InMemoryGymRepository from "@/__tests__/in-memory/gym/gym.in-memory.repository";
import SearchGymsUseCase from "@/application/useCases/gym/searchGymsUseCase";
import { beforeEach, describe, expect, it } from "vitest";

let gymRepository: InMemoryGymRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymRepository.create({
      id: "gym-1",
      title: "Gym Javascript",
      description: null,
      phone: null,
      latitude: -23.1896771,
      longitude: -46.9891027,
    });

    await gymRepository.create({
      id: "gym-2",
      title: "Gym Typescript",
      description: null,
      phone: null,
      latitude: -23.1896771,
      longitude: -46.9891027,
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Gym Javascript",
      }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Gym Javascript ${i}`,
        description: null,
        phone: null,
        latitude: -23.1896771,
        longitude: -46.9891027,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Gym Javascript 21",
      }),
      expect.objectContaining({
        title: "Gym Javascript 22",
      }),
    ]);
  });
});
