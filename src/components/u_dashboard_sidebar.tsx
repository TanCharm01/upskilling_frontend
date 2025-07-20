import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, GraduationCap, User, LogOut, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  activeLink: "dashboard" | "courses" | "profile" | "logout"
}

export default function DashboardSidebar({ activeLink }: DashboardSidebarProps) {
  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "Courses", href: "/courses", icon: GraduationCap, key: "courses" },
    { name: "Profile", href: "/profile", icon: User, key: "profile" },
    { name: "Logout", href: "/logout", icon: LogOut, key: "logout" },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 bg-dashboardGrey-DEFAULT text-dashboardGrey-text p-6 min-h-screen">
      {/* User Profile */}
      <div className="flex items-center mb-10">
        <Avatar className="h-12 w-12 mr-3">
          <AvatarImage src="/placeholder.svg?height=48&width=48&text=User" alt="User Avatar" />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Tanatswa</h2>
          <p className="text-sm text-gray-600">Think different</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              "flex items-center p-3 rounded-md text-base font-medium hover:bg-dashboardGrey-active transition-colors",
              activeLink === link.key ? "bg-dashboardGrey-active text-gray-900" : "text-dashboardGrey-text",
            )}
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Icon */}
      <div className="mt-auto flex justify-start">
        <Link href="#" className="p-2 rounded-md hover:bg-dashboardGrey-active transition-colors">
          <ExternalLink className="h-5 w-5 text-dashboardGrey-text" />
        </Link>
      </div>
    </aside>
  )
}
