'use client'
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
import { useEffect, useState } from 'react';
import { decodeJWT } from '@/lib/utils';

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
  avatar?: string;
  type: string;
  time: string;
  role?: string;
};

// Custom component for Recent Activity Items
function RecentActivityItem({ name, avatar, type, time, role }: RecentActivityItemProps) {
  const typeColor = type === "signup" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"
  // Format time as "time ago"
  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <Avatar className="h-9 w-9">
          {avatar ? (
            <img src={avatar} alt={name} className="h-9 w-9 rounded-full object-cover" />
          ) : (
            <AvatarFallback>
              {name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <div className="font-medium">
            {name}
            {role && (
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${role === 'admin' || role === 'super_admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                {role === 'super_admin' ? 'Super Admin' : role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Badge className={`${typeColor} px-2 py-0.5 rounded-full text-xs font-normal`}>{type}</Badge>
            <span>{getTimeAgo(time)}</span>
          </div>
        </div>
      </div>
      <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
    </div>
  )
}

export default function Dashboard() {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [visibleActivities, setVisibleActivities] = useState<number>(5);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const adminInfo = decodeJWT(token);
    if (!adminInfo?.id) {
      setError('Missing admin information.');
      setLoading(false);
      return;
    }
    Promise.all([
      fetch(`http://localhost:3001/admins/profile/${adminInfo.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch admin profile.');
          return res.json();
        }),
      fetch('http://localhost:3001/admins/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch dashboard stats.');
          return res.json();
        }),
      fetch('http://localhost:3001/activity-logs/recent', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch activity logs.');
          return res.json();
        })
    ])
      .then(([adminData, statsData, activityData]) => {
        setAdmin(adminData);
        setStats(statsData);
        setActivityLogs(activityData);
      })
      .catch(() => setError('Failed to fetch admin profile, stats, or activity logs.'))
      .finally(() => setLoading(false));
  }, []);

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
            <div className="flex items-center space-x-4">
              {admin?.avatar ? (
                <Avatar className="h-14 w-14">
                  <img src={admin.avatar} alt={admin.firstname || 'Admin'} className="h-14 w-14 rounded-full object-cover" />
                </Avatar>
              ) : (
                <Avatar className="h-14 w-14">
                  <AvatarFallback>{admin?.firstname?.[0] || '?'}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <h1 className="text-3xl font-bold mb-1">{admin ? `Welcome back, ${admin.firstname} ${admin.lastname}` : 'Welcome back'}</h1>
                <p className="text-sm text-muted-foreground">
                  {admin?.role}
                  {admin?.role && admin?.lastLogin && <span className="mx-2">&bull;</span>}
                  {admin?.lastLogin && `Last Login: ${new Date(admin.lastLogin).toLocaleString()}`}
                </p>
              </div>
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
          {loading && <div className="text-gray-500">Loading admin profile...</div>}
          {error && <div className="text-red-500">{error}</div>}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat: any, idx: number) => {
            let icon = Users;
            if (stat.title.toLowerCase().includes('signup')) icon = Plus;
            else if (stat.title.toLowerCase().includes('certificate')) icon = FileText;
            else if (stat.title.toLowerCase().includes('course') && stat.title.toLowerCase().includes('completion')) icon = TrendingUp;
            else if (stat.title.toLowerCase().includes('course')) icon = GraduationCap;
            else if (stat.title.toLowerCase().includes('enroll')) icon = CheckCircle;
            return (
              <DashboardCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={icon}
              />
            );
          })}
        </section>

        <section>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Latest platform activities and user interactions</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {activityLogs.slice(0, visibleActivities).map((log: any, idx: number) => (
                <div key={idx}>
                  <RecentActivityItem name={log.name} avatar={log.avatar} type={log.type} time={log.time} role={log.role} />
                  {idx < Math.min(visibleActivities, activityLogs.length) - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
            {activityLogs.length > visibleActivities && (
              <div className="p-6 pt-0 flex justify-center">
                <Button variant="outline" className="w-full max-w-xs bg-transparent" onClick={() => setVisibleActivities(v => v + 5)}>
                  View more
                </Button>
              </div>
            )}
            {visibleActivities > 5 && (
              <div className="p-6 pt-0 flex justify-center">
                <Button variant="outline" className="w-full max-w-xs bg-transparent" onClick={() => setVisibleActivities(v => Math.max(5, v - 5))}>
                  View less
                </Button>
              </div>
            )}
          </Card>
        </section>
      </main>
    </div>
  )
}