import factoryFetchNearbyGymUseCase from "@/application/factories/fetchNearbyGymUseCase";
import { nearbyGymsSchema } from "@/schemas/gym.schema";
import { FastifyReply, FastifyRequest } from "fastify";

const nearByGymsController = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const { latitude, longitude } = nearbyGymsSchema.parse(request.query);

  const fetchNearbyGymsUseCase = factoryFetchNearbyGymUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return response.status(200).send({ gyms });
};

export default nearByGymsController;
