"use client"

// import { AppSidebar } from "@/components/app-sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit } from "lucide-react"
import Link from "next/link"
import { CourseStatisticItem } from "@/components/course-statistic-item"

// Dummy data for a specific course view
const dummyCourseData = {
  id: "1", // This would come from the URL parameter
  title: "Building A Growth Mindset",
  lessonsCount: 24,
  totalDuration: "1 hr 30 min",
  description:
    "This comprehensive course offers an in-depth exploration of [subject/topic area], designed for learners at all levels. Whether you're a beginner looking to build a strong foundation or an experienced professional seeking to refine your skills, this course provides the tools and insights you need to succeed. You'll learn practical strategies, engage with interactive exercises, and gain a deeper understanding of key concepts. Our expert instructors guide you through each module, ensuring a clear and engaging learning experience. Prepare to transform your approach and achieve your goals with this essential course.",
  learningObjectives: [
    "Understand the core principles of a growth mindset.",
    "Differentiate between fixed and growth mindsets.",
    "Develop strategies for embracing challenges and learning from failure.",
    "Set effective growth-oriented goals.",
    "Implement daily practices to foster a growth mindset.",
  ],
  statistics: {
    completionRate: "50%",
    avgRating: "5/5",
    dropOffRate: "50%",
    activeToday: 23,
    avgCompletionTime: "5", // Assuming minutes or hours, adjust as needed
    enrollments: 1350,
  },
  modules: [
    {
      id: "module-1",
      title: "Module 1: Introduction to Growth Mindset",
      lessons: [
        { id: "lesson-1-1", title: "Lesson 1: What is a Growth Mindset?" },
        { id: "lesson-1-2", title: "Lesson 2: Fixed vs. Growth Mindset" },
        { id: "lesson-1-3", title: "Lesson 3: The Power of 'Yet'" },
      ],
    },
    {
      id: "module-2",
      title: "Module 2: Cultivating Resilience",
      lessons: [
        { id: "lesson-2-1", title: "Lesson 1: Embracing Challenges" },
        { id: "lesson-2-2", title: "Lesson 2: Learning from Failure" },
      ],
    },
    {
      id: "module-3",
      title: "Module 3: Practical Application",
      lessons: [
        { id: "lesson-3-1", title: "Lesson 1: Setting Growth Goals" },
        { id: "lesson-3-2", title: "Lesson 2: Daily Practices for Growth" },
      ],
    },
    {
      id: "module-4",
      title: "Module 4: Advanced Topics",
      lessons: [
        { id: "lesson-4-1", title: "Lesson 1: Growth Mindset in Teams" },
        { id: "lesson-4-2", title: "Lesson 2: Overcoming Plateaus" },
      ],
    },
  ],
}

export default function CourseViewPage({ params }: { params: { courseId: string } }) {
  // In a real app, you would fetch course data based on params.courseId
  const course = dummyCourseData // Using dummy data for now

  if (!course) {
    return (
      <div className="flex min-h-screen bg-white">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <h2 className="text-lg font-semibold text-gray-500">Course View</h2>
          <p className="mt-4 text-center text-gray-600">Course not found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Course View</h2>
        </header>

        <section className="mb-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Course Statistics</h1>

          <div className="flex items-center justify-center gap-8 mb-10">
            <CourseStatisticItem label="Completion Rate" value={course.statistics.completionRate} />
            <CourseStatisticItem label="Avg Rating" value={course.statistics.avgRating} />
            <CourseStatisticItem label="Drop off Rate" value={course.statistics.dropOffRate} isLast />
          </div>
          <div className="flex items-center justify-center gap-8 mb-10">
            <CourseStatisticItem label="Active Today" value={course.statistics.activeToday} />
            <CourseStatisticItem label="Avg completion time" value={course.statistics.avgCompletionTime} />
            <CourseStatisticItem label="Enrollments" value={course.statistics.enrollments} isLast />
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center">Course Overview</h1>

          <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500 text-xl font-semibold">
            Course Thumbnail Placeholder
          </div>

          <h2 className="text-4xl font-bold mb-2">{course.title}</h2>
          <div className="flex justify-between text-sm text-muted-foreground mb-6">
            <span>{course.lessonsCount} Lessons</span>
            <span>{course.totalDuration}</span>
          </div>

          <h3 className="text-xl font-bold mb-2">Course Description</h3>
          <p className="text-muted-foreground mb-8">
            {course.description}
            <Link href="#" className="text-blue-600 hover:underline ml-1">
              Read more
            </Link>
          </p>

          <h3 className="text-xl font-bold mb-2">What you'll learn</h3>
          <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-1">
            {course.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-4">Modules</h3>
          <Accordion type="single" collapsible className="w-full">
            {course.modules.map((module) => (
              <AccordionItem key={module.id} value={module.id} className="border-b">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">{module.title}</AccordionTrigger>
                <AccordionContent className="pl-4 py-2 space-y-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="text-muted-foreground">
                      {lesson.title}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-between space-x-4 mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Unpublish Course</Button>
            <Link href={`/course-management/new-module?courseId=${course.id}`}>
              {" "}
              {/* Pass courseId for editing */}
                    <Button variant="outline" className="bg-transparent flex items-center justify-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Edit Course</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
