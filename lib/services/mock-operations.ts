export interface Invoice {
    id: string;
    vendor: string;
    amount: string;
    date: string;
    status: "Paid" | "Pending" | "Processing" | "Failed" | "Draft";
    dueDate: string;
    items: number;
}

export const MockOperationsService = {
    getInvoices: (): Invoice[] => [
        { id: "INV-001", vendor: "AWS", amount: "$4,500.00", date: "Oct 01, 2023", status: "Paid", dueDate: "Oct 31, 2023", items: 12 },
        { id: "INV-002", vendor: "Google Cloud", amount: "$1,200.50", date: "Oct 03, 2023", status: "Pending", dueDate: "Nov 03, 2023", items: 4 },
        { id: "INV-003", vendor: "Slack", amount: "$850.00", date: "Oct 05, 2023", status: "Processing", dueDate: "Nov 05, 2023", items: 1 },
        { id: "INV-004", vendor: "Vercel", amount: "$200.00", date: "Oct 10, 2023", status: "Paid", dueDate: "Nov 10, 2023", items: 2 },
        { id: "INV-005", vendor: "Salesforce", amount: "$15,000.00", date: "Oct 12, 2023", status: "Pending", dueDate: "Nov 12, 2023", items: 1 },
        { id: "INV-006", vendor: "Datadog", amount: "$3,200.00", date: "Oct 15, 2023", status: "Failed", dueDate: "Nov 15, 2023", items: 8 },
        { id: "INV-007", vendor: "Snowflake", amount: "$8,900.00", date: "Oct 18, 2023", status: "Draft", dueDate: "-", items: 0 },
    ],

    getInboxItems: (): Invoice[] => [
        { id: "INV-002", vendor: "Google Cloud", amount: "$1,200.50", date: "Oct 03, 2023", status: "Pending", dueDate: "Nov 03, 2023", items: 4 },
        { id: "INV-005", vendor: "Salesforce", amount: "$15,000.00", date: "Oct 12, 2023", status: "Pending", dueDate: "Nov 12, 2023", items: 1 },
        { id: "INV-006", vendor: "Datadog", amount: "$3,200.00", date: "Oct 15, 2023", status: "Failed", dueDate: "Nov 15, 2023", items: 8 },
    ]
};
