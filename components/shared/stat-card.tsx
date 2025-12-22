import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    subValue?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    icon?: LucideIcon;
    className?: string;
    valueColor?: string;
}

export function StatCard({ label, value, subValue, trend, trendValue, icon: Icon, className, valueColor }: StatCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="flex flex-col gap-1">
                    <div className={cn("text-2xl font-bold", valueColor)}>{value}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        {trend === 'down' && <span className="text-red-500 mr-1">▼</span>}
                        {trend === 'up' && <span className="text-green-500 mr-1">▲</span>}
                        {trendValue && <span className={cn("font-medium mr-1", trend === 'down' ? 'text-red-500' : trend === 'up' ? 'text-green-500' : '')}>{trendValue}</span>}
                        {subValue}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
