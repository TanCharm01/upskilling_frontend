"use client"
import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Clock, BookOpen, Award, BadgeIcon as Certificate, Trophy, CheckCircle, Play, Lock, ChevronDown, ChevronRight, PlayCircle } from "lucide-react"
import Link from "next/link"


console.log("Collapsible is:", Collapsible)


// Mock course data - in a real app, this would come from an API
const getCourseData = (courseId: string) => {
  const courses = {
    "1": {
      id: "1",
      title: "Building A Growth Mindset",
      tagline: "Transform your thinking, transform your life",
      coverImage: "/placeholder.svg?height=300&width=800",
      description:
        "Develop the mental frameworks and habits that successful people use to overcome challenges, learn from failures, and continuously improve. This comprehensive course will help you shift from a fixed mindset to a growth mindset.",
      duration: "2h 30m",
      modules: 23,
      level: "Beginner",
      instructor: {
        name: "Dr. Sarah Johnson",
        bio: "Psychologist and mindset coach with 15+ years of experience",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      learningOutcomes: [
        "Understand the difference between fixed and growth mindsets",
        "Develop resilience in the face of challenges",
        "Learn to embrace failure as a learning opportunity",
        "Build habits that support continuous growth",
        "Apply growth mindset principles to your career and relationships",
      ],
      rewards: {
        badge: "Growth Mindset Champion",
        certificate: "Certificate of Completion",
        challenges: 3,
      },
      progress: 0,
      modules_outline: [
        {
          id: 1,
          title: "Introduction to Growth Mindset",
          duration: "20 min",
          locked: false,
          lessons: [
            { id: 1, title: "What is a Growth Mindset?", duration: "5 min", type: "video", completed: false },
            {
              id: 2,
              title: "Fixed vs Growth: The Key Differences",
              duration: "8 min",
              type: "video",
              completed: false,
            },
            { id: 3, title: "Self-Assessment: Where Are You Now?", duration: "7 min", type: "quiz", completed: false },
          ],
        },
        {
          id: 2,
          title: "The Science Behind Growth Mindset",
          duration: "25 min",
          locked: true,
          lessons: [
            { id: 4, title: "Neuroplasticity and Learning", duration: "10 min", type: "video", completed: false },
            {
              id: 5,
              title: "Research on Mindset and Performance",
              duration: "8 min",
              type: "reading",
              completed: false,
            },
            {
              id: 6,
              title: "Case Studies: Growth Mindset in Action",
              duration: "7 min",
              type: "video",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Embracing Challenges",
          duration: "30 min",
          locked: true,
          lessons: [
            { id: 7, title: "Why We Avoid Challenges", duration: "6 min", type: "video", completed: false },
            { id: 8, title: "Reframing Difficult Situations", duration: "8 min", type: "video", completed: false },
            { id: 9, title: "The Challenge Mindset", duration: "7 min", type: "reading", completed: false },
            {
              id: 10,
              title: "Practice Exercise: Embrace a Challenge",
              duration: "9 min",
              type: "exercise",
              completed: false,
            },
          ],
        },
        {
          id: 4,
          title: "Learning from Failure",
          duration: "28 min",
          locked: true,
          lessons: [
            { id: 11, title: "Failure as Feedback", duration: "8 min", type: "video", completed: false },
            {
              id: 12,
              title: "The Growth Mindset Response to Setbacks",
              duration: "10 min",
              type: "video",
              completed: false,
            },
            { id: 13, title: "Building Resilience", duration: "10 min", type: "reading", completed: false },
          ],
        },
        {
          id: 5,
          title: "Building Growth Habits",
          duration: "27 min",
          locked: true,
          lessons: [
            { id: 14, title: "Daily Practices for Growth", duration: "8 min", type: "video", completed: false },
            { id: 15, title: "Creating Your Growth Plan", duration: "10 min", type: "exercise", completed: false },
            { id: 16, title: "Maintaining Momentum", duration: "9 min", type: "video", completed: false },
          ],
        },
      ],
    },
    "2": {
      id: "2",
      title: "Speak With Impact",
      tagline: "Master the art of powerful communication",
      coverImage: "/placeholder.svg?height=300&width=800",
      description:
        "Learn to communicate with confidence, clarity, and impact. Whether you're presenting to colleagues, speaking at events, or having difficult conversations, this course will help you become a more effective communicator.",
      duration: "1h 45m",
      modules: 18,
      level: "Intermediate",
      instructor: {
        name: "Michael Chen",
        bio: "Professional speaker and communication expert",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      learningOutcomes: [
        "Develop confident speaking skills",
        "Structure compelling presentations",
        "Handle difficult conversations with ease",
        "Use body language effectively",
        "Engage and influence your audience",
      ],
      rewards: {
        badge: "Communication Master",
        certificate: "Certificate of Completion",
        challenges: 2,
      },
      progress: 0,
      modules_outline: [
        {
          id: 1,
          title: "Foundations of Effective Communication",
          duration: "22 min",
          locked: false,
          lessons: [
            { id: 1, title: "The Communication Framework", duration: "6 min", type: "video", completed: false },
            { id: 2, title: "Understanding Your Audience", duration: "8 min", type: "video", completed: false },
            { id: 3, title: "Clarity and Conciseness", duration: "8 min", type: "reading", completed: false },
          ],
        },
        {
          id: 2,
          title: "Building Confidence",
          duration: "18 min",
          locked: true,
          lessons: [
            { id: 4, title: "Overcoming Speaking Anxiety", duration: "10 min", type: "video", completed: false },
            { id: 5, title: "Confidence Building Exercises", duration: "8 min", type: "exercise", completed: false },
          ],
        },
        {
          id: 3,
          title: "Structuring Your Message",
          duration: "25 min",
          locked: true,
          lessons: [
            { id: 6, title: "The Power of Structure", duration: "7 min", type: "video", completed: false },
            { id: 7, title: "Opening and Closing Strong", duration: "9 min", type: "video", completed: false },
            { id: 8, title: "Storytelling Techniques", duration: "9 min", type: "reading", completed: false },
          ],
        },
        {
          id: 4,
          title: "Advanced Speaking Techniques",
          duration: "40 min",
          locked: true,
          lessons: [
            { id: 9, title: "Body Language Mastery", duration: "12 min", type: "video", completed: false },
            { id: 10, title: "Voice and Tone", duration: "10 min", type: "video", completed: false },
            { id: 11, title: "Handling Q&A Sessions", duration: "8 min", type: "video", completed: false },
            { id: 12, title: "Final Practice Session", duration: "10 min", type: "exercise", completed: false },
          ],
        },
      ],
    },
  }

  return courses[courseId as keyof typeof courses] || courses["1"]
}

const getLessonIcon = (type: string) => {
  switch (type) {
    case "video":
      return <PlayCircle className="h-4 w-4 text-blue-600" />
    case "reading":
      return <BookOpen className="h-4 w-4 text-green-600" />
    case "quiz":
      return <CheckCircle className="h-4 w-4 text-purple-600" />
    case "exercise":
      return <Trophy className="h-4 w-4 text-orange-600" />
    default:
      return <PlayCircle className="h-4 w-4 text-blue-600" />
  }
}

export default function CourseEnrollPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = React.use(params);
  const course = getCourseData(courseId);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]) // First module expanded by default

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            uncommon
          </Link>
          <div className="flex space-x-3">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Learn
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Course Cover & Title */}
        <div className="relative aspect-video rounded-lg mb-6 overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-2 text-white">{course.title}</h1>
            <p className="text-xl opacity-90 text-white">{course.tagline}</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-green-800">Welcome to {course.title}!</h2>
          </div>
          <p className="text-green-700">
            {"You're all set! Let's get started on your learning journey and unlock your potential."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What {"You'll"} Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course Outline - Now Collapsible */}
            <Card>
              <CardHeader>
                <CardTitle>Course Outline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.modules_outline.map((module, index) => (
                    <Collapsible
                      key={module.id}
                      open={expandedModules.includes(module.id)}
                      onOpenChange={() => toggleModule(module.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <div
                          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                            module.locked
                              ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
                              : "bg-blue-50 border-blue-200 hover:bg-blue-100"
                          }`}
                        >
                          <div className="flex items-center">
                            {module.locked ? (
                              <Lock className="h-5 w-5 text-gray-400 mr-3" />
                            ) : (
                              <Play className="h-5 w-5 text-blue-600 mr-3" />
                            )}
                            <div>
                              <h4 className={`font-medium ${module.locked ? "text-gray-500" : "text-gray-900"}`}>
                                Module {index + 1}: {module.title}
                              </h4>
                              <p className={`text-sm ${module.locked ? "text-gray-400" : "text-gray-600"}`}>
                                {module.lessons.length} lessons • {module.duration}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {!module.locked && (
                              <Button variant="outline" className="text-blue-600 mr-2">
                                Start
                              </Button>
                            )}
                            {expandedModules.includes(module.id) ? (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="px-4 pb-2">
                        <div className="ml-8 mt-2 space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center justify-between p-3 rounded-md border ${
                                module.locked
                                  ? "bg-gray-25 border-gray-100"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center">
                                {getLessonIcon(lesson.type)}
                                <div className="ml-3">
                                  <h5
                                    className={`text-sm font-medium ${
                                      module.locked ? "text-gray-400" : "text-gray-800"
                                    }`}
                                  >
                                    {lessonIndex + 1}. {lesson.title}
                                  </h5>
                                  <p className={`text-xs ${module.locked ? "text-gray-300" : "text-gray-500"}`}>
                                    {lesson.duration} • {lesson.type}
                                  </p>
                                </div>
                              </div>
                              {!module.locked && (
                                <Button variant="outline" className="text-xs">
                                  {lesson.completed ? "Review" : "Start"}
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Meta Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{course.modules} modules</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-3">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{course.instructor.name}</h4>
                    <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Earn */}
            <Card>
              <CardHeader>
                <CardTitle>{"What You'll"} Earn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="text-gray-700">{course.rewards.badge}</span>
                </div>
                <div className="flex items-center">
                  <Certificate className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">{course.rewards.certificate}</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">{course.rewards.challenges} Challenges</span>
                </div>
              </CardContent>
            </Card>

            {/* Progress (if returning user) */}
            {course.progress > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-gray-600">{course.progress}% complete</p>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Continue Learning</Button>
                </CardContent>
              </Card>
            )}

            {/* Start Course Button */}
            {course.progress === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                    <Play className="h-5 w-5 mr-2" />
                    Start Learning
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-2">Begin with Module 1</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
