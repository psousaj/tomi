import axios from "axios"
import { AppUser, CreateUserPayload, GithubUserRepos, GithubUserResponse, TaskType } from "@/types"

const apiPort = 3003
const api = axios.create({
    baseURL: `http://localhost:${apiPort}/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
})

export default api

async function getTasks(userLogin: string) {
    const response = await api.get<TaskType[]>("/task", { params: { user: userLogin } })
    return response.data
}

async function createTask(data: { title: string; description: string, userLogin: string }) {
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

async function createUser(data: CreateUserPayload) {
    const response = await api.post("/user", data)
    return response.data
}

async function getUser(id: number) {
    const response = await api.get<AppUser>(`/user/${id}`)
    return response.data
}

// --- APIs externas ---
async function getGitHubUser(username: string) {
    const res = await axios.get<GithubUserResponse>(`https://api.github.com/users/${username}`)
    if (res.status !== 200) throw new Error("Usuário não encontrado no GitHub")
    return res.data
}

async function getGitHubUserRepos(username: string) {
    const res = await axios.get<GithubUserRepos[]>(`https://api.github.com/users/${username}/repos`)
    if (res.status !== 200) throw new Error("Nenhum repositório encontrado no GitHub")
    return res.data
}


export { getTasks, createTask, updateTask, deleteTask, createUser, getUser, getGitHubUser, getGitHubUserRepos }