"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from 'next/navigation';

export default function CourseCatalogPage() {
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

  const courses = [
    {
      title: "Building A Growth Mindset",
      lessons: "24 Lessons",
      time: "2h 30m",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
    },
    // ... repeat or add more courses as needed ...
    {
      title: "Building A Growth Mindset",
      lessons: "24 Lessons",
      time: "2h 30m",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
    },
    {
      title: "Building A Growth Mindset",
      lessons: "24 Lessons",
      time: "2h 30m",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
    },
    {
      title: "Building A Growth Mindset",
      lessons: "24 Lessons",
      time: "2h 30m",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
    },
    {
      title: "Building A Growth Mindset",
      lessons: "24 Lessons",
      time: "2h 30m",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
    },
    {
      title: "Building A Growth Mindset",
      lessons: "24 Lessons",
      time: "2h 30m",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
    },
  ];

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
              <Button variant="outline" className="rounded-full bg-transparent">
                Sign up
              </Button>
              <Button className="rounded-full bg-gray-900 hover:bg-gray-800">Log in</Button>
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
            {courses.map((course, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{course.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{course.lessons}</span>
                    <span>{course.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{course.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full rounded-md border-gray-300 text-white bg-[#0747A1] hover:bg-[#053674]"
                  >
                    Enroll
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-left">
            <Button variant="outline" className="rounded-md bg-transparent">
              Show 6 more
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 