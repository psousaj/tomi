import { AppUser } from "@/types"
import { getCookie, setCookie } from 'cookies-next/client'


export function setFakeTokenCookie(value: AppUser, days = 7) {
    const maxAge = days * 24 * 60 * 60
    setCookie("fake_jwt", JSON.stringify(value), { maxAge, path: "/", sameSite: "lax" })
}

export function clearFakeTokenCookie() {
    setCookie("fake_jwt", "", { maxAge: 0, path: "/", sameSite: "lax" })
}

const STORAGE_KEY = "user"

export function saveUserToStorage(user: AppUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function getUserFromStorage(): AppUser | null {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppUser) : null
}

export function clearAuth() {
    clearFakeTokenCookie()
    localStorage.removeItem(STORAGE_KEY)
}
