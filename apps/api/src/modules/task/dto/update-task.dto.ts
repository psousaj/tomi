import { updateTaskSchema, z } from '@tomi/validation';

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;