import InMemoryCheckInRepository from "@/__tests__/in-memory/check-in/check-in.in-memory.repository";
import GetUserMethicsUseCase from "@/application/useCases/check-in/getUserMethicsUseCase";
import { beforeEach, describe, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInRepository;
let getUserMethicsUseCase: GetUserMethicsUseCase;

describe("Get User Methics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    getUserMethicsUseCase = new GetUserMethicsUseCase(checkInsRepository);
  });

  it("should be able to get user methics", async () => {
    await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-1",
    });

    await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-2",
    });

    const { checkInsCount } = await getUserMethicsUseCase.execute({
      userId: "user-1",
    });

    expect(checkInsCount).toBe(2);
  });
});
