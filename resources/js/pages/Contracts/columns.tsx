import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Link } from "@inertiajs/react"

export const columns = [
    {
        accessorKey: "contract_number",
        header: "Contract #",
    },
    {
        accessorKey: "buyer_name",
        header: "Buyer",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="outline">
                {row.getValue("status")}
            </Badge>
        ),
    },
    {
        accessorKey: "updated_at",
        header: "Last Updated",
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => {
            const contract = row.original

            return (
                <Link
                    href={`/contracts/${contract.id}`}
                    className="text-blue-600 underline"
                >
                    View
                </Link>
            )
        },
    },
]
