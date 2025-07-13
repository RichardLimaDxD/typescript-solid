import { describe, it, expect, beforeEach, vi } from "vitest";
import InMemoryCheckInRepository from "@/__tests__/in-memory/check-in/check-in.in-memory.repository";
import CreateCheckInUseCase from "@/application/useCases/check-in/createUseCase";
import { AppError } from "@/error";

let checkInRepository: InMemoryCheckInRepository;
let createCheckInUseCase: CreateCheckInUseCase;

describe("Create Check In Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    createCheckInUseCase = new CreateCheckInUseCase(checkInRepository);
  });

  it("should be able to create a check in", async () => {
    const { checkIn } = await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
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
    });

    vi.setSystemTime(new Date(2025, 0, 2, 10, 0, 0));

    const { checkIn } = await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    expect(checkIn).toBeDefined();
    expect(checkIn.id).toBeDefined();
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 10, 0, 0));

    await createCheckInUseCase.execute({
      userId: "user-1",
      gymId: "gym-1",
    });

    await expect(() =>
      createCheckInUseCase.execute({
        userId: "user-1",
        gymId: "gym-1",
      }),
    ).rejects.toThrowError(new AppError("User already checked in today", 400));
  });
});
