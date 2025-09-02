import z from "zod";
import id from "zod/v4/locales/id.js";

const taskSchema = z.object({
    id: z.number().int().positive().optional(),
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(500),
    completed: z.boolean().default(false),
});

const updateTaskSchema = taskSchema.partial().omit({ completed: true });

export {
    taskSchema,
    updateTaskSchema
}