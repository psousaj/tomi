import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between border-b border-gray-200 pb-1.5 px-4">
            <div className="flex items-center space-x-4">
                <Link href="/" className="text-lg font-semibold">
                    Home
                </Link>
                <Link href="/about" className="text-lg font-semibold">
                    About
                </Link>
                <Link href="/contact" className="text-lg font-semibold">
                    Contact
                </Link>
            </div>
            <ThemeSwitch />
        </nav>
    );
}
