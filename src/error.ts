/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import env from "./env";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
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
    const formattedErrors = Object.entries(error.format())
      .filter(([key]) => key !== "_errors")
      .map(([field, value]: [string, any]) => ({
        field,
        message: value._errors.join(", "),
      }));

    return response.status(400).send({
      statusCode: 400,
      message: "Validation error.",
      errors: formattedErrors,
    });
  }

  if (env.NODE_ENV !== "production") console.error(error);

  return response.status(500).send({ message: "Internal Server Error" });
};

export { errorHandle, AppError };
