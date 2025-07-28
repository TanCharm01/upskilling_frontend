"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Edit, Trash, ArrowLeft, ArrowRight } from "lucide-react"
import { CourseMetricCard } from "@/components/ui/course-metric-card"
import AdminSidebar from "@/components/AdminSidebar"
import React, { useState, useEffect } from "react"
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
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Course Management</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">Delete, add and manage all platform courses</p>

          <CourseMetricsSection />

          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-9"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 px-4 py-2" onClick={() => router.push("/admin/course-management/new-course") }>
              <span className="flex items-center">New Course <Plus className="h-4 w-4 ml-2" /></span>
            </Button>
          </div>

          <CourseManagementTable searchTerm={searchTerm} />
        </section>
      </main>
    </div>
  )
}

function CourseMetricsSection() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('http://localhost:3001/courses/metrics')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch course metrics');
        return res.json();
      })
      .then(data => setMetrics(data))
      .catch(() => setError('Failed to fetch course metrics'))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="flex items-center justify-center gap-8 mb-8">Loading metrics...</div>;
  if (error) return <div className="flex items-center justify-center gap-8 mb-8 text-red-500">{error}</div>;
  return (
    <div className="flex items-center justify-center gap-8 mb-8">
      {metrics.map((metric, idx) => (
        <CourseMetricCard
          key={metric.label}
          value={metric.value}
          label={metric.label}
          isLast={idx === metrics.length - 1}
        />
      ))}
    </div>
  );
}

function useCourseManagementData() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('http://localhost:3001/courses/management')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then(data => setCourses(data))
      .catch(() => setError('Failed to fetch courses'))
      .finally(() => setLoading(false));
  }, []);
  return { courses, loading, error };
}

function CourseManagementTable({ searchTerm }: { searchTerm: string }) {
  const { courses, loading, error } = useCourseManagementData();
  const [deleteLoading, setDeleteLoading] = useState<{ [key: string]: boolean }>({});
  const [showDeleteModal, setShowDeleteModal] = useState<{ [key: string]: boolean }>({});
  const [coursesData, setCoursesData] = useState<any[]>([]);
  const router = useRouter();

  // Update local courses data when API data changes
  useEffect(() => {
    if (courses.length > 0) {
      setCoursesData(courses);
    }
  }, [courses]);

  const handleDeleteCourse = async (courseId: string) => {
    setDeleteLoading(prev => ({ ...prev, [courseId]: true }));
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:3001/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Remove the course from local state
      setCoursesData(prev => prev.filter(course => course.id !== courseId));
      setShowDeleteModal(prev => ({ ...prev, [courseId]: false }));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const filteredCourses = coursesData.filter((course: any) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (loading) return <div className="p-8 text-center">Loading courses...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students Enrolled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCourses.map((course: any) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 hover:underline cursor-pointer">
                  <a href={`/admin/course-management/${course.id}`}>{course.name}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.studentsEnrolled}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {course.published ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Published</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => window.location.href = `/admin/course-management/${course.id}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDeleteModal(prev => ({ ...prev, [course.id]: true }))}
                      disabled={deleteLoading[course.id]}
                      className="text-red-500 hover:bg-red-100"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {Object.keys(showDeleteModal).map(courseId => 
        showDeleteModal[courseId] && (
          <div key={courseId} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Delete Course</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this course? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteModal(prev => ({ ...prev, [courseId]: false }))}
                  disabled={deleteLoading[courseId]}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleDeleteCourse(courseId)}
                  disabled={deleteLoading[courseId]}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleteLoading[courseId] ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
