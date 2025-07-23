import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface CourseCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  totalLessons?: number;
  duration?: string;
  description?: string;
  progress?: number; // New optional prop for dashboard cards
  onRequireLogin?: () => void;
}

export default function CourseCard({ id, title, totalLessons, duration, description, thumbnailUrl, progress, onRequireLogin }: CourseCardProps) {
  const router = useRouter();
  const handleEnrol = useCallback(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        if (onRequireLogin) onRequireLogin();
        return;
      }
      router.push(`/courses/${id}/content`);
    }
  }, [id, onRequireLogin, router]);
  return (
    <div className="flex flex-col rounded-lg border bg-white text-card-foreground shadow-sm overflow-hidden min-h-[400px]">
      <div className="w-full h-[170px] bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={`Image for ${title}`}
          className="object-cover w-full h-full rounded-t-lg"
          loading="lazy"
        />
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
              <span>{
                typeof totalLessons === 'number'
                  ? `${totalLessons} Lesson${totalLessons === 1 ? '' : 's'}`
                  : '0 Lessons'
              }</span>
              <span>{duration} mins</span>
            </div>
            <p className="text-gray-700 text-sm mb-4 flex-grow">{description}</p>
            <Button className="w-full bg-uncommonBlue hover:bg-uncommonBlue-dark text-white" onClick={handleEnrol}>Enrol</Button>
          </>
        )}
      </div>
    </div>
  )
}