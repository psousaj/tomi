import { taskSchema, z } from '@tomi/validation'

export type TaskType = z.infer<typeof taskSchema>