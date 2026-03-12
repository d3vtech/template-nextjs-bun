/**
 * Application error classes.
 * Use these instead of raw Error or API error shapes.
 * All API errors are mapped to these in the API client interceptors.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details: Record<string, unknown> | undefined;

  constructor(message: string, statusCode: number = 0, details?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network request failed') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class ServerError extends AppError {
  constructor(message = 'Server error', statusCode = 500) {
    super(message, statusCode);
    this.name = 'ServerError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: Record<string, unknown>) {
    super(message, 422, details);
    this.name = 'ValidationError';
  }
}

/**
 * Type guard to check if an unknown error is an AppError.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Extract a user-friendly message from any error.
 */
export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
