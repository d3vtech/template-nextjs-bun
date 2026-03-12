/**
 * Structured logger.
 * Provides log levels and suppresses debug logs in production.
 * Use this instead of console.log throughout the app.
 */
import { isProduction } from '@/config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

function formatEntry(entry: LogEntry): string {
  const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
  if (entry.data !== undefined) {
    return `${base} ${JSON.stringify(entry.data)}`;
  }
  return base;
}

function log(level: LogLevel, message: string, data?: unknown): void {
  if (level === 'debug' && isProduction) {
    return;
  }

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case 'error':
      console.error(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(formatted);
      break;
  }
}

export const logger = {
  debug: (message: string, data?: unknown) => log('debug', message, data),
  info: (message: string, data?: unknown) => log('info', message, data),
  warn: (message: string, data?: unknown) => log('warn', message, data),
  error: (message: string, data?: unknown) => log('error', message, data),
};
