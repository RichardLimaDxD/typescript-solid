import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  JWT_SECRET: z.string(),
});

export default envSchema;
