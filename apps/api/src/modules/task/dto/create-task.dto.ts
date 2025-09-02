import { taskSchema, z } from '@tomi/validation'

export type CreateTaskDto = z.infer<typeof taskSchema>;