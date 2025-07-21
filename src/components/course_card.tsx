import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  title: string
  imageSrc: string
  lessons?: number
  duration?: string
  description?: string
  progress?: number // New optional prop for dashboard cards
}

export default function CourseCard({ title, lessons, duration, description, imageSrc, progress }: CourseCardProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-white text-card-foreground shadow-sm overflow-hidden min-h-[400px]">
      <div className="flex justify-center items-center p-4">
  <div className="bg-gray-200 rounded-lg p-2">
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={`Image for ${title}`}
      width={320} 
      height={140}
      className="object-contain rounded-md"
    />
  </div>
</div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {progress !== undefined ? (
          // Dashboard specific content
          <>
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span>{progress}%</span>
              <div className="flex-grow h-2 bg-gray-200 rounded-full ml-2">
                <div className="h-full bg-uncommonBlue rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <Button className="w-full bg-uncommonBlue hover:bg-uncommonBlue text-white">Resume</Button>
          </>
        ) : (
          // Browse courses specific content
          <>
            <div className="flex justify-between text-sm text-gray-600 mb-3">
              <span>{lessons} Lessons</span>
              <span>{duration}</span>
            </div>
            <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>
            <Button className="w-full bg-uncommonBlue hover:bg-uncommonBlue-dark text-white">Enrol</Button>
          </>
        )}
      </div>
    </div>
  )
}
