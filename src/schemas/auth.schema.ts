import { z } from "zod";

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default authenticateSchema;
