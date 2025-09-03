import { githubUserSchema, zod } from '@tomi/validation'

export type CreateUserDto = zod.infer<typeof githubUserSchema>;