import { taskSchema, zod } from '@tomi/validation'

export type CreateTaskDto = zod.infer<typeof taskSchema>;