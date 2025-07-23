import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CourseNavbar = () => (
  <header className="bg-white border-b-0 px-6 py-4 w-full fixed top-0 left-0 right-0 z-50">
    <div className="flex items-center justify-between w-full">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          uncommon
        </Link>
      </div>
      {/* Center: Nav Links */}
      <nav className="flex-1 flex justify-center space-x-6">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          View Jobs
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Find Talent
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Courses
        </a>
      </nav>
      {/* Right: User */}
      <div className="flex-1 flex justify-end items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">Daisy</span>
      </div>
    </div>
    <div className="w-full border-b border-gray-100 absolute left-0 right-0 bottom-0" />
  </header>
)

export default CourseNavbar 