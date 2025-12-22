"use client"

import * as React from "react"
import {
    PieChart,
    Settings2,
    FileText,
    ChevronRight,
    UploadCloud,
    Inbox,
    LayoutDashboard,
    Users,
    Building,
    CreditCard,
    Target,
    ChevronDown,
    LogOut,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/context/auth-context"
import { usePathname } from "next/navigation"

// Menu Structure
const data = {
    navMain: [
        {
            title: "Analytics",
            url: "/dashboard",
            icon: PieChart,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                },
                {
                    title: "Activity Feed",
                    url: "/dashboard#activity",
                },
                {
                    title: "Reports",
                    url: "/dashboard#reports",
                },
            ],
        },
        {
            title: "Operations",
            url: "/operations",
            icon: FileText,
            items: [
                {
                    title: "Inbox",
                    url: "/operations",
                },
                {
                    title: "Invoices",
                    url: "/operations", // In a real app these might be distinct routes
                },
                {
                    title: "Ingestion",
                    url: "/operations",
                }
            ],
        },
        {
            title: "Organization",
            url: "/settings",
            icon: Building,
            items: [
                {
                    title: "General",
                    url: "/settings",
                },
                {
                    title: "Team & Roles",
                    url: "/settings",
                },
                {
                    title: "Integrations",
                    url: "/settings",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logout } = useAuth()
    const [activeCompany, setActiveCompany] = React.useState("Covenant")
    const [activeLocation, setActiveLocation] = React.useState("Austin HQ")
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-sidebar-primary-foreground">
                                        <span className="font-bold text-white">C</span>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{activeCompany}</span>
                                        <span className="truncate text-xs">{activeLocation}</span>
                                    </div>
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                                <DropdownMenuItem onClick={() => setActiveCompany("Covenant")}>
                                    <span>Covenant Inc.</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setActiveCompany("Acme Corp")}>
                                    <span>Acme Corp</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={item.isActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src="" alt={user?.name} />
                                        <AvatarFallback className="rounded-lg bg-indigo-100 text-indigo-700">
                                            {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'CW'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.name || 'Guest'}</span>
                                        <span className="truncate text-xs">{user?.role || 'Viewer'}</span>
                                    </div>
                                    <ChevronDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
