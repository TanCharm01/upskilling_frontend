import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  Users,
  GraduationCap,
  MessageCircle,
  User,
  Plus,
  FileText,
  CheckCircle,
  TrendingUp,
  Eye,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import AdminSidebar from '@/components/AdminSidebar'

type DashboardCardProps = {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
};

// Custom component for Dashboard Cards
function DashboardCard({ title, value, change, icon: Icon }: DashboardCardProps) {
  let badgeColor = "bg-gray-200 text-gray-700";
  if (change.includes("-")) badgeColor = "bg-red-100 text-red-600";
  else if (change.includes("+")) badgeColor = "bg-green-100 text-green-600";
  return (
    <Card className="flex-1 min-w-[280px] border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${badgeColor}`}>{change}</span>
      </CardContent>
    </Card>
  )
}

type RecentActivityItemProps = {
  name: string;
  type: string;
  time: string;
};

// Custom component for Recent Activity Items
function RecentActivityItem({ name, type, time }: RecentActivityItemProps) {
  const typeColor = type === "signup" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            {name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Badge className={`{typeColor} px-2 py-0.5 rounded-full text-xs font-normal`}>{type}</Badge>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Admin dashboard</h2>
        </header>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, Daisy</h1>
              <p className="text-sm text-muted-foreground">Super Administrator Last Login: Today at 10:30 AM</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-[#0747A1] hover:bg-[#05316e] text-white flex items-center justify-center">
                <User className="h-4 w-4 mr-2" />
                Add New User
              </Button>
              <Button className="bg-[#0747A1] hover:bg-[#05316e] text-white flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Users"
            value="600"
            change="+12% from last months"
            icon={Users}
          />
          <DashboardCard
            title="New signups"
            value="200"
            change="+12% from last months"
            icon={Plus}
          />
          <DashboardCard
            title="Certificates issued"
            value="150"
            change="No change from last months"
            icon={FileText}
          />
          <DashboardCard
            title="Total Courses"
            value="31"
            change="-7% from last months"
            icon={GraduationCap}
          />
          <DashboardCard
            title="Courses enrolled"
            value="27"
            change="+12% from last months"
            icon={CheckCircle}
          />
          <DashboardCard
            title="Average course completion rate"
            value="70%"
            change="+12% from last months"
            icon={TrendingUp}
          />
        </section>

        <section>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Latest platform activities and user interactions</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <RecentActivityItem name="Daisy Tsenesa" type="signup" time="2 minutes ago" />
              <Separator />
              <RecentActivityItem name="Daisy Tsenesa" type="completion" time="2 minutes ago" />
              <Separator />
              <RecentActivityItem name="Daisy Tsenesa" type="signup" time="2 minutes ago" />
            </CardContent>
            <div className="p-6 pt-0 flex justify-center">
              <Button variant="outline" className="w-full max-w-xs bg-transparent">
                View All
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
