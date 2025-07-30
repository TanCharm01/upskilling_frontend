"use client"

// import { AppSidebar } from "@/components/app-sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit, Save, X, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { CourseStatisticItem } from "@/components/course-statistic-item"
import React, { useEffect, useState } from "react";
import { buildApiUrl } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CourseViewPage({ params }: { params: Promise<{ courseId: string }> }) {
  // --- Course data state and fetch logic ---
  const [course, setCourse] = useState<any>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState<string | null>(null);

  // --- Statistics state and fetch logic ---
  const [statistics, setStatistics] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // --- Edit state management ---
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState(false);
  const [editData, setEditData] = useState<any>({});

  // Unwrap params Promise
  const { courseId } = React.use(params);

  // Fetch course data on mount
  useEffect(() => {
    async function fetchCourseData() {
      setCourseLoading(true);
      setCourseError(null);
      try {
        const res = await fetch(buildApiUrl(`courses/${courseId}/content/admin`));
        if (!res.ok) throw new Error("Failed to fetch course data");
        const data = await res.json();
        setCourse(data);
      } catch (err: any) {
        setCourseError(err.message || "Failed to fetch course data");
      } finally {
        setCourseLoading(false);
      }
    }
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    async function fetchStatistics() {
      setStatsLoading(true);
      setStatsError(null);
      try {
        const res = await fetch(buildApiUrl(`courses/${courseId}/statistics`));
        if (!res.ok) throw new Error("Failed to fetch statistics");
        const data = await res.json();
        setStatistics(data.statistics);
      } catch (err: any) {
        setStatsError(err.message || "Failed to fetch statistics");
      } finally {
        setStatsLoading(false);
      }
    }
    fetchStatistics();
  }, [courseId]);
  // --- End statistics logic ---

  // --- Edit handlers ---
  const startEditingModule = (module: any) => {
    setEditingModuleId(module.id);
    setEditData({
      title: module.title || '',
      description: module.description || '',
      duration: module.duration || ''
    });
  };

  const startEditingLesson = (lesson: any) => {
    setEditingLessonId(lesson.id);
    setEditData({
      title: lesson.title || '',
      content: lesson.content || '',
      duration: lesson.duration || '',
      type: lesson.type || 'video',
      mediaUrl: lesson.mediaUrl || '',
      notes: lesson.notes || [],
      resources: lesson.resources || [],
      transcript: lesson.transcript || []
    });
  };

  const startEditingCourse = () => {
    setEditingCourse(true);
    setEditData({
      title: course.title || '',
      description: course.description || '',
      level: course.level || 'beginner',
      category: course.category || '',
      objectives: course.objectives || []
    });
  };

  const saveModule = async (moduleId: string) => {
    try {
      // TODO: Replace with actual API call
      console.log('Saving module:', moduleId, editData);
      
      // Update local state
      setCourse((prevCourse: any) => ({
        ...prevCourse,
        modules: prevCourse.modules.map((mod: any) =>
          mod.id === moduleId ? { ...mod, ...editData } : mod
        )
      }));
      
      setEditingModuleId(null);
      setEditData({});
    } catch (error) {
      console.error('Error saving module:', error);
    }
  };

  const saveLesson = async (lessonId: string) => {
    try {
      // TODO: Replace with actual API call
      console.log('Saving lesson:', lessonId, editData);
      
      // Update local state
      setCourse((prevCourse: any) => ({
        ...prevCourse,
        modules: prevCourse.modules.map((mod: any) => ({
          ...mod,
          lessons: mod.lessons?.map((lesson: any) =>
            lesson.id === lessonId ? { ...lesson, ...editData } : lesson
          ) || []
        }))
      }));
      
      setEditingLessonId(null);
      setEditData({});
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const saveCourse = async () => {
    try {
      // TODO: Replace with actual API call
      console.log('Saving course:', editData);
      
      // Update local state
      setCourse((prevCourse: any) => ({
        ...prevCourse,
        ...editData
      }));
      
      setEditingCourse(false);
      setEditData({});
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const cancelEdit = () => {
    setEditingModuleId(null);
    setEditingLessonId(null);
    setEditingCourse(false);
    setEditData({});
  };

  const deleteModule = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      console.log('Deleting module:', moduleId);
      
      // Update local state
      setCourse((prevCourse: any) => ({
        ...prevCourse,
        modules: prevCourse.modules.filter((mod: any) => mod.id !== moduleId)
      }));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  const deleteLesson = async (moduleId: string, lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      console.log('Deleting lesson:', lessonId, 'from module:', moduleId);
      
      // Update local state
      setCourse((prevCourse: any) => ({
        ...prevCourse,
        modules: prevCourse.modules.map((mod: any) =>
          mod.id === moduleId
            ? { ...mod, lessons: mod.lessons?.filter((lesson: any) => lesson.id !== lessonId) || [] }
            : mod
        )
      }));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const addLesson = (moduleId: string) => {
    const newLesson = {
      id: `temp-${Date.now()}`,
      title: 'New Lesson',
      content: '',
      duration: '',
      type: 'video',
      mediaUrl: '',
      notes: [],
      resources: [],
      transcript: [],
      order: 1
    };
    
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      modules: prevCourse.modules.map((mod: any) =>
        mod.id === moduleId
          ? { ...mod, lessons: [...(mod.lessons || []), newLesson] }
          : mod
      )
    }));
    
    // Start editing the new lesson
    startEditingLesson(newLesson);
  };

  if (courseLoading) {
    return (
      <div className="flex min-h-screen bg-white">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <h2 className="text-lg font-semibold text-gray-500">Course View</h2>
          <p className="mt-4 text-center text-gray-600">Loading course...</p>
        </main>
      </div>
    )
  }

  if (courseError || !course) {
    return (
      <div className="flex min-h-screen bg-white">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <h2 className="text-lg font-semibold text-gray-500">Course View</h2>
          <p className="mt-4 text-center text-gray-600">{courseError || "Course not found."}</p>
        </main>
      </div>
    )
  }

  // Calculate total lessons count from modules
  const totalLessons = course.modules?.reduce((total: number, module: any) => {
    return total + (module.lessons?.length || 0);
  }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Course View</h2>
        </header>

        <section className="mb-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Course Statistics</h1>

          {statsLoading ? (
            <div className="text-center text-gray-500 mb-10">Loading statistics...</div>
          ) : statsError ? (
            <div className="text-center text-red-500 mb-10">{statsError}</div>
          ) : statistics ? (
            <>
          <div className="flex items-center justify-center gap-8 mb-10">
                <CourseStatisticItem label="Completion Rate" value={statistics.completionRate} />
                <CourseStatisticItem label="Avg Rating" value={statistics.avgRating} />
                <CourseStatisticItem label="In Progress" value={statistics.dropOffRate} isLast />
          </div>
          <div className="flex items-center justify-center gap-8 mb-10">
                <CourseStatisticItem label="Active Today" value={statistics.activeToday} />
                <CourseStatisticItem label="Avg completion time" value={statistics.avgCompletionTime} />
                <CourseStatisticItem label="Enrollments" value={statistics.enrollments} isLast />
          </div>
            </>
          ) : (
            <div className="text-center text-gray-500 mb-10">No statistics available.</div>
          )}

          <h1 className="text-3xl font-bold mb-6 text-center">Course Overview</h1>

          {course.thumbnailUrl ? (
            <div className="w-full h-[300px] rounded-lg mb-6 overflow-hidden">
              <img 
                src={course.thumbnailUrl} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
          <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500 text-xl font-semibold">
            Course Thumbnail Placeholder
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-bold mb-2">
              {editingCourse ? (
                <Input
                  value={editData.title || ''}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="text-4xl font-bold border-0 p-0 h-auto"
                />
              ) : (
                course.title
              )}
            </h2>
            {!editingCourse && (
              <Button
                variant="outline"
                onClick={startEditingCourse}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Course
              </Button>
            )}
          </div>

          {editingCourse && (
            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={editData.description || ''}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Level</label>
                    <Select value={editData.level || 'beginner'} onValueChange={(value) => setEditData({ ...editData, level: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      value={editData.category || ''}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveCourse} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Course
                  </Button>
                  <Button variant="outline" onClick={cancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span>{totalLessons} Lessons</span>
            <span className="mx-2">•</span>
            <span>{course.duration} minutes</span>
          </div>

          <h3 className="text-xl font-bold mb-2">Course Description</h3>
          <p className="text-muted-foreground mb-8">
            {editingCourse ? (
              <Textarea
                value={editData.description || ''}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                rows={3}
                className="border-0 p-0 bg-transparent"
              />
            ) : (
              <>
            {course.description}
            <Link href="#" className="text-blue-600 hover:underline ml-1">
              Read more
            </Link>
              </>
            )}
          </p>

          <h3 className="text-xl font-bold mb-2">What you'll learn</h3>
          <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-1">
            {course.objectives?.map((objective: string, index: number) => (
              <li key={index}>{objective}</li>
            )) || <li>No learning objectives available.</li>}
          </ul>

          <h3 className="text-xl font-bold mb-4">Modules</h3>
          <Accordion type="single" collapsible className="w-full">
            {course.modules?.map((module: any) => (
              <AccordionItem key={module.id} value={module.id} className="border-b">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline flex justify-between items-start">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      {editingModuleId === module.id ? (
                        <Input
                          value={editData.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="text-lg font-semibold border-0 p-0 h-auto bg-transparent"
                        />
                      ) : (
                        module.title
                      )}
                      {editingModuleId === module.id && (
                        <div className="flex gap-1">
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              saveModule(module.id);
                            }}
                            className="h-6 px-2 bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelEdit();
                            }}
                            className="h-6 px-2"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {editingModuleId !== module.id && (
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingModule(module);
                            }}
                            className="h-6 px-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteModule(module.id);
                            }}
                            className="h-6 px-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {editingModuleId === module.id ? (
                      <Textarea
                        value={editData.description || ''}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        placeholder="Module description..."
                        className="text-sm text-gray-500 font-normal border-0 p-0 h-auto bg-transparent resize-none"
                        rows={2}
                      />
                    ) : (
                      module.description && (
                        <div className="text-sm text-gray-500 font-normal">{module.description}</div>
                      )
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-4 py-2 space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    {module.lessons?.map((lesson: any) => (
                      <AccordionItem key={lesson.id} value={lesson.id} className="border-b border-gray-100">
                        <AccordionTrigger className="text-sm font-medium hover:no-underline flex justify-between items-start">
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              {editingLessonId === lesson.id ? (
                                <Input
                                  value={editData.title || ''}
                                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                  className="text-sm font-medium border-0 p-0 h-auto bg-transparent"
                                />
                              ) : (
                                lesson.title
                              )}
                              {editingLessonId === lesson.id && (
                                <div className="flex gap-1">
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveLesson(lesson.id);
                                    }}
                                    className="h-5 px-2 bg-green-600 hover:bg-green-700"
                                  >
                                    <Save className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      cancelEdit();
                                    }}
                                    className="h-5 px-2"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                              {editingLessonId !== lesson.id && (
                                <div className="flex gap-1">
                                  <Button
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startEditingLesson(lesson);
                                    }}
                                    className="h-5 px-2"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteLesson(module.id, lesson.id);
                                    }}
                                    className="h-5 px-2 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            {editingLessonId === lesson.id ? (
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  value={editData.duration || ''}
                                  onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                                  placeholder="Duration"
                                  className="text-xs text-gray-500 font-normal border-0 p-0 h-auto bg-transparent w-20"
                                />
                                <span className="text-xs text-gray-500">minutes</span>
                                <Select value={editData.type || 'video'} onValueChange={(value) => setEditData({ ...editData, type: value })}>
                                  <SelectTrigger className="h-5 w-24">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="reading">Reading</SelectItem>
                                    <SelectItem value="quiz">Quiz</SelectItem>
                                    <SelectItem value="pdf">PDF</SelectItem>
                                    <SelectItem value="doc">Doc</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            ) : (
                              lesson.duration && (
                                <div className="text-xs text-gray-500 font-normal">{lesson.duration} minutes</div>
                              )
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 py-2 space-y-3">
                          {editingLessonId === lesson.id ? (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Content</label>
                                <Textarea
                                  value={editData.content || ''}
                                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Media URL</label>
                                <Input
                                  value={editData.mediaUrl || ''}
                                  onChange={(e) => setEditData({ ...editData, mediaUrl: e.target.value })}
                                  placeholder="https://example.com/media.mp4"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              {lesson.content && (
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Content:</h4>
                                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{lesson.content}</div>
                                </div>
                              )}
                              {lesson.mediaUrl && (
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Media:</h4>
                                  <div className="text-sm text-gray-600">
                                    {lesson.type === 'video' ? (
                                      <video src={lesson.mediaUrl} controls className="max-w-full h-auto rounded" />
                                    ) : lesson.type === 'image' ? (
                                      <img src={lesson.mediaUrl} alt={lesson.title} className="max-w-full h-auto rounded" />
                                    ) : (
                                      <a href={lesson.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View Media File
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}
                              {lesson.notes && lesson.notes.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes:</h4>
                                  <div className="space-y-2">
                                    {lesson.notes.map((note: any, noteIndex: number) => (
                                      <div key={noteIndex} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                        <div className="font-medium">{note.title}</div>
                                        <div className="mt-1">{note.content}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {lesson.resources && lesson.resources.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Resources:</h4>
                                  <div className="space-y-2">
                                    {lesson.resources.map((resource: any, resourceIndex: number) => (
                                      <div key={resourceIndex} className="text-sm text-gray-600">
                                        <div className="font-medium">{resource.title}</div>
                                        {resource.description && (
                                          <div className="text-gray-500">{resource.description}</div>
                                        )}
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                                          {resource.url}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {lesson.transcript && lesson.transcript.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Transcript:</h4>
                                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
                                    {lesson.transcript.map((line: any, transcriptIndex: number) => (
                                      <div key={transcriptIndex} className="mb-1">
                                        <span className="font-medium">{line.speaker ? `${line.speaker}:` : ''}</span> {line.text || line}
                    </div>
                  ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )) || <div className="text-gray-500">No lessons in this module.</div>}
                  </Accordion>
                 {/* Add Lesson Button */}
                 <div className="mt-4">
                   <Button
                     variant="outline"
                     onClick={() => addLesson(module.id)}
                     className="flex items-center gap-2 text-blue-600 hover:bg-blue-50"
                   >
                     <Plus className="h-4 w-4" />
                     Add Lesson
                   </Button>
                 </div>
                 {/* Quizzes Section */}
                 {module.quizzes && module.quizzes.length > 0 && (
                   <div className="mt-4">
                     <h4 className="text-base font-semibold text-purple-700 mb-2">Quizzes</h4>
                     <Accordion type="single" collapsible className="w-full">
                       {module.quizzes.map((quiz: any) => (
                         <AccordionItem key={quiz.id} value={quiz.id} className="border-b border-gray-100">
                           <AccordionTrigger className="text-sm font-medium hover:no-underline flex justify-between items-start">
                             <div className="flex flex-col items-start">
                               <div>{quiz.title}</div>
                               {quiz.duration !== undefined && (
                                 <div className="text-xs text-gray-500 font-normal">{quiz.duration} minutes</div>
                               )}
                               {quiz.unlockAfter !== undefined && (
                                 <div className="text-xs text-gray-500 font-normal">Unlock After: {quiz.unlockAfter} lessons</div>
                               )}
                             </div>
                           </AccordionTrigger>
                           <AccordionContent className="pl-4 py-2 space-y-3">
                             {quiz.questions && quiz.questions.length > 0 ? (
                               <div>
                                 <h5 className="text-sm font-semibold text-gray-700 mb-2">Questions:</h5>
                                 <ol className="list-decimal list-inside space-y-2">
                                   {quiz.questions.map((q: any, qidx: number) => (
                                     <li key={q.id || qidx}>
                                       <div className="font-medium">{q.prompt}</div>
                                       {q.sampleAnswer && (
                                         <div className="text-xs text-gray-500 mt-1">Sample Answer: {q.sampleAnswer}</div>
                                       )}
                                     </li>
                                   ))}
                                 </ol>
                               </div>
                             ) : <div className="text-gray-500">No questions in this quiz.</div>}
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                     </Accordion>
                   </div>
                 )}
                 {/* Final Assessments Section (at course level, show after lessons/quizzes in first module only) */}
                 {module === course.modules[0] && course.finalAssessments && course.finalAssessments.length > 0 && (
                   <div className="mt-4">
                     <h4 className="text-base font-semibold text-green-700 mb-2">Final Assessments</h4>
                     <Accordion type="single" collapsible className="w-full">
                       {course.finalAssessments.map((fa: any) => (
                         <AccordionItem key={fa.id} value={fa.id} className="border-b border-gray-100">
                           <AccordionTrigger className="text-sm font-medium hover:no-underline flex justify-between items-start">
                             <div className="flex flex-col items-start">
                               <div>{fa.title}</div>
                               {fa.duration !== undefined && (
                                 <div className="text-xs text-gray-500 font-normal">{fa.duration} minutes</div>
                               )}
                               {fa.passingScore !== undefined && (
                                 <div className="text-xs text-gray-500 font-normal">Passing Score: {fa.passingScore}%</div>
                               )}
                             </div>
                           </AccordionTrigger>
                           <AccordionContent className="pl-4 py-2 space-y-3">
                             {fa.questions && fa.questions.length > 0 ? (
                               <div>
                                 <h5 className="text-sm font-semibold text-gray-700 mb-2">Questions:</h5>
                                 <ol className="list-decimal list-inside space-y-2">
                                   {fa.questions.map((q: any, qidx: number) => (
                                     <li key={q.id || qidx}>
                                       <div className="font-medium">{q.prompt}</div>
                                       {q.sampleAnswer && (
                                         <div className="text-xs text-gray-500 mt-1">Sample Answer: {q.sampleAnswer}</div>
                                       )}
                                     </li>
                                   ))}
                                 </ol>
                               </div>
                             ) : <div className="text-gray-500">No questions in this assessment.</div>}
                           </AccordionContent>
                         </AccordionItem>
                       ))}
                     </Accordion>
                   </div>
                 )}
                </AccordionContent>
              </AccordionItem>
            )) || <div className="text-gray-500">No modules available.</div>}
          </Accordion>

          <div className="flex justify-center space-x-4 mt-10">
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
