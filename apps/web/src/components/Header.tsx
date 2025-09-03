import ThemeSwitch from "./ThemeSwitch";
import { NavigationMenuHeader } from "./NavigationMenuHeader";

export default function Header() {
    return (
        <nav className="flex items-center justify-between border-b border-gray-200 pb-1.5 px-4">
            <NavigationMenuHeader />
            <ThemeSwitch />
        </nav>
    );
}
