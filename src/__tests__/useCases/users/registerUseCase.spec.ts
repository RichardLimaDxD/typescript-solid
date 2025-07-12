import { describe, expect, it } from "vitest";
import RegisterUseCase from "@/application/useCases/users/registerUseCase";
import { compare } from "bcryptjs";
import InMemoryUsersRepository from "@/__tests__/in-memory/users/user.in-memory.repository";
import { AppError } from "@/error";

describe("Users Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Super Mario",
      email: "mario@mail.com",
      password: "123456",
    });

    expect(user.id).toBeDefined();
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toBe("Super Mario");
    expect(user.email).toBe("mario@mail.com");
    expect(user.password_hash).toBeDefined();
    expect(user.password_hash).toEqual(expect.any(String));
    expect(user.created_at).toBeDefined();
    expect(user.created_at).toEqual(expect.any(Date));
  });

  it("Should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Super Mario",
      email: "mario@mail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email: string = "mario@mail.com";

    await registerUseCase.execute({
      name: "Super Mario",
      email,
      password: "123456",
    });

    expect(() =>
      registerUseCase.execute({
        name: "Super Mario",
        email,
        password: "123456",
      }),
    ).rejects.toThrowError(new AppError("User already exists", 409));
  });
});
