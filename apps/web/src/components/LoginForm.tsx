"use client"

import { useState } from "react"
import { getGitHubUser, createUser, getUser } from "@/lib/api"
import { saveUserToStorage, setFakeTokenCookie } from "@/lib/auth"
import { AppUser } from "@/types"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const [mode, setMode] = useState<"github" | "manual">("github")
    const [username, setUsername] = useState("")
    const [manual, setManual] = useState({ name: "", email: "" })
    const router = useRouter()

    async function handleLoginGitHub(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        try {
            const gh = await getGitHubUser(username)
            const user: AppUser = {
                login: gh.login,
                email: gh.email,
                name: gh.name ?? gh.login,
                avatar_url: gh.avatar_url,
            }
            saveUserToStorage(user)
            setFakeTokenCookie(user)
            router.refresh()
        } catch {
            setError("Usuário não encontrado no GitHub")
        }
    }

    async function handleManual(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        try {
            const apiUser = await createUser({ name: manual.name, email: manual.email, login: manual.email || manual.name })

            const user: AppUser = {
                login: apiUser.username ?? manual.email ?? manual.name,
                name: apiUser.name ?? manual.name,
                email: apiUser.email ?? manual.email,
                avatar_url: apiUser.avatar_url ?? undefined,
            }

            saveUserToStorage(user)
            setFakeTokenCookie(user)
            router.refresh()
        } catch (err: any) {
            if (err?.response?.status === 409) {
                const user = await getUser(err.response.data.data.id)
                saveUserToStorage(user)
                setFakeTokenCookie(user)
                router.refresh()
            } else {
                setError(`${err?.message}: ${err.response.data?.message}` || "Erro ao criar usuário")
            }

        }
    }

    return (
        <div className="max-w-sm mx-auto mt-12 w-full">
            <div className="border rounded-lg p-6 shadow-sm">
                <h1 className="text-xl font-semibold mb-4 text-center">Acessar</h1>

                <div className="flex items-center justify-center gap-3 mb-4">
                    <button
                        type="button"
                        onClick={() => setMode("github")}
                        className={`px-3 py-1 rounded border ${mode === "github" ? "bg-black text-white" : ""}`}
                    >
                        GitHub
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("manual")}
                        className={`px-3 py-1 rounded border ${mode === "manual" ? "bg-black text-white" : ""}`}
                    >
                        Não tem GitHub?
                    </button>
                </div>

                {mode === "github" ? (
                    <form onSubmit={handleLoginGitHub} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Seu usuário do GitHub"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border rounded p-2"
                            required
                        />
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Entrar</button>
                    </form>
                ) : (
                    <form onSubmit={handleManual} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={manual.name}
                            onChange={(e) => setManual((s) => ({ ...s, name: e.target.value }))}
                            className="border rounded p-2"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            value={manual.email}
                            onChange={(e) => setManual((s) => ({ ...s, email: e.target.value }))}
                            className="border rounded p-2"
                            required
                        />
                        <button type="submit" className="bg-green-600 text-white p-2 rounded">Entrar</button>
                    </form>
                )}

                {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

            </div>
        </div>
    )
}
