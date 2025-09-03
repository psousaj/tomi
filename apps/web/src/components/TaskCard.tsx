'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { TaskTable } from "./TaskTable"
import { NewTaskDialog } from "./NewTaskDialog"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTasks, deleteTask, updateTask } from "@/lib/api"
import { AppUser, TaskType } from "@/types"
import { getCookie } from "cookies-next"
import { getUserClientCookie } from "@/lib/utils"


export function TaskCard() {
    const queryClient = useQueryClient()
    const user = getUserClientCookie()

    const { isLoading, error, data } = useQuery({
        queryKey: ['taskData'],
        queryFn: async () => await getTasks(user?.login!),
        throwOnError: true
    })

    const tasks = Array.isArray(data) ? data : []

    const toggleCompleteTaskMutation = useMutation({
        mutationFn: (task: TaskType) => updateTask(task.id!, task),
        onSuccess: () => {
            console.log("Task completed:")
            queryClient.invalidateQueries({ queryKey: ['taskData'] })
        }
    })

    const updateTaskMutation = useMutation({
        mutationFn: (task: TaskType) => updateTask(task.id!, task),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['taskData'] })
    })

    const deleteTaskMutation = useMutation({
        mutationFn: (task: TaskType) => deleteTask(task.id!),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['taskData'] })
    })

    return (
        <Card className="w-full min-w-72 max-w-[500px]">
            <CardHeader>
                <CardTitle className="capitalize">Lista de tarefas</CardTitle>
                <CardDescription>
                    Gerencie suas tarefas de forma eficiente
                </CardDescription>
                <CardAction>
                    <NewTaskDialog>
                        <Button variant="default">Nova Tarefa</Button>
                    </NewTaskDialog>
                </CardAction>
            </CardHeader>

            <CardContent>
                {isLoading && <p className="text-center text-sm text-muted-foreground py-4">Carregando tarefas...</p>}
                {error && <p className="text-center text-sm text-destructive py-4">Erro ao carregar tarefas</p>}
                {!isLoading && !error && (
                    <TaskTable
                        tasks={tasks}
                        toggleCompleteTaskFn={(task) => toggleCompleteTaskMutation.mutate(task)}
                        updateTaskFn={(task) => updateTaskMutation.mutate(task)}
                        deleteTaskFn={(task) => deleteTaskMutation.mutate(task)}
                    />
                )}
            </CardContent>
        </Card>
    )
}

