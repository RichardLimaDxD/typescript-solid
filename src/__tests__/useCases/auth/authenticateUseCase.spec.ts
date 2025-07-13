import InMemoryUsersRepository from "@/__tests__/in-memory/users/user.in-memory.repository";
import { AuthenticateUseCase } from "@/application/useCases/auth/authenticateUseCase";
import { AppError } from "@/error";
import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

let userRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(userRepository);
  });

  it("should be able to authenticate", async () => {
    await userRepository.create({
      name: "Super Man",
      email: "super@man.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "super@man.com",
      password: "123456",
    });

    expect(user).toBeDefined();
    expect(user.email).toBe("super@man.com");
    expect(user.name).toBe("Super Man");
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      authenticateUseCase.execute({
        email: "wrong@email.com",
        password: "123456",
      }),
    ).rejects.toThrowError(new AppError("Invalid credentials", 404));
  });

  it("should not be able to authenticate with wrong password", async () => {
    await userRepository.create({
      name: "Super Man",
      email: "super@man.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      authenticateUseCase.execute({
        email: "super@man.com",
        password: "wrong-password",
      }),
    ).rejects.toThrowError(new AppError("Invalid credentials", 404));
  });
});
