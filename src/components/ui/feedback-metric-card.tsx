import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeedbackMetricCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  valueColor?: string
}

export function FeedbackMetricCard({ title, value, description, icon: Icon, valueColor }: FeedbackMetricCardProps) {
  return (
    <Card className="flex-1 min-w-[280px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
