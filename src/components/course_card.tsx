import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  title: string
  lessons: number
  duration: string
  description: string
  imageSrc: string
}

export default function CourseCard({ title, lessons, duration, description, imageSrc }: CourseCardProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="relative w-full aspect-video bg-gray-200">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={`Image for ${title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span>{lessons} Lessons</span>
          <span className="mx-2">•</span>
          <span>{duration}</span>
        </div>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>
        <Button className="w-full bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white">Enrol</Button>
      </div>
    </div>
  )
}
