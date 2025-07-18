"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Award, LayoutDashboard, GraduationCap, User, LogOut, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Daisy",
  tagline: "Think different",
  avatar: "/placeholder.svg?height=60&width=60",
  stats: {
    totalCourses: 20,
    totalHours: 180,
    badges: 5,
    certificates: 10,
  },
}

// Mock badges data
const earnedBadges = [
  {
    id: 1,
    name: "Growth Mindset Champion",
    icon: "🧠",
    earnedDate: "June 15, 2025",
    description: "Completed Building A Growth Mindset course",
  },
  {
    id: 2,
    name: "Communication Expert",
    icon: "🗣️",
    earnedDate: "June 10, 2025",
    description: "Mastered speaking and presentation skills",
  },
  {
    id: 3,
    name: "Network Builder",
    icon: "🤝",
    earnedDate: "June 10, 2025",
    description: "Completed Networking Fundamentals",
  },
  {
    id: 4,
    name: "Budget Master",
    icon: "💰",
    earnedDate: "May 28, 2025",
    description: "Completed Budget Like a Boss course",
  },
  {
    id: 5,
    name: "Early Achiever",
    icon: "⭐",
    earnedDate: "May 20, 2025",
    description: "Completed first course ahead of schedule",
  },
]

// Mock courses data
const myCourses = [
  {
    id: "1",
    title: "Speak with Impact",
    progress: 20,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "2",
    title: "Speak with Impact",
    progress: 20,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "3",
    title: "Speak with Impact",
    progress: 20,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

const recommendedCourses = [
  {
    id: "4",
    title: "Speak with Impact",
    progress: 20,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "5",
    title: "Speak with Impact",
    progress: 20,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "6",
    title: "Speak with Impact",
    progress: 20,
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

const completedCourses = [
  {
    id: "7",
    title: "Building A Growth Mindset",
    progress: 100,
    completedDate: "June 15, 2025",
    thumbnail: "/placeholder.svg?height=120&width=200",
    certificate: true,
  },
  {
    id: "8",
    title: "Networking Fundamentals",
    progress: 100,
    completedDate: "June 10, 2025",
    thumbnail: "/placeholder.svg?height=120&width=200",
    certificate: true,
  },
  {
    id: "9",
    title: "Budget Like a Boss",
    progress: 100,
    completedDate: "May 28, 2025",
    thumbnail: "/placeholder.svg?height=120&width=200",
    certificate: false,
  },
]

export default function StudentDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-50 flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 bg-gray-100">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg font-semibold">{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.tagline}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveNav("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeNav === "dashboard" ? "bg-white text-gray-900 shadow-sm" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </button>

            <Link href="/courses">
              <button
                onClick={() => setActiveNav("courses")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeNav === "courses" ? "bg-white text-gray-900 shadow-sm" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <GraduationCap className="h-5 w-5" />
                <span className="font-medium">Courses</span>
              </button>
            </Link>

            <button
              onClick={() => setActiveNav("profile")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeNav === "profile" ? "bg-white text-gray-900 shadow-sm" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </button>

            <button
              onClick={() => setActiveNav("logout")}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Hello, <span className="font-bold">{userData.name}</span>, welcome back!
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search" className="pl-10 w-64" />
              </div>
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Monday</span>, {currentDate.split(", ")[1]}
            </div>
          </div>

          {/* My Courses Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-gray-900">View All</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden shadow-md">
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{course.title}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Link href={`/courses/${course.id}/learn/1`}>
                      <Button className="w-full bg-[#0747A1] hover:bg-[#05316e]">Resume</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Completed Courses Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Completed Courses</h2>
              <button className="text-gray-600 hover:text-gray-900">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden border-green-200 bg-green-50 shadow-md">
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Completed on {course.completedDate}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/courses/${course.id}/learn/1`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Review
                        </Button>
                      </Link>
                      {course.certificate && (
                        <Button className="bg-green-600 hover:bg-green-700 flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden shadow-md">
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{course.title}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Link href={`/courses/${course.id}/enroll`}>
                      <Button className="w-full bg-[#0747A1] hover:bg-[#05316e]">Enroll</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Stats */}
        <div className="w-80 p-8 space-y-6">
          <Link href="/courses">
            <Button className="w-full mb-4 bg-[#0747A1] hover:bg-[#05316e]">Explore Courses &gt;</Button>
          </Link>
          {/* Total Courses */}
          <Card className="text-center p-6 shadow-md">
            <CardContent className="p-0">
              <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-900 mb-2">{userData.stats.totalCourses}</div>
              <div className="text-lg font-semibold text-gray-700">Total Courses</div>
            </CardContent>
          </Card>

          {/* Total Hours */}
          <Card className="text-center p-6 bg-gray-400 shadow-md">
            <CardContent className="p-0">
            
              <div className="text-4xl font-bold text-gray-900 mb-2">{userData.stats.totalHours}</div>
              <div className="text-lg font-semibold text-gray-700">Total Hours</div>
            </CardContent>
          </Card>

          {/* Badges Earned */}
          <Card className="p-6 shadow-md">
            <CardContent className="p-0">
              <div className="text-center mb-4">
                <div className="flex justify-center items-center mb-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{userData.stats.badges}</div>
                <div className="text-lg font-semibold text-gray-700">Badges Earned</div>
              </div>

              {/* Recent Badges */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Recent Badges</h4>
                {earnedBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.earnedDate}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full text-xs text-purple-600 hover:text-purple-800 font-medium mt-2">
                  View All Badges
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="text-center p-6 shadow-md">
            <CardContent className="p-0">
              <div className="relative mx-auto mb-4 w-12 h-12">
                <Award className="h-12 w-12 text-yellow-500" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{userData.stats.certificates}</div>
              <div className="text-lg font-semibold text-gray-700">Certificates</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
