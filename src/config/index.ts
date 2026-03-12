/**
 * Centralized application configuration.
 * All environment variable access goes through this module.
 * Next.js exposes client env vars with the NEXT_PUBLIC_ prefix via process.env.
 */

export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'NextjsBoilerplate',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'development',

  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? '30000', 10),
  },

  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment:
      process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ??
      process.env.NEXT_PUBLIC_ENVIRONMENT ??
      'development',
    tracesSampleRate: parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? '0.1'),
  },
} as const;

export const isProduction = config.environment === 'production';
export const isDevelopment = config.environment === 'development';
