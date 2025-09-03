import { AppUser } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { getCookie } from "cookies-next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserClientCookie() {
  const raw = getCookie('fake_jwt') as string | undefined;
  const user: AppUser | null = raw ? JSON.parse(raw) : null;
  return user
}