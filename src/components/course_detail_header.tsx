import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Assuming Avatar is available from shadcn/ui

export default function CourseDetailHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="text-2xl font-bold text-uncommonBlue-DEFAULT">uncommon</div>
      <nav className="hidden space-x-8 md:flex">
        <Link href="#" className="text-lg font-medium text-gray-700 hover:text-uncommonBlue-DEFAULT">
          View Jobs
        </Link>
        <Link href="#" className="text-lg font-medium text-gray-700 hover:text-uncommonBlue-DEFAULT">
          Find Talent
        </Link>
        <Link href="/courses" className="text-lg font-medium text-uncommonBlue-DEFAULT">
          Courses
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Button className="bg-headerGrey-DEFAULT hover:bg-headerGrey-dark text-headerGrey-text px-6 py-2 rounded-md">
          Signup
        </Button>
        <Button className="bg-headerGrey-DEFAULT hover:bg-headerGrey-dark text-headerGrey-text px-6 py-2 rounded-md">
          Login
        </Button>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User profile" />
          <AvatarFallback>DA</AvatarFallback>
        </Avatar>
        <span className="text-gray-700 font-medium">Daisy</span>
      </div>
    </header>
  )
}
