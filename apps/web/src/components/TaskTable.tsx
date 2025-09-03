import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "./ui/checkbox"
import { MdDeleteSweep } from "react-icons/md"
import { FaSearch } from "react-icons/fa";
import { MdSearch } from "react-icons/md"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { TaskType } from "@/types"
import { UpdateTaskDrawer } from "./UpdateTaskDialog"
import { useMemo, useState } from "react"

type TaskTableProps = {
    tasks?: TaskType[]
    errorMessage?: string
    toggleCompleteTaskFn: (task: TaskType) => void
    updateTaskFn: (task: TaskType) => void
    deleteTaskFn: (task: TaskType) => void
}

export function TaskTable({ tasks, errorMessage, toggleCompleteTaskFn, updateTaskFn, deleteTaskFn }: TaskTableProps) {
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const noTasks = !tasks || tasks.length === 0
    const message = errorMessage || "Não há tasks para exibir!"

    const handleOpenDrawer = (task: TaskType) => {
        setSelectedTask(task)
        setIsDrawerOpen(true)
    }

    const filteredTasks = useMemo(() => {
        if (!tasks) return []
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [tasks, searchTerm])

    return (
        <>
            <Table>
                <TableCaption>A list of your recent tasks.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-full flex justify-between px-2 py-0">
                            <div className="relative w-full">
                                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    placeholder="Procurando uma específica?"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {noTasks || filteredTasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center text-sm text-muted-foreground py-6">
                                {message}
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredTasks
                            .sort((a, b) => (a.completed < b.completed ? -1 : 1))
                            .map((task, idx) => (
                                <TableRow key={task.title + idx}>
                                    <TableCell>
                                        <div className="grid grid-cols-[9fr_1fr] place-items-center gap-2">
                                            <div className="hover:bg-accent/50 flex items-start gap-4 rounded-lg p-3 w-full">
                                                <Checkbox
                                                    onCheckedChange={(checked) => {
                                                        toggleCompleteTaskFn({ ...task, completed: checked === true })
                                                    }}
                                                    id={`toggle-${task.title}`}
                                                    checked={task.completed}
                                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                                />
                                                <div
                                                    className="grid gap-1.5 font-normal cursor-pointer text-left w-full"
                                                    onClick={() => handleOpenDrawer(task)}
                                                >
                                                    <p
                                                        data-state-checked={task.completed}
                                                        className="text-sm leading-none font-medium data-[state-checked=true]:line-through"
                                                    >
                                                        {task.title}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex justify-end pr-3">
                                                <Button title="Excluir tarefa" variant="destructive" className="cursor-pointer" onClick={() => deleteTaskFn(task)}>
                                                    <MdDeleteSweep size={20} />
                                                </Button>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                    )}
                </TableBody>
            </Table>

            <UpdateTaskDrawer
                task={selectedTask}
                isOpen={isDrawerOpen}
                updateTaskFn={updateTaskFn}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    )
}