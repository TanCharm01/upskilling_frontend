import Link from "next/link"
import DashboardSidebar from "@/components/u_dashboard_sidebar"
import DashboardHeader from "@/components/u_dashboard_header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

const completedCoursesData = [
  {
    id: "1",
    courseName: "Money Matters",
    score: "99/100",
    dateCompleted: "March 3, 2025",
    category: "career skills",
    certificate: "career skills",
  },
  {
    id: "2",
    courseName: "Building a Growth Mindset",
    score: "74/100",
    dateCompleted: "March 3, 2025",
    category: "financial literacy",
    certificate: "career skills",
  },
  {
    id: "3",
    courseName: "Speak with Impact",
    score: "89/100",
    dateCompleted: "March 3, 2025",
    category: "Technical skills",
    certificate: "career skills",
  },
  {
    id: "4",
    courseName: "Money Matters",
    score: "60/100",
    dateCompleted: "March 3, 2025",
    category: "Speaking",
    certificate: "career skills",
  },
  {
    id: "5",
    courseName: "Building a Growth Mindset",
    score: "66/100",
    dateCompleted: "March 3, 2025",
    category: "Professionalism",
    certificate: "career skills",
  },
  {
    id: "6",
    courseName: "Speak with Impact",
    score: "54/100",
    dateCompleted: "March 3, 2025",
    category: "business etiquette",
    certificate: "career skills",
  },
]

export default function CompletedCoursesPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <DashboardSidebar activeLink="courses" />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <DashboardHeader userName="Tanatswa" currentDate="Friday, February 9, 2022" />

        {/* Completed Courses Content */}
        <main className="flex-grow p-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Completed Courses</h2>
              <Link href="#" className="text-uncommonBlue-DEFAULT hover:underline font-medium">
                View all
              </Link>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Course Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date Completed</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Certificate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedCoursesData.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.courseName}</TableCell>
                    <TableCell>{course.score}</TableCell>
                    <TableCell>{course.dateCompleted}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>
                      <Link href="/certificate" className="text-uncommonBlue-DEFAULT hover:underline">
                        {course.certificate}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between mt-8">
              <Button variant="outline" className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white">
                <ChevronLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <Link href="/courses" passHref>
                <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white">
                  Explore Courses <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
