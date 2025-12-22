"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/shared/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Invoice, MockOperationsService } from "@/lib/services/mock-operations"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, FileText, AlertCircle, CheckCircle2 } from "lucide-react"

// Invoice Columns
const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "Invoice ID",
        cell: ({ row }) => <span className="font-medium">{row.getValue("id")}</span>,
    },
    {
        accessorKey: "vendor",
        header: "Vendor",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {(row.getValue("vendor") as string).charAt(0)}
                </div>
                {row.getValue("vendor")}
            </div>
        )
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span className="font-medium">{row.getValue("amount")}</span>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
            if (status === 'Paid') variant = "default" // We'd often use custom green for paid
            if (status === 'Failed') variant = "destructive"
            if (status === 'Pending') variant = "secondary"

            // Custom styling for specific statuses using classes instead of just variant
            let className = ""
            if (status === 'Paid') className = "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
            if (status === 'Processing') className = "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200"

            return (
                <Badge variant={variant} className={className}>{status}</Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <Button variant="ghost" size="sm">View</Button>
            )
        }
    }
]

export default function OperationsPage() {
    const invoices = MockOperationsService.getInvoices()
    const inboxItems = MockOperationsService.getInboxItems()

    return (
        <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
            <PageHeader
                title="Operations"
                subtitle="Manage invoice ingestion, validation, and processing."
                action={
                    <Button>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload New
                    </Button>
                }
            />

            <Tabs defaultValue="inbox" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 max-w-[400px]">
                    <TabsTrigger value="inbox">Inbox <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">{inboxItems.length}</Badge></TabsTrigger>
                    <TabsTrigger value="all">All Invoices</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>

                {/* Inbox Tab */}
                <TabsContent value="inbox">
                    <Card>
                        <CardHeader>
                            <CardTitle>Needs Attention</CardTitle>
                            <CardDescription>Invoices that require review, categorization, or have failed processing.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {inboxItems.length > 0 ? (
                                <DataTable columns={invoiceColumns} data={inboxItems} />
                            ) : (
                                <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed text-sm">
                                    <CheckCircle2 className="mb-2 h-10 w-10 text-green-500" />
                                    You're all caught up! No items in your inbox.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* All Invoices Tab */}
                <TabsContent value="all">
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice History</CardTitle>
                            <CardDescription>
                                A complete record of all processed invoices.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={invoiceColumns} data={invoices} />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Upload Tab */}
                <TabsContent value="upload">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manual Ingestion</CardTitle>
                            <CardDescription>Upload PDF invoices or CSV statements for processing.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="rounded-full bg-white p-4 shadow-sm mb-4">
                                    <UploadCloud className="h-8 w-8 text-indigo-600" />
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="font-semibold text-lg">Click to upload or drag and drop</h3>
                                    <p className="text-sm text-muted-foreground">PDF, JPG, or CSV (max 10MB)</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <h4 className="text-sm font-medium">Recent Uploads</h4>
                                <div className="flex items-center justify-between p-3 border rounded-md bg-white">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-500" />
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium">aws-invoice-oct.pdf</p>
                                            <p className="text-xs text-muted-foreground">Uploaded 2 mins ago</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Processing</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-md bg-white">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-medium">gcp-billing-statement.csv</p>
                                            <p className="text-xs text-muted-foreground">Uploaded 1 hour ago</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">Complete</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}
