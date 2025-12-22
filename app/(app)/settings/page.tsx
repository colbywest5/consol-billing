"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/shared/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { User, MockSettingsService } from "@/lib/services/mock-settings"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch" // Requires switch component install, checking if missing
import { Checkbox } from "@/components/ui/checkbox" // Requires checkbox install

// User Table Columns
const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <div className={`flex items-center gap-2 ${status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`h-2 w-2 rounded-full ${status === 'Active' ? 'bg-green-600' : 'bg-gray-400'}`} />
                    {status}
                </div>
            )
        }
    },
    {
        accessorKey: "lastActive",
        header: "Last Active",
    },
]

export default function SettingsPage() {
    const organization = MockSettingsService.getOrganization()
    const users = MockSettingsService.getUsers()
    const integrations = MockSettingsService.getIntegrations()

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            <PageHeader title="Settings" subtitle="Manage your organization, users, and integrations." />

            <Tabs defaultValue="organization" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="organization">Organization</TabsTrigger>
                    <TabsTrigger value="users">Users & Roles</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                {/* Organization Tab */}
                <TabsContent value="organization">
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Details</CardTitle>
                            <CardDescription>
                                Update your company information and billing details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Company Name</Label>
                                <Input defaultValue={organization.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Primary Domain</Label>
                                <Input defaultValue={organization.domain} disabled />
                                <p className="text-xs text-muted-foreground">Contact support to change your primary domain.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Tax ID / EIN</Label>
                                    <Input defaultValue={organization.taxId} />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Billing Address</Label>
                                    <Input defaultValue={organization.address} />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>Manage access and roles for your team.</CardDescription>
                            </div>
                            <Button>Invite User</Button>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={userColumns} data={users} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Invoice Approvals</Label>
                                    <p className="text-sm text-muted-foreground">Receive emails when an invoice needs approval.</p>
                                </div>
                                {/* Add Switch when installed */}
                                <div className="h-6 w-11 bg-indigo-600 rounded-full cursor-pointer relative"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div></div>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Payment Failure Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Get instant notifications if a payment fails.</p>
                                </div>
                                <div className="h-6 w-11 bg-indigo-600 rounded-full cursor-pointer relative"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full"></div></div>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Weekly Summary</Label>
                                    <p className="text-sm text-muted-foreground">A weekly digest of your spend and activity.</p>
                                </div>
                                <div className="h-6 w-11 bg-gray-200 rounded-full cursor-pointer relative"><div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full"></div></div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations">
                    <div className="grid gap-4 md:grid-cols-2">
                        {integrations.map((integration) => (
                            <Card key={integration.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-base font-semibold">{integration.name}</CardTitle>
                                    <Badge variant={integration.connected ? "default" : "secondary"}>
                                        {integration.connected ? "Connected" : "Disconnected"}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-muted-foreground mb-4">
                                        Type: {integration.type} <br />
                                        Last Sync: {integration.lastSync}
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        {integration.connected ? "Manage Settings" : "Connect"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    )
}
