import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    APIPORT: z.coerce.number().min(1024).max(65535).default(3003),
    DATABASE_URL: z.string().default('database.db'),
    REDIS_URL: z.string().url().optional(),
    JWT_SECRET: z.string().min(32).max(1024).optional(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const webEnvSchema = z.object({
    WEBPORT: z.coerce.number().min(1024).max(65535).default(3000),
    NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3003/api/v1'),
})

export type EnvType = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env)

export {
    envSchema,
    webEnvSchema,
    parsedEnv
}