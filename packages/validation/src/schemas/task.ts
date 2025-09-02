import z from "zod";

const taskSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(500),
    completed: z.boolean().default(false),
});

const updateTaskSchema = taskSchema.partial().omit({ completed: true });

export {
    taskSchema,
    updateTaskSchema
}