import type React from "react"
import { Info } from "lucide-react"

interface AdminStatCardProps {
  title: string
  value: string | number
  percentageChange: string
  icon: React.ElementType
}

export default function AdminStatCard({ title, value, percentageChange, icon: Icon }: AdminStatCardProps) {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium text-gray-600">{title}</h3>
        <Info className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-green-600 font-medium">{percentageChange}</span> from last month
      </p>
    </div>
  )
}
