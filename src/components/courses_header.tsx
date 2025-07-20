import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CoursesHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 md:px-16 lg:px-24 w-full max-w-[1400px] bg-white rounded-t-3xl">
      <div className="text-2xl font-bold text-uncommonBlue-DEFAULT">uncommon</div>
      <nav className="hidden space-x-8 md:flex">
        <Link href="#" className="text-lg font-medium text-gray-700 hover:text-uncommonBlue-DEFAULT">
          View Jobs
        </Link>
        <Link href="#" className="text-lg font-medium text-gray-700 hover:text-uncommonBlue-DEFAULT">
          Find Talent
        </Link>
        <Link href="/courses" className="text-lg font-bold text-uncommonBlue-DEFAULT">
          Courses
        </Link>
      </nav>
      <div className="flex space-x-4">
        <Button className="bg-headerGrey-DEFAULT hover:bg-headerGrey-dark text-headerGrey-text px-6 py-2 rounded-md">
          Signup
        </Button>
        <Button className="bg-headerGrey-DEFAULT hover:bg-headerGrey-dark text-headerGrey-text px-6 py-2 rounded-md">
          Login
        </Button>
      </div>
    </header>
  )
}
