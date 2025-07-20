import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Share2, Download } from "lucide-react"

export default function CertificatePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      {/* Header - Reusing the landing page header structure */}
      <header className="relative w-full max-w-[1400px] bg-white rounded-b-3xl shadow-lg overflow-hidden flex items-center justify-between px-8 py-4 md:px-16 lg:px-24">
        <div className="text-2xl font-bold text-uncommonBlue-DEFAULT">uncommon</div>
        <nav className="hidden space-x-8 md:flex">
          <Link href="/" className="text-lg font-medium hover:text-uncommonBlue-DEFAULT">
            Home
          </Link>
          <Link href="/courses" className="text-lg font-medium hover:text-uncommonBlue-DEFAULT">
            Courses
          </Link>
          <Link href="#" className="text-lg font-medium hover:text-uncommonBlue-DEFAULT">
            About
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-6 py-2 rounded-md">
            Login
          </Button>
          <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-6 py-2 rounded-md">
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center flex-grow p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Congratulations on completing your course!</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-2">You've worked hard and your dedication has paid off.</p>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Here is your official Certificate of Completion, a recognition of your achievement and new skills.
        </p>

        {/* Certificate Placeholder */}
        <div className="relative w-full max-w-3xl aspect-[4/3] bg-gray-300 rounded-lg shadow-lg overflow-hidden mb-8">
          <Image
            src="/placeholder.svg?height=450&width=600&text=Certificate+Placeholder"
            alt="Certificate of Completion"
            layout="fill"
            objectFit="contain"
            className="p-4" // Add some padding inside the placeholder if needed
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-6 py-3 rounded-md text-lg flex items-center">
            <Share2 className="h-5 w-5 mr-2" /> Share
          </Button>
          <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-6 py-3 rounded-md text-lg flex items-center">
            <Download className="h-5 w-5 mr-2" /> Download
          </Button>
        </div>
      </main>
    </div>
  )
}
