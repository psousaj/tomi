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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DataTable } from "./TaskDataTable/data-table"
import { columns } from "./TaskDataTable/columns"

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
        <Card className="w-full max-w-sm">
            <CardHeader >
                <CardTitle>Login to your account</CardTitle>
                {/* <CardDescription>
                    Enter your email below to login to your account
                </CardDescription> */}
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={dataTable} />
            </CardContent>
            {/* <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter> */}
        </Card>
    )
}
