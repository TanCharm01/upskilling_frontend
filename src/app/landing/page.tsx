import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Main white card container */}
      <div className="relative w-full max-w-[1400px] bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 md:px-16 lg:px-24">
          <div className="text-2xl font-bold text-uncommonBlue">uncommon</div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#" className="text-lg font-medium hover:text-uncommonBlue-DEFAULT">
              Home
            </Link>
            <Link href="#" className="text-lg font-medium hover:text-uncommonBlue-DEFAULT">
              Courses
            </Link>
            <Link href="#" className="text-lg font-medium hover:text-uncommonBlue-DEFAULT">
              About
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md">
              Login
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md">
              Sign Up
            </Button>
          </div>
        </header>

        {/* Hero Section - Grid for content and image */}
        <main className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="px-8 py-12 md:px-16 md:py-20 lg:px-24 lg:py-24 flex flex-col space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              continue your <br /> uncommon journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-lg">
              Enhance your employability with our upskilling courses.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md">
                Know More &gt;&gt;
              </Button>
              <Button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md">
                Get Started &gt;&gt;
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 pt-8">
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold">1100+</span>
                <span className="text-gray-600">Active Students</span>
              </div>
              <div className="h-16 w-px bg-gray-300 hidden sm:block" /> {/* Vertical divider */}
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold">100+</span>
                <span className="text-gray-600">Courses</span>
              </div>
              <div className="h-16 w-px bg-gray-300 hidden sm:block" /> {/* Vertical divider */}
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold">10+</span>
                <span className="text-gray-600">Course Categories</span>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder (with frame) */}
          <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-r-3xl rounded-l-none overflow-hidden">
            <Image
              src="/hero_image.avif"
              alt="Placeholder for student image"
              width={480}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
