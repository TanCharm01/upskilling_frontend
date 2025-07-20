"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, CheckCircle, PlayCircle, Lock, FileText } from "lucide-react"
import { cn } from "@/lib/utils" // Assuming cn utility is available

interface CourseLesson {
  id: string
  title: string
  duration: string
  status: "completed" | "playing" | "locked" | "document"
}

interface CourseSidebarProps {
  courseTitle: string
  lessons: CourseLesson[]
  activeLessonId: string
  onLessonSelect: (id: string) => void
}

export default function CourseSidebar({ lessons, activeLessonId, onLessonSelect }: CourseSidebarProps) {
  const [isMenuHidden, setIsMenuHidden] = useState(false)

  const getIcon = (status: CourseLesson["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "playing":
        return <PlayCircle className="h-5 w-5 text-uncommonBlue-DEFAULT" />
      case "locked":
        return <Lock className="h-5 w-5 text-gray-400" />
      case "document":
        return <FileText className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <aside
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        isMenuHidden ? "w-16" : "w-80",
        "min-h-[calc(100vh-68px)]", // Adjust height based on header height
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuHidden(!isMenuHidden)}>
          <Menu className="h-6 w-6" />
        </Button>
        {!isMenuHidden && <span className="text-lg font-semibold">Hide menu</span>}
      </div>

      <nav className="flex-grow overflow-y-auto py-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => onLessonSelect(lesson.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100",
              activeLessonId === lesson.id && "bg-gray-100 border-l-4 border-uncommonBlue-DEFAULT",
            )}
          >
            <div className="flex-shrink-0">{getIcon(lesson.status)}</div>
            {!isMenuHidden && (
              <div className="flex flex-col flex-grow">
                <span className="text-base font-medium text-gray-800">{lesson.title}</span>
                <span className="text-sm text-gray-500">{lesson.duration}</span>
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
