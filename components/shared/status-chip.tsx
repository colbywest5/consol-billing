import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusType = "paid" | "pending" | "failed" | "scheduled" | "review" | "draft" | "active" | "inactive";

interface StatusChipProps {
    status: StatusType;
    className?: string;
}

const styles: Record<StatusType, string> = {
    paid: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    active: "bg-green-100 text-green-700 hover:bg-green-200 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
    review: "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200",
    failed: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200",
    inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
    draft: "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200",
    scheduled: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
};

const labels: Record<StatusType, string> = {
    paid: "Paid",
    active: "Active",
    pending: "Pending",
    review: "Needs Review",
    failed: "Failed",
    inactive: "Inactive",
    draft: "Draft",
    scheduled: "Scheduled"
};

export function StatusChip({ status, className }: StatusChipProps) {
    return (
        <Badge variant="outline" className={cn("font-medium border", styles[status], className)}>
            {labels[status]}
        </Badge>
    );
}
