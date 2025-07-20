"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CourseDetailHeader from "@/components/course_detail_header"
import CourseSidebar from "@/components/course_sidebar"
import VideoPlayerPlaceholder from "@/components/video_player_placeholder"
import CourseContentTabs from "@/components/course_content_tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Placeholder data for a single course
const courseData = {
  id: "speak-with-impact",
  title: "Speak with Impact",
  currentLessonTitle: "Confidence",
  lessons: [
    { id: "intro", title: "Introduction", duration: "4 min", status: "completed" as const },
    { id: "confidence", title: "Confidence", duration: "4 min", status: "playing" as const },
    { id: "body-language", title: "Body language", duration: "4 min", status: "document" as const },
    { id: "assessment-1", title: "Assessment 1", duration: "4 min", status: "locked" as const },
    { id: "finding-voice", title: "Finding your voice", duration: "4 min", status: "document" as const },
    { id: "active-listening", title: "Active Listening & Response", duration: "4 min", status: "playing" as const },
    { id: "assessment-2", title: "Assessment 2", duration: "4 min", status: "locked" as const },
    { id: "crafting-messages", title: "Crafting Clear Messages", duration: "4 min", status: "document" as const },
    { id: "non-verbal", title: "Non-Verbal Communication", duration: "4 min", status: "playing" as const },
    { id: "final-assessment", title: "Final Assessment", duration: "4 min", status: "locked" as const },
  ],
  transcription:
    "Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance. Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance. Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance.",
  notes: "Key points: Build confidence, speak up, stay calm, trust your voice. Practice makes perfect.",
  resources: ["Presentation Slides.pdf", "Confidence Building Exercises.docx", "Recommended Reading List.pdf"],
}

export default function CourseDetailPage() {
  const [activeLessonId, setActiveLessonId] = useState("confidence") // Default active lesson

  const handleLessonSelect = (id: string) => {
    setActiveLessonId(id)
    // In a real app, you'd load content for this lesson
  }

  const currentLessonIndex = courseData.lessons.findIndex((lesson) => lesson.id === activeLessonId)
  const previousLesson = currentLessonIndex > 0 ? courseData.lessons[currentLessonIndex - 1] : null
  const nextLesson =
    currentLessonIndex < courseData.lessons.length - 1 ? courseData.lessons[currentLessonIndex + 1] : null

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <CourseDetailHeader />

      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <CourseSidebar
          courseTitle={courseData.title}
          lessons={courseData.lessons}
          activeLessonId={activeLessonId}
          onLessonSelect={handleLessonSelect}
        />

        {/* Main Content Area */}
        <main className="flex-grow p-8 bg-white rounded-bl-lg overflow-auto">
          {/* Breadcrumbs and Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600 text-sm">
              <Link href="/courses" className="hover:underline">
                {courseData.title}
              </Link>{" "}
              &gt; <span className="font-medium">{courseData.currentLessonTitle}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" disabled={!previousLesson}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <Button variant="outline" disabled={!nextLesson}>
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Video Player Placeholder */}
          <VideoPlayerPlaceholder />

          {/* Course Title and Tabs */}
          <h2 className="text-3xl font-bold mt-8">{courseData.title}</h2>
          <CourseContentTabs
            transcription={courseData.transcription}
            notes={courseData.notes}
            resources={courseData.resources}
          />
        </main>
      </div>
    </div>
  )
}
