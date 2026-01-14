"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { User as UserIcon, LogOut, Settings } from "lucide-react"

interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

interface UserMenuProps {
  landingPageMode?: boolean
}

export function UserMenu({ landingPageMode = false }: UserMenuProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  // Reset auth mode when dialog closes
  useEffect(() => {
    if (!isLoginOpen) {
      setAuthMode("login")
    }
  }, [isLoginOpen])

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/v1/auth/me")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const getInitials = (firstName?: string, lastName?: string, username?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    if (username) {
      return username.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === "login" ? "register" : "login")
  }

  if (isLoading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
    )
  }

  if (!user) {
    return (
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        {landingPageMode ? (
          <DialogTrigger asChild>
            <button className="hover:text-foreground/50 transition-colors uppercase font-body font-bold text-sm md:text-base">LOGIN</button>
          </DialogTrigger>
        ) : (
          <div className="flex gap-2">
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setAuthMode("login")}>Sign In</Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button onClick={() => setAuthMode("register")}>Sign Up</Button>
            </DialogTrigger>
          </div>
        )}
        <DialogContent className="sm:max-w-md border-2 border-foreground/20 bg-background/95 backdrop-blur-xl">
          {authMode === "login" ? (
            <LoginForm onToggleMode={toggleAuthMode} />
          ) : (
            <RegisterForm onToggleMode={toggleAuthMode} />
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>
              {getInitials(user.firstName, user.lastName, user.username)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.username
              }
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
