"use client"
import React, { useEffect, useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Clock, BookOpen, Award, BadgeIcon as Certificate, Trophy, CheckCircle, Play, Lock, ChevronDown, ChevronRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


console.log("Collapsible is:", Collapsible)



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
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedModules, setExpandedModules] = useState<number[]>([1]) // First module expanded by default
  const [showBadgesDropdown, setShowBadgesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:3001/courses/${courseId}/content`);
        if (!res.ok) throw new Error('Failed to fetch course content');
        const data = await res.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch course content');
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBadgesDropdown(false);
      }
    }
    if (showBadgesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBadgesDropdown]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const handleStartLearning = () => {
    // Find the first unlocked module and its first lesson
    const firstUnlockedModule = course.modules_outline.find((module: any) => !module.locked);
    if (firstUnlockedModule && firstUnlockedModule.lessons.length > 0) {
      const firstLesson = firstUnlockedModule.lessons[0];
      router.push(`/courses/${courseId}/learn/${firstLesson.id}`);
    }
  }

  const handleStartModule = (module: any) => {
    if (module.lessons.length > 0) {
      const firstLesson = module.lessons[0];
      router.push(`/courses/${courseId}/learn/${firstLesson.id}`);
    }
  }

  const handleStartLesson = (lessonId: string) => {
    router.push(`/courses/${courseId}/learn/${lessonId}`);
  }

  const handleContinueLearning = () => {
    // Find the next lesson to continue from based on progress
    // For now, just navigate to the first lesson
    const firstUnlockedModule = course.modules_outline.find((module: any) => !module.locked);
    if (firstUnlockedModule && firstUnlockedModule.lessons.length > 0) {
      const firstLesson = firstUnlockedModule.lessons[0];
      router.push(`/courses/${courseId}/learn/${firstLesson.id}`);
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-gray-500">Loading course...</div>
    </div>;
  }
  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-red-500">{error}</div>
    </div>;
  }
  if (!course) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center text-gray-500">No course found.</div>
    </div>;
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
      <button
        onClick={() => router.push('/courses')}
        className="mb-4 flex items-center text-gray-500 hover:text-blue-600 bg-transparent border-none outline-none cursor-pointer"
        style={{ background: 'transparent', boxShadow: 'none' }}
        aria-label="Back to Courses"
      >
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Courses</span>
      </button>

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
                  {course.objectives.map((outcome: string, index: number) => (
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
                  {course.modules.map((module: any, index: number) => (
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
                              <Button 
                                variant="outline" 
                                className="text-blue-600 mr-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartModule(module);
                                }}
                              >
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
                          {module.lessons.map((lesson: any, lessonIndex: number) => (
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
                                <Button 
                                  variant="outline" 
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartLesson(lesson.id);
                                  }}
                                >
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
                  <span className="text-gray-700">{course.duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">{Array.isArray(course.modules) ? course.modules.length : course.modules} modules</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            {course.instructor && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={course.instructor.avatar ? course.instructor.avatar : "/placeholder.svg"} />
                      <AvatarFallback>
                        {(course.instructor.name || "NA")
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{course.instructor.name || "Unknown"}</h4>
                      <p className="text-sm text-gray-600">{course.instructor.bio || ""}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rewards */}
            <Card>
              <CardHeader>
                <CardTitle>Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.isArray(course.rewards?.badges) && course.rewards.badges.length > 0 && (
                  <div ref={dropdownRef} className="relative flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-gray-700 mr-2">{course.rewards.badges.length} Badges</span>
                    <button
                      className="flex items-center text-blue-600 hover:underline"
                      onClick={() => setShowBadgesDropdown((open) => !open)}
                      type="button"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showBadgesDropdown && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
                        <ul className="py-2">
                          {course.rewards.badges.map((badge: any) => (
                            <li key={badge.id} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                              <img src={badge.iconUrl} alt={badge.name} className="h-6 w-6 rounded-full" />
                              <div>
                                <div className="font-medium">{badge.name}</div>
                                <div className="text-xs text-gray-500">{badge.description}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
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
                  <Button 
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    onClick={handleContinueLearning}
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Start Course Button */}
            {course.progress === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 flex items-center justify-center" onClick={handleStartLearning}>
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
