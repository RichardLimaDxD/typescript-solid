import { z } from "zod";

const gymSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

const gymsSearchSchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
});

const nearbyGymsSchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export { gymSchema, gymsSearchSchema, nearbyGymsSchema };
