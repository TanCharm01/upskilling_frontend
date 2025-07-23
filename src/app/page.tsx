import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import BrowseCourses from "@/components/ui/browse_courses" // Import the new component
import StudentSuccessStories from "@/components/ui/success_stories"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
      {/* Main white card container for Hero Section */}
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between w-full py-6">
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
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/auth">
              <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-6 py-2 rounded-md">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-6 py-2 rounded-md">
                Sign Up
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section - Grid for content and image */}
        <main className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 pb-20 mt-10">
          {/* Left Content */}
          <div className="col-span-2 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight">
              continue your uncommon journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Enhance your employability with our upskilling courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-4 py-5 rounded-md text-xs">
                Know More &gt;&gt;
              </Button>
              <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-4 py-5 rounded-md text-xs">
                Get Started &gt;&gt;
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-8 pt-8 w-full">
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
          <div className="p-8 h-[400px] w-full md:w-[400px] flex items-center justify-center overflow-hidden rounded-lg mx-auto">
            <Image
              src="/hero_image.avif"
              alt="Placeholder for student image"
              width={500}
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
    </div>
  )
}