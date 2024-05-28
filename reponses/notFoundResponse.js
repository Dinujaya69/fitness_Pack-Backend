import { StatusCodes } from "http-status-codes";

export function sendNotFoundResponse(response, resourceName = undefined) {
  return response.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: resourceName ? `${resourceName} not found` : "not found",
  });
}
