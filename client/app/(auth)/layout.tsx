"use client"

import { useCurrentUser } from "@/hooks/user"
import { redirect } from "next/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: user, isLoading: fetchingUser } = useCurrentUser()

  if (fetchingUser) return null

  if (user) redirect("/dashboard")

  return <div className="min-h-screen">{children}</div>
}
