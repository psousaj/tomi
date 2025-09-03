'use client'

import ThemeSwitch from "./ThemeSwitch";
import { NavigationMenuHeader } from "./NavigationMenuHeader";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useLayoutEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import { AppUser } from "@/types";
import { clearFakeTokenCookie } from "@/lib/auth";

export default function Header() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [userName, setUserName] = useState<string | null>(null)

    useLayoutEffect(() => {
        const cookie = getCookie("fake_jwt") as AppUser | undefined
        if (cookie) {
            try {
                const user = JSON.parse(cookie as unknown as string) as AppUser
                setAvatarUrl(user.avatar_url || null)
                setUserLogged(true)
                setUserName(user.name || null)
            } catch (e) {
                console.error("Erro parseando cookie:", e)
            }
        }
    }, [avatarUrl, userLogged])

    return (
        <nav className="flex items-center justify-between border-b border-gray-200 pb-1.5 px-4">
            <NavigationMenuHeader />
            <div className="flex gap-5">
                <ThemeSwitch />
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src={avatarUrl ?? "https://github.com/shadcn.png"} />
                            <AvatarFallback>
                                {avatarUrl ? "U" : "CN"}
                            </AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="p-3">
                        {avatarUrl || userLogged ? (
                            <div className="flex flex-col gap-2">
                                <span className="text-sm">Bem vindo{userName ? `, ${userName}!` : '!'}</span>
                                <button
                                    onClick={() => {
                                        // logout simples
                                        clearFakeTokenCookie()
                                        window.location.reload()
                                    }}
                                    className="text-red-500 text-sm"
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <a href="/login" className="text-blue-500 text-sm">
                                Entrar
                            </a>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}
