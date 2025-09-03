'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TaskType } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "@/lib/api"
import { getUserClientCookie } from "@/lib/utils"

export function NewTaskDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const queryClient = useQueryClient()
    const user = getUserClientCookie()

    const mutation = useMutation({
        mutationFn: (data: TaskType) => createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['taskData'] })
            setIsOpen(false)
        },
        onError: (e) => {
            // setIsOpen(false)
            console.error("Erro ao criar tarefa", e)
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: TaskType = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            completed: false,
            userLogin: user?.login!
        }
        console.log(data)
        mutation.mutate(data)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nova Tarefa</DialogTitle>
                        <DialogDescription>
                            Adicione uma nova tarefa à sua lista.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Título</Label>
                            <Input id="title" name="title" required />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Descreva sua nova tarefa"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Criando..." : "Criar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
