"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BookOpen, MessageSquare, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "User Management", href: "/admin/users", icon: Users, key: "users" },
    { name: "Course Management", href: "/admin/courses", icon: BookOpen, key: "courses" },
    { name: "Manage Feedback", href: "/admin/feedback", icon: MessageSquare, key: "feedback" },
    { name: "Profile", href: "/admin/profile", icon: User, key: "profile" },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
      {/* Logo */}
      <div className="mb-10">
        <Link href="/admin/dashboard" className="text-3xl font-bold text-uncommonBlue-DEFAULT">
          uncommon
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Navigation</h3>
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              "flex items-center p-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors",
              pathname === link.href ? "bg-gray-100 text-gray-900" : "text-gray-700",
            )}
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Logout Link */}
      <div className="mt-auto">
        <Link
          href="/logout"
          className="flex items-center p-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Link>
      </div>
    </aside>
  )
}
