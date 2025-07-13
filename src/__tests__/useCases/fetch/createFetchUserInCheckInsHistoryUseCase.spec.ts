import { describe, it, expect, beforeEach } from "vitest";

import FetchUserInCheckInsHistoryUseCase from "@/application/useCases/fetch/createFetchUserInCheckInsHistoryUseCase";
import InMemoryCheckInRepository from "@/__tests__/in-memory/check-in/check-in.in-memory.repository";

let checkInRepository: InMemoryCheckInRepository;
let fetchUserInCheckInsHistoryUseCase: FetchUserInCheckInsHistoryUseCase;

describe("Fetch User In Check Ins History Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    fetchUserInCheckInsHistoryUseCase = new FetchUserInCheckInsHistoryUseCase(
      checkInRepository,
    );
  });

  it("should be able to fetch check ins history", async () => {
    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkIns } = await fetchUserInCheckInsHistoryUseCase.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: "user-01",
        gym_id: `gym-${i}`,
      });
    }

    const { checkIns } = await fetchUserInCheckInsHistoryUseCase.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
