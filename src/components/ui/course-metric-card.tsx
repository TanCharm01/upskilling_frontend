import { Separator } from "@/components/ui/separator"

interface CourseMetricCardProps {
  value: string | number
  label: string
  isLast?: boolean
}

export function CourseMetricCard({ value, label, isLast }: CourseMetricCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      {!isLast && <Separator orientation="vertical" className="h-12" />}
    </div>
  )
}
