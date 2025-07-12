import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import env from "./env";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandle = (
  error: Error,
  _request: FastifyRequest,
  response: FastifyReply,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).send({ message: error.message });
  }

  if (error instanceof ZodError) {
    const errors = Object.entries(error.format())
      .filter(([field]) => field !== "_errors")
      .map(([field, issue]) => ({
        field,
        message: issue?._errors?.join(", ") || "Invalid field",
      }));

    return response.status(400).send({
      statusCode: 400,
      message: "Validation error.",
      errors,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return response.status(500).send({ message: "Internal Server Error" });
};

export { errorHandle, AppError };
