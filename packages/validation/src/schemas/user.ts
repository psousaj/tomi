import z from "zod";

const githubUserSchema = z.object({
    login: z.string(),
    name: z.string(),
    email: z.string(),
    avatar_url: z.string().optional()
})

const updateUserSchema = z.object({
    login: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    avatar_url: z.string().optional()
})

export { githubUserSchema, updateUserSchema }