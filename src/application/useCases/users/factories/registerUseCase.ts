import RegisterUseCase from "../registerUseCase";
import InMemoryUsersRepository from "@/__tests__/in-memory/users/user.in-memory.repository";

const factoryRegisterUseCase = () => {
  const userRepository = new InMemoryUsersRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  return registerUseCase;
};

export default factoryRegisterUseCase;
