import { githubUserSchema, zod } from '@tomi/validation';

const updateUser = githubUserSchema.partial()

export type UpdateUserDto = zod.infer<typeof updateUser>;