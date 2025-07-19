"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Edit, Trash, ArrowLeft, ArrowRight } from "lucide-react"
import { CourseMetricCard } from "@/components/ui/course-metric-card"
import AdminSidebar from "@/components/AdminSidebar"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

// Dummy data for course table
const coursesData = [
  {
    id: "1",
    name: "Money Matters",
    studentsEnrolled: 231,
    lastUpdated: "March 3, 2025",
    category: "career skills",
    published: true,
  },
  {
    id: "2",
    name: "Building a Growth Mindset",
    studentsEnrolled: 57,
    lastUpdated: "March 3, 2025",
    category: "financial literacy",
    published: true,
  },
  {
    id: "3",
    name: "Speak with Impact",
    studentsEnrolled: 57,
    lastUpdated: "March 3, 2025",
    category: "Technical skills",
    published: true,
  },
  {
    id: "4",
    name: "Money Matters",
    studentsEnrolled: 102,
    lastUpdated: "March 3, 2025",
    category: "Speaking",
    published: true,
  },
  {
    id: "5",
    name: "Building a Growth Mindset",
    studentsEnrolled: 64,
    lastUpdated: "March 3, 2025",
    category: "Professionalism",
    published: true,
  },
  {
    id: "6",
    name: "Speak with Impact",
    studentsEnrolled: 34,
    lastUpdated: "March 3, 2025",
    category: "business etiquette",
    published: true,
  },
]

export default function CourseManagement() {
  const [publishedStates, setPublishedStates] = useState(coursesData.map(course => course.published));
  const router = useRouter();

  const handleToggle = (index: number) => {
    setPublishedStates(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
       

        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Course Management</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">Delete, add and manage all platform courses</p>

          <div className="flex items-center justify-center gap-8 mb-8">
            <CourseMetricCard value="1100" label="Total Enrollment" />
            <CourseMetricCard value="100" label="Total Courses" />
            <CourseMetricCard value="68%" label="Avg Completion Rate" isLast />
          </div>

          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 px-4 py-2" onClick={() => router.push("/admin/course-management/new-course") }>
              <span className="flex items-center">New Course <Plus className="h-4 w-4 ml-2" /></span>
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Course Name</TableHead>
                      <TableHead>Students Enrolled</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Publish</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coursesData.map((course, idx) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.studentsEnrolled}</TableCell>
                        <TableCell>{course.lastUpdated}</TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                          <Switch checked={publishedStates[idx]} onChange={() => handleToggle(idx)} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <div className="flex items-center justify-between p-4 border-t">
              <Button variant="outline" disabled className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline">
                  2
                </Button>
                <Button variant="outline">
                  3
                </Button>
                <span className="text-sm text-muted-foreground">...</span>
                <Button variant="outline">
                  7
                </Button>
                <Button variant="outline">
                  8
                </Button>
                <Button variant="outline">
                  9
                </Button>
              </div>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
