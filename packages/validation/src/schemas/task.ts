import z from "zod";

const taskSchema = z.object({
    id: z.number().int().positive().optional(),
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(500),
    completed: z.boolean().default(false),
    userLogin: z.string()
});

const updateTaskSchema = taskSchema.partial();

export {
    taskSchema,
    updateTaskSchema
}