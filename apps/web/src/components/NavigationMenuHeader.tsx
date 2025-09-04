"use client"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TiHome } from "react-icons/ti";

export function NavigationMenuHeader() {
    return (
        <NavigationMenu viewport={true}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">
                            <TiHome size={20} />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/docs">Web App</Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <a href="http://localhost:3001/api/docs" target="_blank">API</a>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Integrações</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/integrations/github">Github</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink aria-disabled asChild>
                                    <Link className="cursor-not-allowed" href="#">Em Breve...</Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                    <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <CircleHelpIcon />
                                        Backlog
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <CircleIcon />
                                        To Do
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="#" className="flex-row items-center gap-2">
                                        <CircleCheckIcon />
                                        Done
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem> */}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
