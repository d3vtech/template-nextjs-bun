/**
 * Centralized HTTP client.
 * Single Axios instance with interceptors for auth, error handling, and logging.
 * All API calls should use this client; do not create ad-hoc Axios instances.
 */
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

import { config } from '@/config';
import { AppError, NetworkError, ServerError } from '@/utils/errors';
import { logger } from '@/utils/logger';

export const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    logger.debug(`[API] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    return requestConfig;
  },
  (error: AxiosError) => {
    logger.error('[API] Request error', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      throw new NetworkError('Network request failed. Check your connection.');
    }

    const status = error.response.status;
    const data = error.response.data as Record<string, unknown> | undefined;
    const message =
      (data?.error as Record<string, string>)?.message ??
      (data?.message as string) ??
      'An unexpected error occurred';

    if (status >= 500) {
      throw new ServerError(message, status);
    }

    throw new AppError(message, status, data);
  },
);

/**
 * Set the Authorization header for all subsequent requests.
 * Call with null/undefined to clear.
 */
export function setAuthToken(token: string | null): void {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}
