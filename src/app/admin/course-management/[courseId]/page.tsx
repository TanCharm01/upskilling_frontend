"use client"

// import { AppSidebar } from "@/components/app-sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Edit } from "lucide-react"
import Link from "next/link"
import { CourseStatisticItem } from "@/components/course-statistic-item"
import React, { useEffect, useState } from "react";

export default function CourseViewPage({ params }: { params: Promise<{ courseId: string }> }) {
  // --- Course data state and fetch logic ---
  const [course, setCourse] = useState<any>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState<string | null>(null);

  // --- Statistics state and fetch logic ---
  const [statistics, setStatistics] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Unwrap params Promise
  const { courseId } = React.use(params);

  // Fetch course data on mount
  useEffect(() => {
    async function fetchCourseData() {
      setCourseLoading(true);
      setCourseError(null);
      try {
        const res = await fetch(`http://localhost:3001/courses/${courseId}/content/admin`);
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
        const res = await fetch(`http://localhost:3001/courses/${courseId}/statistics`);
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

          <h2 className="text-4xl font-bold mb-2">{course.title}</h2>
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span>{totalLessons} Lessons</span>
            <span className="mx-2">•</span>
            <span>{course.duration} minutes</span>
          </div>

          <h3 className="text-xl font-bold mb-2">Course Description</h3>
          <p className="text-muted-foreground mb-8">
            {course.description}
            <Link href="#" className="text-blue-600 hover:underline ml-1">
              Read more
            </Link>
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
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {module.title}
                  {module.description && (
                    <span className="text-sm text-gray-500 ml-2">({module.description})</span>
                  )}
                </AccordionTrigger>
                <AccordionContent className="pl-4 py-2 space-y-2">
                  {module.lessons?.map((lesson: any) => (
                    <div key={lesson.id} className="text-muted-foreground">
                      <div className="font-medium">{lesson.title}</div>
                      {lesson.content && (
                        <div className="text-sm text-gray-500 mt-1">{lesson.content.substring(0, 100)}...</div>
                      )}
                    </div>
                  )) || <div className="text-gray-500">No lessons in this module.</div>}
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
