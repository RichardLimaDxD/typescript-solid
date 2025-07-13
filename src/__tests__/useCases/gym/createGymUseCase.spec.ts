import InMemoryGymRepository from "@/__tests__/in-memory/gym/gym.in-memory.repository";
import CreateGymUseCase from "@/application/useCases/gym/createGymUseCase";
import { beforeEach, describe, expect, it } from "vitest";

let gymRepository: InMemoryGymRepository;
let createGymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    createGymUseCase = new CreateGymUseCase(gymRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "Nodejs Gym",
      description: null,
      phone: null,
      latitude: -23.1896771,
      longitude: -46.9891027,
    });

    expect(gym.id).toBeDefined();
    expect(gym.title).toBe("Nodejs Gym");
    expect(gym.description).toBeNull();
    expect(gym.phone).toBeNull();
    expect(gym.latitude.toNumber()).toBe(-23.1896771);
    expect(gym.longitude.toNumber()).toBe(-46.9891027);
  });
});
