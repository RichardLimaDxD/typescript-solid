import InMemoryCheckInRepository from "@/__tests__/in-memory/check-in/check-in.in-memory.repository";
import { ValidateCheckInUseCase } from "@/application/useCases/check-in/validateCheck-inUseCase";
import { AppError } from "@/error";
import { beforeEach, describe, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);
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
});
