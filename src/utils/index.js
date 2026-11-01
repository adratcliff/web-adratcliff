import { callApi } from '@/utils/api';
import { errorLogging } from '@/endpoints';

export const handleError = (label, error, props={}) => {
  const debugLogs = localStorage.getItem('aratcliff-debug-logs');

  if (debugLogs) {
    console.error(label, error);
  }

  if (error?.status === 401) return;

  callApi(errorLogging({
    ...props,
    label,
    error: error instanceof Error ? error.stack || error.message : JSON.stringify(error),
  })).catch((err) => console.warn(`Failed to log ${label} error`, err));
};

export * from './api.js';
export * from './colors.js';
export * from './math.js';
export * from './objects.js';
export * from './stores.js';
export * from './strings.js';