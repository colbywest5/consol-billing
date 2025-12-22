export interface User {
    id: string;
    name: string;
    email: string;
    role: "Owner" | "Tenant Admin" | "Billing Admin" | "Viewer";
    status: "Active" | "Inactive";
    lastActive: string;
}

export const MockSettingsService = {
    getOrganization: () => ({
        name: "Covenant Inc.",
        domain: "covenant.com",
        address: "123 Tech Blvd, Austin, TX 78701",
        taxId: "US-99-9999999"
    }),

    getUsers: (): User[] => [
        { id: "1", name: "Colby West", email: "colby@covenant.com", role: "Tenant Admin", status: "Active", lastActive: "Just now" },
        { id: "2", name: "Sofia Davis", email: "sofia@covenant.com", role: "Billing Admin", status: "Active", lastActive: "2 hours ago" },
        { id: "3", name: "John Doe", email: "john@covenant.com", role: "Viewer", status: "Active", lastActive: "1 day ago" },
        { id: "4", name: "Jane Smith", email: "jane@covenant.com", role: "Billing Admin", status: "Inactive", lastActive: "2 weeks ago" },
    ],

    getIntegrations: () => [
        { id: "1", name: "QuickBooks Online", type: "Accounting", connected: true, lastSync: "10 mins ago" },
        { id: "2", name: "Slack", type: "Notification", connected: true, lastSync: "Live" },
        { id: "3", name: "NetSuite", type: "ERP", connected: false, lastSync: "-" },
    ]
};
