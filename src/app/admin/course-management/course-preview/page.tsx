"use client"

import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function getCourseData() {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem('newCourseData');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function getModulesData() {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem('newModulesData');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export default function CoursePreview() {
  const router = useRouter();
  const [courseData, setCourseData] = useState<any>(null);
  const [modulesData, setModulesData] = useState<any[]>([]);

  useEffect(() => {
    setCourseData(getCourseData());
    setModulesData(getModulesData());
  }, []);

  // Fallback dummy data if nothing in storage
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
    modules: [],
    previewUrl: null,
  };

  const displayCourse = courseData || dummyCourseData;
  const displayModules: any[] = (modulesData && Array.isArray(modulesData)) ? modulesData : dummyCourseData.modules;

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Course Preview</h2>
        </header>

        <section className="mb-8 max-w-3xl mx-auto">
          <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500 text-xl font-semibold overflow-hidden">
            {displayCourse.previewUrl ? (
              <img src={displayCourse.previewUrl} alt="Course Thumbnail" className="object-contain h-full w-full" />
            ) : (
              'Course Thumbnail Placeholder'
            )}
          </div>

          <h1 className="text-4xl font-bold mb-2">{displayCourse.title}</h1>
          {/* Optionally, you can calculate lessons count and duration from modulesData */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span>
              {displayModules && Array.isArray(displayModules)
                ? displayModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
                : 0} Lessons
            </span>
            {/* <span className="mx-2">•</span>
            <span>{dummyCourseData.totalDuration}</span> */}
          </div>

          <h2 className="text-xl font-bold mb-2">Course Description</h2>
          <p className="text-muted-foreground mb-8">
            {displayCourse.description}
          </p>

          {/* Course Learning Objectives Section */}
          <h2 className="text-xl font-bold mb-2">What you'll learn</h2>
          <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-1">
            {displayCourse.learningObjectives && displayCourse.learningObjectives.length > 0
              ? displayCourse.learningObjectives.map((objective: string, index: number) => (
                  <li key={index}>{objective}</li>
                ))
              : <li>No objectives provided.</li>}
          </ul>

          <h2 className="text-xl font-bold mb-4">Modules</h2>
          <Accordion type="single" collapsible className="w-full">
            {displayModules && Array.isArray(displayModules) && displayModules.length > 0 ? (
              displayModules.map((module: any, idx: number) => (
                <AccordionItem key={module.id || idx} value={String(module.id || idx)} className="border-b">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {module.title || `Module ${idx + 1}`}
                  </AccordionTrigger>
                  <AccordionContent className="pl-4 py-2 space-y-4">
                    {module.lessons && module.lessons.length > 0 ? (
                      module.lessons.map((lesson: any, lidx: number) => (
                        <div key={lesson.id || lidx} className="border rounded-lg p-4 mb-2 bg-gray-50">
                          <div className="font-semibold text-lg mb-1">{lesson.title || `Lesson ${lidx + 1}`}</div>
                          {lesson.notes && <div className="mb-1"><span className="font-medium">Notes:</span> {lesson.notes}</div>}
                          {lesson.duration && <div className="mb-1"><span className="font-medium">Duration:</span> {lesson.duration} min</div>}
                          {lesson.additionalResources && lesson.additionalResources.length > 0 && (
                            <div className="mb-1">
                              <span className="font-medium">Resources:</span>
                              <ul className="list-disc list-inside ml-4">
                                {lesson.additionalResources.map((res: any, ridx: number) => (
                                  <li key={ridx}>
                                    {res.title && <span className="font-semibold">{res.title}: </span>}
                                    {res.link && <a href={res.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{res.link}</a>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {lesson.fileName && (
                            <div className="mb-1">
                              <span className="font-medium">Media:</span> {lesson.fileName} ({lesson.fileType}, {lesson.fileSize})
                              {lesson.fileType === 'image' && lesson.filePreviewUrl && (
                                <div className="mt-2"><img src={lesson.filePreviewUrl} alt={lesson.fileName} className="max-h-40 rounded" /></div>
                              )}
                              {lesson.fileType === 'video' && lesson.filePreviewUrl && (
                                <div className="mt-2"><video src={lesson.filePreviewUrl} controls className="max-h-40 rounded" /></div>
                              )}
                              {lesson.fileType === 'pdf' && lesson.filePreviewUrl && (
                                <div className="mt-2"><a href={lesson.filePreviewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PDF</a></div>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground">No lessons</div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-muted-foreground px-4 py-2">No modules added.</div>
            )}
          </Accordion>

          <div className="flex justify-center space-x-4 mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Publish Course</Button>
            <Button variant="outline" className="bg-transparent flex items-center justify-center gap-2" onClick={() => router.back()}>
              <Edit className="h-4 w-4" />
              <span>Back to edit course</span>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
