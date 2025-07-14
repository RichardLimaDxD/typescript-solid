import RegisterUseCase from "../useCases/users/registerUserUseCase";
import InMemoryUsersRepository from "@/__tests__/in-memory/users/user.in-memory.repository";

const factoryRegisterUseCase = () => {
  const repository = new InMemoryUsersRepository();
  const useCase = new RegisterUseCase(repository);

  return useCase;
};

export default factoryRegisterUseCase;
