import { Button } from "@/components/ui/button"
import { Home, HomeIcon } from "lucide-react"
import Link from "next/link"

export default function Page() {
    return (
        <main className="bg-black text-white h-screen w-full flex flex-col justify-center items-center">
            <h2 className="font-normal text-center text-4xl">
                Página não encontrada :(
            </h2>
            <Link href='/'>
                <Button variant="outline" className="border bg-emerald-400 rounded-lg text-3xl mt-2 px-4 py-2 items-center justify-center flex">Voltar <HomeIcon width={30} height={30} color="black" fill="white" /></Button></Link>
        </main>
    )
}