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
import { taskSchema, z } from '@tomi/validation'
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { MdDeleteSweep } from "react-icons/md";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type TaskType = z.infer<typeof taskSchema>

export function TaskTable({ tasks }: { tasks: TaskType[] }) {
    return (
        <Table>
            <TableCaption>A list of your recent tasks.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-full flex justify-between px-2">
                        <Input placeholder="Search tasks..." />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.sort((a, b) => a.completed < b.completed ? -1 : 1).map((task) => (
                    <TableRow key={task.title}>
                        <TableCell className="">
                            <div className="grid grid-cols-[9fr_1fr] place-items-center gap-2">
                                <div className="hover:bg-accent/50 flex items-start gap-4 rounded-lg p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950 w-full">
                                    <Checkbox
                                        id="toggle"
                                        checked={task.completed}
                                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    />
                                    <Label htmlFor="toggle" className="grid gap-1.5 font-normal">
                                        <p data-state-checked={task.completed} className="text-sm leading-none font-medium data-[state-checked=true]:line-through">
                                            {task.title}
                                        </p>
                                    </Label>
                                </div>

                                <div className="flex justify-end pr-3">
                                    <Button variant="destructive">
                                        <MdDeleteSweep size={20} />
                                    </Button>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
