"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { TaskType } from "@/types"
import { useEffect, useState } from "react"

type UpdateTaskDrawerProps = {
    task: TaskType | null
    isOpen: boolean
    onClose: () => void
    updateTaskFn: (task: TaskType) => void
}

export function UpdateTaskDrawer({ task, isOpen, onClose, updateTaskFn }: UpdateTaskDrawerProps) {
    const [title, setTitle] = useState(task?.title || "")
    const [description, setDescription] = useState(task?.description || "")

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description)
        }
    }, [task])

    if (!task) return null

    const handleUpdate = () => {
        updateTaskFn({ ...task, title, description })
        onClose()
    }

    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Editar Task</DrawerTitle>
                        <DrawerDescription>Atualize os dados da tarefa.</DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pb-0">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <DrawerFooter>
                        <Button onClick={handleUpdate}>Salvar</Button>
                        <DrawerClose onClick={onClose} asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
