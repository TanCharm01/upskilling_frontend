"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CourseNavbar from "@/components/CourseNavbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  Volume2,
  Maximize,
  CheckCircle,
  Circle,
  FileText,
  BookOpen,
  Trophy,
  Clock,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { decodeJWT } from "@/lib/utils"

const getLessonIcon = (type: string, completed: boolean, current: boolean, locked = false) => {
  if (locked) {
    return <Lock className="h-4 w-4 text-gray-300" />
  }
  if (completed) {
    return <CheckCircle className="h-4 w-4 text-blue-600" />
  }
  if (current) {
    return <Circle className="h-4 w-4 text-blue-600 fill-blue-600" />
  }

  switch (type) {
    case "video":
      return <PlayCircle className="h-4 w-4 text-gray-400" />
    case "reading":
      return <BookOpen className="h-4 w-4 text-gray-400" />
    case "quiz":
      return <Trophy className="h-4 w-4 text-gray-400" />
    default:
      return <Circle className="h-4 w-4 text-gray-400" />
  }
}

export default function CourseLearningPage({
  params,
}: {
  params: { courseId: string; lessonId: string }
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("transcription")
  const [expandedModules, setExpandedModules] = useState<number[]>([1]) // First module expanded by default
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserAndCourse() {
      setLoading(true)
      setError("")
      
      try {
        // Get user ID from JWT token
        if (typeof window === "undefined") return
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No token found. Please login.")
          setLoading(false)
          return
        }
        
        const userInfo = decodeJWT(token)
        const currentUserId = userInfo?.id
        if (!currentUserId) {
          setError("Could not get user ID from token.")
          setLoading(false)
          return
        }
        setUserId(currentUserId)

        // Fetch course content with user ID and current lesson ID
        const res = await fetch(
          `http://localhost:3001/courses/${params.courseId}/content?userId=${currentUserId}&currentLessonId=${params.lessonId}`
        )
        if (!res.ok) throw new Error("Failed to fetch course content")
        const data = await res.json()
        setCourse(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch course content")
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserAndCourse()
  }, [params.courseId, params.lessonId])

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  if (loading) {
    return (
      <>
        <CourseNavbar />
        <div className="min-h-screen bg-white flex pt-[64px]">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">Loading course content...</div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <CourseNavbar />
        <div className="min-h-screen bg-white flex pt-[64px]">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </>
    )
  }

  if (!course) {
    return (
      <>
        <CourseNavbar />
        <div className="min-h-screen bg-white flex pt-[64px]">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">No course found.</div>
          </div>
        </div>
      </>
    )
  }

  // Find current lesson for navigation
  let currentLessonIndex = -1
  const allLessons: any[] = []
  course.modules.forEach((module: any) => {
    module.lessons.forEach((lesson: any) => {
      allLessons.push(lesson)
      if (lesson.current) {
        currentLessonIndex = allLessons.length - 1
      }
    })
  })

  const previousLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null

  return (
    <>
      <CourseNavbar />
      <div className="min-h-screen bg-white flex pt-[64px]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden bg-white border-r border-gray-100`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 min-w-[120px] flex items-center justify-center">
                <Menu className="h-4 w-4 mr-2" />
                Hide menu
              </Button>
            </div>

            {/* Course Modules */}
            <div className="space-y-2">
              {course.modules.map((module: any, moduleIndex: number) => (
                <div key={module.id}>
                  {/* Module Header */}
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      module.locked
                        ? "bg-gray-50 border border-gray-100"
                        : "bg-gray-100 border border-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => !module.locked && toggleModule(module.id)}
                  >
                    <div className="flex items-center">
                      {module.locked ? (
                        <Lock className="h-4 w-4 text-gray-400 mr-3" />
                      ) : (
                        <Play className="h-4 w-4 text-gray-600 mr-3" />
                      )}
                      <div>
                        <h4 className={`font-medium text-sm ${module.locked ? "text-gray-400" : "text-gray-800"}`}>
                          Module {moduleIndex + 1}: {module.title}
                        </h4>
                        <p className={`text-xs ${module.locked ? "text-gray-300" : "text-gray-500"}`}>
                          {module.lessons.length} lessons • {module.duration}
                        </p>
                      </div>
                    </div>
                    {!module.locked && (
                      <div className="flex items-center">
                        {expandedModules.includes(module.id) ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module Lessons */}
                  {expandedModules.includes(module.id) && !module.locked && (
                    <div className="ml-4 mt-2 space-y-1">
                      {module.lessons.map((lesson: any, lessonIndex: number) => (
                        <Link
                          key={lesson.id}
                          href={`/courses/${params.courseId}/learn/${lesson.id}`}
                          className={`flex items-center p-2 rounded-md transition-colors ${
                            lesson.current ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="mr-3">
                            {getLessonIcon(lesson.type, !!lesson.completed, !!lesson.current, module.locked)}
                          </div>
                          <div className="flex-1">
                            <h5 className={`font-medium text-xs ${lesson.current ? "text-blue-900" : "text-gray-800"}`}>
                              {lessonIndex + 1}. {lesson.title}
                            </h5>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          {/* Course Navigation */}
          <div className="bg-white border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href={`/courses/${params.courseId}/enroll`} className="hover:text-blue-600">
                  {course.title}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-900 font-medium">{course.currentLesson.title}</span>
              </div>
              <div className="flex space-x-2">
                {previousLesson && (
                  <Link href={`/courses/${params.courseId}/learn/${previousLesson.id}`}>
                    <Button variant="outline" className="min-w-[120px] flex items-center justify-center">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      <span className="inline-block align-middle">Previous</span>
                    </Button>
                  </Link>
                )}
                {nextLesson && (
                  <Link href={`/courses/${params.courseId}/learn/${nextLesson.id}`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 min-w-[120px] flex items-center justify-center">
                      <span className="inline-block align-middle">Next</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Video and Content */}
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto px-2">
              {/* Video Player */}
              <Card className="mb-6 border-0">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      src={course.currentLesson.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                      poster={course.currentLesson.videoUrl}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Course Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{course.title}</h1>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex w-full justify-start">
                  <TabsTrigger value="transcription">Transcription</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <div className="border-b border-gray-100 w-full mb-4" />

                <TabsContent value="transcription" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <h3 className="font-medium text-left">Language</h3>
                          <Select defaultValue="english">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {course.currentLesson.transcript.map((item: any, index: number) => (
                          <div key={index} className="flex space-x-4">
                            <span className="text-sm font-mono text-blue-600 min-w-[3rem]">{item.timestamp}</span>
                            <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {course.currentLesson.notes.map((note: any, index: number) => (
                          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <h4 className="font-semibold text-gray-900 mb-2 text-left">{note.title}</h4>
                            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                              {note.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {course.currentLesson.resources.map((resource: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              {resource.type === "video" && <Play className="h-5 w-5 text-red-600" />}
                              {resource.type === "article" && <FileText className="h-5 w-5 text-blue-600" />}
                              {resource.type === "pdf" && <FileText className="h-5 w-5 text-green-600" />}
                              {resource.type === "website" && <BookOpen className="h-5 w-5 text-purple-600" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1 text-left">{resource.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Open Resource →
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button (when closed) */}
        {!sidebarOpen && (
          <Button variant="outline" onClick={() => setSidebarOpen(true)} className="fixed top-[64px] left-4 z-40 min-w-[120px] flex items-center justify-center">
            <Menu className="h-4 w-4 mr-2" />
            Show menu
          </Button>
        )}
      </div>
    </>
  )
}
