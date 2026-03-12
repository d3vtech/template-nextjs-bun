/**
 * Optional Sentry integration.
 * Enable by setting NEXT_PUBLIC_SENTRY_DSN in environment. No-op when unset.
 * For Next.js, @sentry/nextjs handles both client and server instrumentation.
 */
import * as Sentry from '@sentry/nextjs';

import { config } from '@/config';
import { logger } from '@/utils/logger';

export function initSentry(): void {
  if (!config.sentry.dsn) {
    logger.info('Sentry disabled (no NEXT_PUBLIC_SENTRY_DSN)');
    return;
  }

  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    tracesSampleRate: config.sentry.tracesSampleRate,
    sendDefaultPii: false,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  logger.info('Sentry initialized', { environment: config.sentry.environment });
}

export { Sentry };
