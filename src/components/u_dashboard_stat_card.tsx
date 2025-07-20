import { Book, Award } from "lucide-react"

interface DashboardStatCardProps {
  type: "courses" | "hours" | "certificates"
  value: number
  label: string
}

export default function DashboardStatCard({ type, value, label }: DashboardStatCardProps) {
  const isHoursCard = type === "hours"

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-center
        ${isHoursCard ? "bg-statGrey-DEFAULT text-statGrey-text" : "bg-white text-gray-800"}`}
    >
      {type === "courses" && <Book className="h-12 w-12 mb-2 text-gray-600" />}
      {type === "certificates" && <Award className="h-12 w-12 mb-2 text-yellow-500 fill-yellow-500" />}
      <span className={`text-4xl font-bold ${isHoursCard ? "text-statGrey-text" : "text-gray-900"}`}>{value}</span>
      <span className={`text-lg ${isHoursCard ? "text-statGrey-text" : "text-gray-600"}`}>{label}</span>
    </div>
  )
}
