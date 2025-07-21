import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import BrowseCourses from "@/components/browse_courses" // Import the new component
import StudentSuccessStories from "@/components/success_stories"

export default function LandingPage() {
  return (
    <div>
      {/* Main white card container for Hero Section */}
        {/* Header */}
        <header className="flex items-center justify-between w-full">
          <div className="text-2xl font-bold text-uncommonBlue">uncommon</div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#" className="text-lg font-medium hover:text-uncommonBlue">
              Home
            </Link>
            <Link href="#" className="text-lg font-medium hover:text-uncommonBlue">
              Courses
            </Link>
            <Link href="#" className="text-lg font-medium hover:text-uncommonBlue">
              About
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-6 py-2 rounded-md">
              Login
            </Button>
            <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-6 py-2 rounded-md">
              Sign Up
            </Button>
          </div>
        </header>

        {/* Hero Section - Grid for content and image */}
        <main className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Left Content */}
          <div className="col-span-2 space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight">
              continue your uncommon journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Enhance your employability with our upskilling courses.
            </p>
            <div className="flex justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-4 py-5 rounded-md text-xs">
                Know More &gt;&gt;
              </Button>
              <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-4 py-5 rounded-md text-xs">
                Get Started &gt;&gt;
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 pt-8">
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold">1100+</span>
                <span className="text-gray-600">Active Students</span>
              </div>
              <div className="h-16 w-1 bg-black hidden sm:block" /> {/* Vertical divider */}
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold">100+</span>
                <span className="text-gray-600">Courses</span>
              </div>
              <div className="h-16 w-1  bg-black hidden sm:block" /> {/* Vertical divider */}
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold">10+</span>
                <span className="text-gray-600">Course Categories</span>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder (with frame) */}
          <div className="py-12">
            <Image
              src="/hero_image.avif"
              alt="Placeholder for student image"
              width={480}
              height={600}
              className="object-cover object-top h-full w-full rounded-lg "
            />
          </div>
        </main>

      {/* Browse Courses Section */}
      <BrowseCourses />
      {/* Student Success Stories Section */}
      <StudentSuccessStories />
    </div>
  )
}
