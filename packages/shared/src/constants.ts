export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const API_VERSION = 'v1';

export const REGEX = {
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  POSTAL_CODE: /^[A-Z0-9\s-]{3,10}$/i,
} as const;

export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
} as const;
