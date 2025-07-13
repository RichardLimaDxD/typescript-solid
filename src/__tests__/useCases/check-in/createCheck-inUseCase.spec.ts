import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import InMemoryCheckInRepository from "@/__tests__/in-memory/check-in/check-in.in-memory.repository";
import CreateCheckInUseCase from "@/application/useCases/check-in/createCheck-inUseCase";
import { AppError } from "@/error";
import InMemoryGymRepository from "@/__tests__/in-memory/gym/gym.in-memory.repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInRepository;
let createCheckInUseCase: CreateCheckInUseCase;
let gymRepository: InMemoryGymRepository;

describe("Create Check In Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();

    gymRepository = new InMemoryGymRepository();

    createCheckInUseCase = new CreateCheckInUseCase(
      checkInRepository,
      gymRepository,
    );

    await gymRepository.create({
      id: "gym-1",
      title: "Nodejs Gym",
      description: null,
      phone: null,
      latitude: -23.1896771,
      longitude: -46.9891027,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a check in", async () => {
    const { checkIn } = await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -23.1896771,
      userLongitude: -46.9891027,
    });

    expect(checkIn).toBeDefined();
    expect(checkIn.id).toBeDefined();
    expect(checkIn.user_id).toBe("user-1");
    expect(checkIn.gym_id).toBe("gym-1");
    expect(checkIn.validated_at).toBeNull();
    expect(checkIn.created_at).toBeDefined();
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 10, 0, 0));

    await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -23.1896771,
      userLongitude: -46.9891027,
    });

    vi.setSystemTime(new Date(2025, 0, 2, 10, 0, 0));

    const { checkIn } = await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -23.1896771,
      userLongitude: -46.9891027,
    });

    expect(checkIn).toBeDefined();
    expect(checkIn.id).toBeDefined();
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 10, 0, 0));

    await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -23.1896771,
      userLongitude: -46.9891027,
    });

    await expect(() =>
      createCheckInUseCase.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: -23.1896771,
        userLongitude: -46.9891027,
      }),
    ).rejects.toThrowError(new AppError("User already checked in today", 400));
  });

  it("should not be able to check in on distant gym", async () => {
    gymRepository.items.push({
      id: "gym-2",
      title: "Gym 2",
      description: "Gym 2 description",
      phone: "1234567890",
      latitude: new Decimal(-23.1896771),
      longitude: new Decimal(-46.9891027),
    });

    await expect(() =>
      createCheckInUseCase.execute({
        userId: "user-1",
        gymId: "gym-2",
        userLatitude: -23.1457722,
        userLongitude: -46.7809619,
      }),
    ).rejects.toThrowError(new AppError("Gym is too far away", 400));
  });
});
