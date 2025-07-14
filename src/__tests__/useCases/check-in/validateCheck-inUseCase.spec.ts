import InMemoryCheckInRepository from "@/__tests__/in-memory/check-in/check-in.in-memory.repository";
import { ValidateCheckInUseCase } from "@/application/useCases/check-in/validateCheck-inUseCase";
import { AppError } from "@/error";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let checkInsRepository: InMemoryCheckInRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: "inexistent-check-in-id",
      }),
    ).rejects.toThrowError(new AppError("Check-in not found", 404));
  });

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMs: number = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toThrowError(new AppError("Check-in expired", 400));
  });
});
