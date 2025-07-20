import Link from "next/link"
import DashboardSidebar from "@/components/u_dashboard_sidebar"
import DashboardHeader from "@/components/u_dashboard_header"
import CourseCard from "@/components/course_card"
import DashboardStatCard from "@/components/u_dashboard_stat_card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const myCourses = [
    { id: "1", title: "Speak with Impact", progress: 20, imageSrc: "/placeholder.svg?height=180&width=320" },
    { id: "2", title: "Speak with Impact", progress: 20, imageSrc: "/placeholder.svg?height=180&width=320" },
    { id: "3", title: "Speak with Impact", progress: 20, imageSrc: "/placeholder.svg?height=180&width=320" },
  ]

  const recommendedCourses = [
    { id: "4", title: "Speak with Impact", progress: 20, imageSrc: "/placeholder.svg?height=180&width=320" },
    { id: "5", title: "Speak with Impact", progress: 20, imageSrc: "/placeholder.svg?height=180&width=320" },
    { id: "6", title: "Speak with Impact", progress: 20, imageSrc: "/placeholder.svg?height=180&width=320" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <DashboardSidebar activeLink="dashboard" />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <DashboardHeader userName="Tanatswa" currentDate="Monday, June 30, 2025" />

        {/* Dashboard Content */}
        <main className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left 3/4 Content Area */}
          <div className="lg:col-span-3 flex flex-col space-y-8">
            {/* My Courses Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <Link href="/courses" className="text-uncommonBlue-DEFAULT hover:underline font-medium">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </section>

            {/* Recommended for you Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </section>
          </div>

          {/* Right 1/4 Stats Column */}
          <aside className="lg:col-span-1 flex flex-col space-y-6">
            <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-6 py-3 rounded-md text-lg">
              Explore Courses &gt;
            </Button>
            <DashboardStatCard type="courses" value={20} label="Total Courses" />
            <DashboardStatCard type="hours" value={180} label="Total Hours" />
            <DashboardStatCard type="certificates" value={10} label="Certificates" />
          </aside>
        </main>
      </div>
    </div>
  )
}
