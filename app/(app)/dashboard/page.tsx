"use client"

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { DashboardService } from "@/lib/data/mock-dashboard";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
    const kpis = DashboardService.getKPIs();
    const spendData = DashboardService.getSpendData();
    const feed = DashboardService.getFeed();

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
            <PageHeader title="Financial Intelligence" subtitle="Real-time oversight of your organization’s consolidated spend.">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Export Report
                </Button>
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <Play className="h-4 w-4" /> Simulate Run
                </Button>
            </PageHeader>

            {/* KPI Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi) => (
                    <StatCard
                        key={kpi.label}
                        label={kpi.label}
                        value={kpi.value}
                        subValue={kpi.subValue}
                        trend={kpi.trend}
                        valueColor={kpi.valueColor}
                    />
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                {/* Spend Velocity Chart */}
                <Card className="col-span-4 lg:col-span-5">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Spend Velocity</CardTitle>
                                <CardDescription>Daily spend volume over the last 7 days</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">$128,930</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+12.5%</Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={spendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`$${value}`, 'Spend']}
                                    />
                                    <Area type="monotone" dataKey="spend" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorSpend)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="col-span-3 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Live Feed</CardTitle>
                        <CardDescription>Recent system events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {feed.map((item) => (
                                <div key={item.id} className="flex gap-3 items-start p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                                    <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${item.type === 'invoice' ? 'bg-blue-500' :
                                            item.type === 'payment' ? 'bg-purple-500' : 'bg-amber-500'
                                        }`} />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium leading-none text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {item.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t text-center">
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View Full History</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Flow Analysis Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle>Flow Analysis</CardTitle>
                        <CardDescription>Visualizing flow from Ingestion Source</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full bg-gray-50 rounded-lg flex items-center justify-center border border-dashed">
                            <p className="text-sm text-muted-foreground">Sankey Diagram Placeholder</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Vendors */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Vendors</CardTitle>
                        <CardDescription>Highest spend this period</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">V{i}</div>
                                        <div>
                                            <p className="text-sm font-medium">Vendor {i} Inc.</p>
                                            <p className="text-xs text-muted-foreground">Software • Monthly</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold">$12,400.00</p>
                                        <p className="text-xs text-muted-foreground">Paid via ACH</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto pb-8">
                <p>Amounts are sourced directly from vendor invoices. The platform does not modify vendor charges.</p>
                <p className="mt-1">Highlighted bills reflect changes issued by vendors since the previous cycle.</p>
            </div>
        </div>
    );
}
