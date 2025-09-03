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

// dialog e tabs

const dataTable = [
    {
        title: "INV001",
        description: "Paid",
        completed: true,
    },
    {
        title: "INV002",
        description: "Pending",
        completed: false,
    },
    {
        title: "INV003",
        description: "Unpaid",
        completed: false,
    },
    {
        title: "INV004",
        description: "Paid",
        completed: true,
    },
]

export function TaskCard() {
    return (
        <Card className="w-full min-w-72 max-w-[500px]">
            <CardHeader >
                <CardTitle className="capitalize">Lista de tarefas</CardTitle>
                <CardDescription>
                    Gerencie suas tarefas de forma eficiente
                </CardDescription>
                <CardAction>
                    <NewTaskDialog>
                        <Button variant="default">Nova Tarefa</Button>
                    </NewTaskDialog>
                </CardAction >
            </CardHeader >
            <CardContent>
                <TaskTable tasks={dataTable} />
            </CardContent>
            {/* <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter> */}
        </Card >
    )
}
