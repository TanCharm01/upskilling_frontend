import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course_card"
import CoursesHeader from "@/components/courses_header" // New header for this page
import { Search } from "lucide-react"

export default function CoursesPage() {
  const courses = [
    {
      id: "1",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "2",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "3",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "4",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "5",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "6",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
  ]

  const categories = [
    "All",
    "Most Popular",
    "Career Skills",
    "Money Matters",
    "Communication Skills",
    "Digital Tools",
    "Personal Growth",
    "Interviews",
    "Personal Growth",
    "Money Matters",
  ]

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Header for Courses Page */}
      <CoursesHeader />

      {/* Main Content Area */}
      <main className="w-full max-w-[1400px] bg-white rounded-b-3xl shadow-lg p-8 md:p-16 lg:p-24">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">Courses</h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <Input type="text" placeholder="Search by name..." className="w-full pl-10 pr-4 py-2" />
        </div>

        {/* Filter by Category */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className={`rounded-full px-4 py-2 text-sm ${
                  category === "Most Popular"
                    ? "bg-headerGrey-dark text-white"
                    : "bg-headerGrey-DEFAULT text-headerGrey-text hover:bg-headerGrey-dark hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
            <Button
              variant="outline"
              className="rounded-full px-4 py-2 text-sm bg-headerGrey-DEFAULT text-headerGrey-text hover:bg-headerGrey-dark hover:text-white"
            >
              View more categories
            </Button>
          </div>
        </div>

        {/* Most Popular Courses Section */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Most Popular <span className="font-normal text-gray-500">(18 results)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="px-8 py-3 rounded-md bg-headerGrey-DEFAULT text-headerGrey-text hover:bg-headerGrey-dark hover:text-white"
          >
            Show 6 more
          </Button>
        </div>
      </main>
    </div>
  )
}
