import GymRepository from "@/repositories/gym.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { Gym, Prisma } from "prisma/generated";

class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      ...data,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.items
      .filter((item) => {
        return item.title.includes(query);
      })
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }
}

export default InMemoryGymRepository;
