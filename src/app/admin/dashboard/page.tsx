import Link from "next/link"
import AdminSidebar from "@/components/admin_sidebar"
import AdminStatCard from "@/components/admin_stat_card"
import AdminActivityItem from "@/components/admin_activity_item"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Award, BookOpen, GraduationCap, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: 600, percentageChange: "+12%", icon: Users },
    { title: "New Signups", value: 200, percentageChange: "+12%", icon: UserPlus },
    { title: "Certificates Issued", value: 150, percentageChange: "+12%", icon: Award },
    { title: "Total Courses", value: 31, percentageChange: "+12%", icon: BookOpen },
    { title: "Courses Enrolled", value: 27, percentageChange: "+12%", icon: GraduationCap },
    { title: "Average course completion rate", value: "70%", percentageChange: "+12%", icon: TrendingUp },
  ]

  const recentActivities = [
    {
      userName: "Daisy Tsenesa",
      activityType: "Signup",
      timeAgo: "2 minutes ago",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=DT",
    },
    {
      userName: "Daisy Tsenesa",
      activityType: "Completion",
      timeAgo: "2 minutes ago",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=DT",
    },
    {
      userName: "Daisy Tsenesa",
      activityType: "Signup",
      timeAgo: "2 minutes ago",
      avatarSrc: "/placeholder.svg?height=40&width=40&text=DT",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Daisy</h1>
            <p className="text-sm text-gray-600">Super Administrator Last Login: Today at 10:30 AM</p>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-4 py-2 rounded-md flex items-center">
              <UserPlus className="h-5 w-5 mr-2" /> Add New User
            </Button>
            <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-4 py-2 rounded-md flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Add New Course
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-grow p-6 space-y-8">
          {/* Statistics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <AdminStatCard key={index} {...stat} />
            ))}
          </section>

          {/* Recent Activity Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-600">Latest platform activities and User Interactions</p>
              </div>
              <Link href="#" className="text-uncommonBlue-DEFAULT hover:underline font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-2">
              {recentActivities.map((activity, index) => (
                <AdminActivityItem key={index} {...activity} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
