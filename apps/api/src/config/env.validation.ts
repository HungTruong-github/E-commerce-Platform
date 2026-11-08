import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_PORT: z.coerce.number().default(4000),
  API_HOST: z.string().default('0.0.0.0'),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  DATABASE_URL: z
    .string()
    .default(
      'postgresql://ecommerce_user:ecommerce_dev_password@localhost:5432/ecommerce_db?schema=public',
    ),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),

  JWT_SECRET: z.string().min(16).default('development-only-jwt-secret-minimum-32-chars-long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().min(16).default('development-only-refresh-jwt-secret-key-long'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),

  THROTTLE_TTL: z.coerce.number().default(60),
  THROTTLE_LIMIT: z.coerce.number().default(100),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new Error(`Environment validation failed: ${errorDetails}`);
  }

  return result.data;
}
