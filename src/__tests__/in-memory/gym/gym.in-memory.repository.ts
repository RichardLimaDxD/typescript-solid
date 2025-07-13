import GymRepository from "@/repositories/gym.repository";
import { Gym } from "prisma/generated";

class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}

export default InMemoryGymRepository;
