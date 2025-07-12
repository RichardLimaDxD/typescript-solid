import env from "@/env";
import { PrismaClient } from "prisma/generated";

const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : [],
});

export default prisma;
