import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface DashboardHeaderProps {
  userName: string
  currentDate: string
}

export default function DashboardHeader({ userName, currentDate }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800">
        Hello, <span className="font-bold">{userName}</span>, welcome back!
      </h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input type="search" placeholder="Search" className="pl-10 pr-4 py-2 rounded-md border" />
        </div>
        <span className="text-gray-600 text-lg">{currentDate}</span>
      </div>
    </header>
  )
}
