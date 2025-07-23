"use client"

import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit } from "lucide-react"
import Link from "next/link"

// Dummy data for course preview
const dummyCourseData = {
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

export default function CoursePreview() {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Course Preview</h2>
        </header>

        <section className="mb-8 max-w-3xl mx-auto">
          <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500 text-xl font-semibold">
            Course Thumbnail Placeholder
          </div>

          <h1 className="text-4xl font-bold mb-2">{dummyCourseData.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span>{dummyCourseData.lessonsCount} Lessons</span>
            <span className="mx-2">•</span>
            <span>{dummyCourseData.totalDuration}</span>
          </div>

          <h2 className="text-xl font-bold mb-2">Course Description</h2>
          <p className="text-muted-foreground mb-8">
            {dummyCourseData.description}
            <Link href="#" className="text-blue-600 hover:underline ml-1">
              Read more
            </Link>
          </p>

          {/* Course Learning Objectives Section */}
          <h2 className="text-xl font-bold mb-2">What you'll learn</h2>
          <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-1">
            {dummyCourseData.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mb-4">Modules</h2>
          <Accordion type="single" collapsible className="w-full">
            {dummyCourseData.modules.map((module) => (
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

          <div className="flex justify-center space-x-4 mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Publish Course</Button>
            <Link href="/course-management/new-module">
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
