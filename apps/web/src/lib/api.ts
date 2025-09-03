import axios from "axios"
import { envSchema } from '@tomi/validation'
import { TaskType } from "@/types"
import { config } from 'dotenv'

const apiPort = 3003
const api = axios.create({
    baseURL: `http://localhost:${apiPort}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
})

export default api

async function getTasks() {
    const response = await api.get<TaskType[]>("/task")
    return response.data
}

async function createTask(data: { title: string; description: string }) {
    const response = await api.post("/task", data)
    return response.data
}

async function updateTask(id: number, data: Partial<TaskType>) {
    const response = await api.patch<TaskType>(`/task/${id}`, data)
    return response.data
}

async function deleteTask(id: number) {
    const response = await api.delete(`/task/${id}`)
    return response.data
}

export { getTasks, createTask, updateTask, deleteTask }