"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { motion } from "framer-motion"

export default function AuthPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

            {/* Left Side - Visual / Branding */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-indigo-900" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 opacity-90" />

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Covenant Billing
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;The financial intelligence platform has completely transformed how we audit and consolidate our vendor spend. It's security and clarity in one place.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis, CFO</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="lg:p-8 bg-gray-50/50 h-full flex items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-semibold tracking-tight">Welcome Back</CardTitle>
                                <CardDescription>Enter your credentials to access the platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="login" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 mb-4">
                                        <TabsTrigger value="login">Login</TabsTrigger>
                                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="login">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <LoginForm />
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent value="signup">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <SignupForm />
                                        </motion.div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <a href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
                        and{" "}
                        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    )
}
