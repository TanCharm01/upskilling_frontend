"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { decodeJWT } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CourseCatalogPage() {
  const [user, setUser] = useState<{ name?: string; avatar?: string; tagline?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUser() {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:3001/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        // fallback to JWT decode if fetch fails
        const userInfo = decodeJWT(token);
        setUser(userInfo);
        setError("Could not fetch full user profile, using token info only.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:3001/courses/catalog");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const filterCategories = [
    "All",
    "Most Popular",
    "Career Skills",
    "Money Matters",
    "Communication Skills",
    "Digital Tools",
    "Personal Growth",
    "Interviews",
  ];
  const additionalCategories = ["Personal Growth", "Money Matters", "View more categories"];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">uncommon</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  View Jobs
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Find Talent
                </a>
                <a href="#" className="text-gray-900 font-medium">
                  Courses
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-full" />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: user?.avatar ? undefined : '#0747A1' }}>
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="h-10 w-10 object-cover"
                      />
                    ) : (
                      <span className="text-white text-lg font-semibold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Courses Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Courses</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Section */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">Filter by category</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {filterCategories.map((category, index) => (
                <Badge
                  key={index}
                  variant={category === "All" ? "default" : "secondary"}
                  className={`px-4 py-2 rounded-full cursor-pointer ${
                    category === "All"
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {additionalCategories.map((category, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 rounded-full cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Most Popular Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Most Popular</h2>
            <span className="text-sm text-gray-500">(18 results)</span>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {loading ? (
              <div className="col-span-full text-center py-12 text-gray-500">Loading courses...</div>
            ) : error ? (
              <div className="col-span-full text-center py-12 text-red-500">{error}</div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">No courses found.</div>
            ) : (
              courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
                  onClick={() => router.push(`/courses/${course.id}/content`)}
                >
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{course.title}</CardTitle>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{course.totalLessons} Lessons</span>
                        <span>{Math.round(course.duration / 60) > 0 ? `${Math.floor(course.duration / 60)}h ` : ''}{course.duration % 60}m</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{course.description}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 mt-auto">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          router.push(`/courses/${course.id}/content`);
                        }}
                        className="w-full rounded-md border-gray-300 text-white bg-[#0747A1] hover:bg-[#053674] px-4 py-2"
                      >
                        Enroll
                      </button>
                    </CardFooter>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Show More Button */}
          <div className="text-left">
            <Button variant="outline" className="rounded-md bg-transparent">
              Show more
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 