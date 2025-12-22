export interface KPI {
    label: string;
    value: string;
    subValue: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
}

export interface ChartData {
    date: string;
    spend: number;
}

export interface ActivityItem {
    id: string;
    message: string;
    time: string;
    type: "invoice" | "payment" | "system";
    link?: string;
}

export const DashboardService = {
    getKPIs: (): KPI[] => [
        { label: "Pending Approval", value: "7", subValue: "$12,450.00", valueColor: "text-indigo-600" },
        { label: "Settled (MTD)", value: "42", subValue: "$128,930.00" },
        { label: "Exceptions", value: "3", subValue: "2 Disputes, 1 Fail", trend: "down", valueColor: "text-red-600" },
        { label: "Next Run", value: "Jan 24", subValue: "$45k Scheduled", valueColor: "text-blue-600" },
    ],

    getSpendData: (): ChartData[] => [
        { date: "Mon", spend: 12000 },
        { date: "Tue", spend: 13200 },
        { date: "Wed", spend: 10100 },
        { date: "Thu", spend: 15400 },
        { date: "Fri", spend: 9800 },
        { date: "Sat", spend: 22100 },
        { date: "Sun", spend: 19800 },
    ],

    getFeed: (): ActivityItem[] => [
        { id: "1", message: "Invoice #1024 from AWS processed", time: "2m ago", type: "invoice" },
        { id: "2", message: "Variance Warning: Datadog (+18%)", time: "15m ago", type: "system" },
        { id: "3", message: "Payment Batch #99 failed (1 Item)", time: "1h ago", type: "payment" },
        { id: "4", message: "New Invoice: Zoom Video", time: "2h ago", type: "invoice" },
        { id: "5", message: "Dispute Resolved: Slack Tech", time: "4h ago", type: "system" },
    ]
};
