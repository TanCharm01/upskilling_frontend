import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Users, GraduationCap, MessageCircle, User, LogOut } from "lucide-react"

const AdminSidebar = () => (
  <aside className="w-64 bg-[#0747A1] text-white p-6 flex flex-col min-h-screen">
    <div className="mb-8">
      <h1 className="text-3xl font-bold">uncommon</h1>
    </div>
    <nav className="flex-1 space-y-2">
      <div className="text-sm font-semibold text-gray-300 mb-2">Navigation</div>
      <Link href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-600 text-white font-medium">
        <Home className="h-5 w-5" />
        <span>Dashboard</span>
      </Link>
      <Link href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors">
        <Users className="h-5 w-5" />
        <span>User Management</span>
      </Link>
      <Link href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors">
        <GraduationCap className="h-5 w-5" />
        <span>Course Management</span>
      </Link>
      <Link href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors">
        <MessageCircle className="h-5 w-5" />
        <span>Manage Feedback</span>
      </Link>
      <Link href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition-colors">
        <User className="h-5 w-5" />
        <span>Profile</span>
      </Link>
    </nav>
    <div className="mt-auto">
      <Button variant="outline" className="w-full justify-start text-white hover:bg-blue-600">
        <LogOut className="h-5 w-5 mr-3" />
        <span>Logout</span>
      </Button>
    </div>
  </aside>
)

export default AdminSidebar 