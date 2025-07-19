import { Separator } from "@/components/ui/separator"

interface CourseStatisticItemProps {
  label: string
  value: string | number
  isLast?: boolean
}

export function CourseStatisticItem({ label, value, isLast }: CourseStatisticItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      {!isLast && <Separator orientation="vertical" className="h-12" />}
    </div>
  )
}
