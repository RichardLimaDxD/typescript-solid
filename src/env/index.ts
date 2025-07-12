import "dotenv/config";
import envSchema from "../schemas/env.schema";
import { Env } from "../interfaces/env.interface";

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}

const env: Env = _env.data;

export default env;
