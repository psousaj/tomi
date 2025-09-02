"use client"

import { ColumnDef } from "@tanstack/react-table"
import { taskSchema, z } from '@tomi/validation'
import { Checkbox } from "../ui/checkbox"

export const columns: ColumnDef<z.infer<typeof taskSchema>>[] = [
    {
        accessorKey: "completed",
        header: "Conluída",
        cell: ({ row }) => {
            const completed = row.getValue<boolean>("completed")
            return <Checkbox checked={completed} />
        }
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]