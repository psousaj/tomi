import { updateTaskSchema, zod } from '@tomi/validation';

export type UpdateTaskDto = zod.infer<typeof updateTaskSchema>;