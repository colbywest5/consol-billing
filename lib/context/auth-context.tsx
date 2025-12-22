"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    // Mock persistence via localStorage
    useEffect(() => {
        const stored = localStorage.getItem("covenant_user")
        if (stored) {
            setUser(JSON.parse(stored))
        }
    }, [])

    const login = (newUser: User) => {
        setUser(newUser)
        localStorage.setItem("covenant_user", JSON.stringify(newUser))
        router.push("/dashboard")
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("covenant_user")
        router.push("/auth")
    }

    // Basic Route Protection
    useEffect(() => {
        const isAuthRoute = pathname.startsWith("/auth")
        const stored = localStorage.getItem("covenant_user")

        if (!stored && !isAuthRoute) {
            router.push("/auth")
        }
    }, [pathname, router])

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
