"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Mock course data with modules structure
const getCourseData = (courseId: string, lessonId: string) => {
  const courseData = {
    id: courseId,
    title: "Speak with Impact",
    currentLesson: {
      id: lessonId,
      title: "Confidence",
      duration: "4 min",
      videoUrl: "/placeholder.svg?height=400&width=800",
      transcript: [
        {
          timestamp: "0:00",
          text: "Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance. Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance.",
        },
        {
          timestamp: "0:30",
          text: "Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance.",
        },
        {
          timestamp: "1:00",
          text: "Confidence isn't something you're born with—it's something you build. This course offers practical tips to help you speak up, stay calm under pressure, and trust your voice. Whether you're meeting new people or presenting an idea, you'll show up with self-assurance.",
        },
      ],
      notes: [
        {
          title: "Key Confidence Building Strategies",
          content:
            "• Practice power posing for 2 minutes before important conversations\n• Use positive self-talk to reframe negative thoughts\n• Start with small speaking opportunities to build momentum\n• Focus on your message rather than your nervousness",
        },
        {
          title: "Body Language Tips",
          content:
            "• Maintain eye contact for 3-5 seconds at a time\n• Keep shoulders back and chest open\n• Use purposeful hand gestures to emphasize points\n• Stand with feet shoulder-width apart for stability",
        },
        {
          title: "Voice Projection Techniques",
          content:
            "• Breathe from your diaphragm, not your chest\n• Speak slowly and clearly - rushing makes you sound nervous\n• Vary your tone to keep listeners engaged\n• Practice speaking at different volumes",
        },
        {
          title: "Mental Preparation",
          content:
            "• Visualize successful outcomes before speaking\n• Prepare 3 key points you want to communicate\n• Remember that most people want you to succeed\n• Focus on serving your audience rather than impressing them",
        },
      ],
      resources: [
        {
          title: "TED Talk: Your Body Language May Shape Who You Are",
          description: "Amy Cuddy's famous talk on power posing and confidence",
          url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are",
          type: "video",
        },
        {
          title: "Public Speaking Anxiety: A Guide",
          description: "Comprehensive guide to overcoming speaking anxiety",
          url: "https://example.com/speaking-anxiety-guide",
          type: "article",
        },
        {
          title: "Voice Training Exercises",
          description: "Daily exercises to improve your speaking voice",
          url: "https://example.com/voice-exercises",
          type: "pdf",
        },
        {
          title: "Confidence Building Workbook",
          description: "Interactive exercises to build lasting confidence",
          url: "https://example.com/confidence-workbook",
          type: "pdf",
        },
        {
          title: "Toastmasters International",
          description: "Find local speaking clubs to practice your skills",
          url: "https://www.toastmasters.org",
          type: "website",
        },
      ],
    },
    modules: [
      {
        id: 1,
        title: "Foundations of Effective Communication",
        duration: "12 min",
        locked: false,
        lessons: [
          {
            id: "1",
            title: "Introduction",
            duration: "4 min",
            type: "video",
            completed: true,
          },
          {
            id: "2",
            title: "Confidence",
            duration: "4 min",
            type: "video",
            completed: false,
            current: true,
          },
          {
            id: "3",
            title: "Body language",
            duration: "4 min",
            type: "video",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Building Your Speaking Skills",
        duration: "16 min",
        locked: false,
        lessons: [
          {
            id: "4",
            title: "Assessment 1",
            duration: "4 min",
            type: "quiz",
            completed: false,
          },
          {
            id: "5",
            title: "Finding your voice",
            duration: "4 min",
            type: "video",
            completed: false,
          },
          {
            id: "6",
            title: "Active Listening & Response",
            duration: "4 min",
            type: "video",
            completed: false,
          },
          {
            id: "7",
            title: "Assessment 2",
            duration: "4 min",
            type: "quiz",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Advanced Communication Techniques",
        duration: "8 min",
        locked: true,
        lessons: [
          {
            id: "8",
            title: "Crafting Clear Messages",
            duration: "4 min",
            type: "reading",
            completed: false,
          },
          {
            id: "9",
            title: "Non-Verbal Communication",
            duration: "4 min",
            type: "video",
            completed: false,
          },
        ],
      },
      {
        id: 4,
        title: "Course Completion",
        duration: "4 min",
        locked: true,
        lessons: [
          {
            id: "10",
            title: "Final Assessment",
            duration: "4 min",
            type: "quiz",
            completed: false,
          },
        ],
      },
    ],
  }

  return courseData
}

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
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]) // First two modules expanded by default
  const course = getCourseData(params.courseId, params.lessonId)

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  // Find current lesson for navigation
  let currentLessonIndex = -1
  const allLessons: any[] = []
  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      allLessons.push(lesson)
      if (lesson.current) {
        currentLessonIndex = allLessons.length - 1
      }
    })
  })

  const previousLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden bg-white border-r`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
              <Menu className="h-4 w-4 mr-2" />
              Hide menu
            </Button>
          </div>

          {/* Course Modules */}
          <div className="space-y-2">
            {course.modules.map((module, moduleIndex) => (
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
                    {module.lessons.map((lesson, lessonIndex) => (
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
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                uncommon
              </Link>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  View Jobs
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Find Talent
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Courses
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Daisy</span>
            </div>
          </div>
        </header>

        {/* Course Navigation */}
        <div className="bg-white border-b px-6 py-4">
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
                  <Button variant="outline">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </Link>
              )}
              {nextLesson && (
                <Link href={`/courses/${params.courseId}/learn/${nextLesson.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Video and Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Video Player */}
            <Card className="mb-6 border-0 shadow-none">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=800"
                    alt="Course video"
                    className="w-full h-full object-cover"
                  />
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" className="text-white hover:bg-white/20">
                        <Play className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 bg-white/30 rounded-full h-1">
                        <div className="bg-white rounded-full h-1 w-1/3"></div>
                      </div>
                      <Button variant="outline" className="text-white hover:bg-white/20">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="text-white hover:bg-white/20">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{course.title}</h1>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transcription">Transcription</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="transcription" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h3 className="font-medium">Transcript</h3>
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
                      {course.currentLesson.transcript.map((item, index) => (
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
                      {course.currentLesson.notes.map((note, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                          <h4 className="font-semibold text-gray-900 mb-2">{note.title}</h4>
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
                      {course.currentLesson.resources.map((resource, index) => (
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
                            <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
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
        <Button variant="outline" onClick={() => setSidebarOpen(true)} className="fixed top-4 left-4 z-10">
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
