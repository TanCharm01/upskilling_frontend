"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Target, Unlock, AlertCircle, CheckCircle } from "lucide-react"
import AdminSidebar from "@/components/AdminSidebar"
import { useEffect } from "react"

type AssessmentType = "final" | "quiz"

interface FormData {
  type: AssessmentType
  courseId: string
  moduleId: string
  title: string
  duration: number
  passingScore: number
  unlockAfter: number
  questions: string
}

const SAMPLE_FINAL_ASSESSMENT = {
  title: "Final Assessment: Advanced CSS",
  duration: 60,
  passingScore: 70,
  questions: [
    {
      id: "q1",
      prompt: "Explain the Box Model in CSS.",
      sampleAnswer: "A good answer should mention content, padding, border, and margin.",
    },
    {
      id: "q2",
      prompt: "What is specificity in CSS?",
      sampleAnswer: "A good answer should include selector weights and override rules.",
    },
  ],
}

const SAMPLE_QUIZ = {
  title: "Module 3 Quiz: Grid Systems",
  unlockAfter: 15,
  duration: 20,
  questions: [
    {
      id: "q1",
      prompt: "What does `grid-template-columns` do?",
      sampleAnswer: "Defines how columns are sized in a CSS grid layout.",
    },
    {
      id: "q2",
      prompt: "How do you center content using grid?",
      sampleAnswer: "You can use `place-items: center` or `justify-content` and `align-items`.",
    },
  ],
}

export default function AdminUploadPage() {
  const [activeTab, setActiveTab] = useState<AssessmentType>("final")
  const [formData, setFormData] = useState<FormData>({
    type: "final",
    courseId: "",
    moduleId: "",
    title: "",
    duration: 60,
    passingScore: 70,
    unlockAfter: 15,
    questions: JSON.stringify(SAMPLE_FINAL_ASSESSMENT.questions, null, 2),
  })
  const [jsonError, setJsonError] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [modulesLoading, setModulesLoading] = useState(false);
  const [modulesError, setModulesError] = useState<string | null>(null);

  // Fetch all courses on mount
  useEffect(() => {
    async function fetchCourses() {
      setCoursesLoading(true);
      setCoursesError(null);
      try {
        const res = await fetch("http://localhost:3001/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err: any) {
        setCoursesError(err.message || "Failed to fetch courses");
      } finally {
        setCoursesLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // Fetch modules when a course is selected
  useEffect(() => {
    if (!formData.courseId) {
      setModules([]);
      return;
    }
    async function fetchModules() {
      setModulesLoading(true);
      setModulesError(null);
      try {
        const res = await fetch(`http://localhost:3001/courses/${formData.courseId}/modules`);
        if (!res.ok) throw new Error("Failed to fetch modules");
        const data = await res.json();
        setModules(data);
      } catch (err: any) {
        setModulesError(err.message || "Failed to fetch modules");
      } finally {
        setModulesLoading(false);
      }
    }
    fetchModules();
  }, [formData.courseId]);

  const validateJSON = (jsonString: string) => {
    try {
      JSON.parse(jsonString)
      setJsonError("")
      return true
    } catch (error) {
      setJsonError("Invalid JSON format")
      return false
    }
  }

  const handleTabChange = (value: string) => {
    const newType = value as AssessmentType
    setActiveTab(newType)
    setFormData((prev) => ({
      ...prev,
      type: newType,
      questions: JSON.stringify(
        newType === "final" ? SAMPLE_FINAL_ASSESSMENT.questions : SAMPLE_QUIZ.questions,
        null,
        2,
      ),
    }))
    setJsonError("")
    setSubmitSuccess(false)
  }

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSubmitSuccess(false)
  }

  const handleQuestionsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, questions: value }))
    validateJSON(value)
    setSubmitSuccess(false)
  }

  const loadSampleTemplate = () => {
    const sample = activeTab === "final" ? SAMPLE_FINAL_ASSESSMENT : SAMPLE_QUIZ
    setFormData((prev) => ({
      ...prev,
      title: sample.title,
      duration: sample.duration,
      ...(activeTab === "final" ? { passingScore: (sample as any).passingScore } : { unlockAfter: (sample as any).unlockAfter }),
      questions: JSON.stringify(sample.questions, null, 2),
    }))
    setJsonError("")
  }

  const handleSubmit = async () => {
    if (!validateJSON(formData.questions)) return
    if (!formData.courseId || !formData.title) return

    if (activeTab === "quiz" && !formData.moduleId) return

    setIsSubmitting(true)

    try {
      const payload =
        activeTab === "final"
          ? {
              title: formData.title,
              duration: formData.duration,
              passingScore: formData.passingScore,
              questions: JSON.parse(formData.questions),
              courseId: formData.courseId,
            }
          : {
              title: formData.title,
              unlockAfter: formData.unlockAfter,
              duration: formData.duration,
              questions: JSON.parse(formData.questions),
              courseId: formData.courseId,
              moduleId: formData.moduleId,
            }

      const endpoint = activeTab === "final"
        ? "http://localhost:3001/final-assessments"
        : "http://localhost:3001/quizzes";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitSuccess(false);
        // Optionally, handle/display error
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h2 className="text-lg font-semibold text-gray-500">Assessment Management</h2>
          </header>
          
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assessment Upload Center</h1>
        <p className="text-muted-foreground">Upload Final Assessments and Quizzes for your courses</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <TabsList className="grid w-full grid-cols-2 p-1">
                <TabsTrigger value="final" className="flex items-center gap-2 py-3">
            <Target className="w-4 h-4" />
            Final Assessment
          </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2 py-3">
            <BookOpen className="w-4 h-4" />
            Quiz
          </TabsTrigger>
        </TabsList>
            </div>

        <TabsContent value="final">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Upload Final Assessment
              </CardTitle>
              <CardDescription>Create a comprehensive final assessment for course completion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="course-select" className="text-sm font-medium text-gray-700">Course *</Label>
                  <Select value={formData.courseId} onValueChange={(value) => handleInputChange("courseId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={coursesLoading ? "Loading courses..." : (coursesError ? "Failed to load courses" : "Select a course")} />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesLoading ? (
                        <div className="p-2 text-gray-500">Loading...</div>
                      ) : coursesError ? (
                        <div className="p-2 text-red-500">{coursesError}</div>
                      ) : courses.length === 0 ? (
                        <div className="p-2 text-gray-500">No courses found</div>
                      ) : (
                        courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                            {course.title || course.name}
                        </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Assessment Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Final Assessment: Advanced CSS"
                   className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4" />
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value) || 0)}
                    min="1"
                   className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="passing-score" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Target className="w-4 h-4" />
                    Passing Score (%)
                  </Label>
                  <Input
                    id="passing-score"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => handleInputChange("passingScore", Number.parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                   className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Upload Quiz
              </CardTitle>
              <CardDescription>Create a module-specific quiz for student practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="course-select-quiz" className="text-sm font-medium text-gray-700">Course *</Label>
                  <Select value={formData.courseId} onValueChange={(value) => handleInputChange("courseId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={coursesLoading ? "Loading courses..." : (coursesError ? "Failed to load courses" : "Select a course")} />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesLoading ? (
                        <div className="p-2 text-gray-500">Loading...</div>
                      ) : coursesError ? (
                        <div className="p-2 text-red-500">{coursesError}</div>
                      ) : courses.length === 0 ? (
                        <div className="p-2 text-gray-500">No courses found</div>
                      ) : (
                        courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                            {course.title || course.name}
                        </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="module-select" className="text-sm font-medium text-gray-700">Module *</Label>
                  <Select
                    value={formData.moduleId}
                    onValueChange={(value) => handleInputChange("moduleId", value)}
                    disabled={!formData.courseId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={modulesLoading ? "Loading modules..." : (modulesError ? "Failed to load modules" : "Select a module")} />
                    </SelectTrigger>
                    <SelectContent>
                      {modulesLoading ? (
                        <div className="p-2 text-gray-500">Loading...</div>
                      ) : modulesError ? (
                        <div className="p-2 text-red-500">{modulesError}</div>
                      ) : modules.length === 0 ? (
                        <div className="p-2 text-gray-500">No modules found</div>
                      ) : (
                        modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                            {module.title || module.name}
                        </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="quiz-title" className="text-sm font-medium text-gray-700">Quiz Title *</Label>
                <Input
                  id="quiz-title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Module 3 Quiz: Grid Systems"
                 className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="unlock-after" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Unlock className="w-4 h-4" />
                    Unlock After (lessons)
                  </Label>
                  <Input
                    id="unlock-after"
                    type="number"
                    value={formData.unlockAfter}
                    onChange={(e) => handleInputChange("unlockAfter", Number.parseInt(e.target.value) || 0)}
                    min="0"
                   className="w-full"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="quiz-duration" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4" />
                    Duration (minutes)
                  </Label>
                  <Input
                    id="quiz-duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value) || 0)}
                    min="1"
                   className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 shadow-sm border-0 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Questions JSON Editor</CardTitle>
              <CardDescription>
                Define your questions in JSON format. Each question should have an id, prompt, and sampleAnswer.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={loadSampleTemplate} className="bg-white border-gray-300 hover:bg-gray-50">
              Load Sample Template
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="questions" className="text-sm font-medium text-gray-700">Questions JSON *</Label>
            <Textarea
              id="questions"
              value={formData.questions}
              onChange={(e) => handleQuestionsChange(e.target.value)}
              placeholder="Enter questions in JSON format..."
             className="min-h-[400px] font-mono text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
            />
          </div>

          {jsonError && (
           <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>{jsonError}</span>
            </div>
          )}

          {submitSuccess && (
           <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>
                {activeTab === "final" ? "Final Assessment" : "Quiz"} uploaded successfully!
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Badge variant="secondary">JSON Format</Badge>
            <span>Use the sample template as a starting point for your questions</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !!jsonError ||
            !formData.courseId ||
            !formData.title ||
            (activeTab === "quiz" && !formData.moduleId)
          }
         className="min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          {isSubmitting ? "Uploading..." : `Upload ${activeTab === "final" ? "Assessment" : "Quiz"}`}
        </Button>
      </div>
        </div>
      </main>
    </div>
  )
}
