import { describe, it, expect } from 'vitest';

import {
  AppError,
  NetworkError,
  ServerError,
  NotFoundError,
  ValidationError,
  isAppError,
  getErrorMessage,
} from '@/utils/errors';

describe('AppError', () => {
  it('should create an error with message, statusCode, and details', () => {
    const error = new AppError('Something failed', 400, { field: 'email' });
    expect(error.message).toBe('Something failed');
    expect(error.statusCode).toBe(400);
    expect(error.details).toEqual({ field: 'email' });
    expect(error.name).toBe('AppError');
    expect(error).toBeInstanceOf(Error);
  });

  it('should default statusCode to 0', () => {
    const error = new AppError('fail');
    expect(error.statusCode).toBe(0);
  });
});

describe('NetworkError', () => {
  it('should create with default message', () => {
    const error = new NetworkError();
    expect(error.message).toBe('Network request failed');
    expect(error.name).toBe('NetworkError');
    expect(error.statusCode).toBe(0);
    expect(error).toBeInstanceOf(AppError);
  });

  it('should accept custom message', () => {
    const error = new NetworkError('Offline');
    expect(error.message).toBe('Offline');
  });
});

describe('ServerError', () => {
  it('should create with default message and status 500', () => {
    const error = new ServerError();
    expect(error.message).toBe('Server error');
    expect(error.statusCode).toBe(500);
    expect(error.name).toBe('ServerError');
  });

  it('should accept custom message and status', () => {
    const error = new ServerError('Bad gateway', 502);
    expect(error.message).toBe('Bad gateway');
    expect(error.statusCode).toBe(502);
  });
});

describe('NotFoundError', () => {
  it('should create with default message and status 404', () => {
    const error = new NotFoundError();
    expect(error.message).toBe('Resource not found');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('NotFoundError');
  });
});

describe('ValidationError', () => {
  it('should create with default message and status 422', () => {
    const error = new ValidationError();
    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(422);
    expect(error.name).toBe('ValidationError');
  });

  it('should accept details', () => {
    const error = new ValidationError('Invalid input', { field: 'email' });
    expect(error.details).toEqual({ field: 'email' });
  });
});

describe('isAppError', () => {
  it('should return true for AppError instances', () => {
    expect(isAppError(new AppError('test'))).toBe(true);
    expect(isAppError(new NetworkError())).toBe(true);
    expect(isAppError(new ServerError())).toBe(true);
  });

  it('should return false for non-AppError values', () => {
    expect(isAppError(new Error('plain'))).toBe(false);
    expect(isAppError('string')).toBe(false);
    expect(isAppError(null)).toBe(false);
    expect(isAppError(undefined)).toBe(false);
  });
});

describe('getErrorMessage', () => {
  it('should return message from AppError', () => {
    const error = new AppError('Something failed', 400);
    expect(getErrorMessage(error)).toBe('Something failed');
  });

  it('should return message from NetworkError', () => {
    const error = new NetworkError();
    expect(getErrorMessage(error)).toBe('Network request failed');
  });

  it('should return message from plain Error', () => {
    const error = new Error('plain error');
    expect(getErrorMessage(error)).toBe('plain error');
  });

  it('should return default message for unknown errors', () => {
    expect(getErrorMessage('string error')).toBe('An unexpected error occurred');
    expect(getErrorMessage(42)).toBe('An unexpected error occurred');
    expect(getErrorMessage(null)).toBe('An unexpected error occurred');
  });
});
