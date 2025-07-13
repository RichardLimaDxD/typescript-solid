import { describe, it, expect, beforeEach } from "vitest";
import InMemoryUsersRepository from "@/__tests__/in-memory/users/user.in-memory.repository";
import GetUserProfileUseCase from "@/application/useCases/users/getProfileUseCase";
import { AppError } from "@/error";

let userRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  });

  it("should be able to get user profile", async () => {
    const user = await userRepository.create({
      name: "Super Mario",
      email: "super.mario@example.com",
      password_hash: "123456",
    });

    const { user: userProfile } = await getUserProfileUseCase.execute(user.id);

    expect(userProfile.id).toEqual(expect.any(String));
    expect(userProfile.name).toEqual("Super Mario");
    expect(userProfile.email).toEqual("super.mario@example.com");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      getUserProfileUseCase.execute("non-existing-id"),
    ).rejects.toThrowError(new AppError("User not found", 404));
  });
});
