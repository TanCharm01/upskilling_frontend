import { Play, Volume2, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoPlayerPlaceholder() {
  return (
    <div className="relative w-full bg-gray-200 aspect-video rounded-lg overflow-hidden">
      {/* Placeholder for video content */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl">
        Video Player Placeholder
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 p-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <Play className="h-6 w-6" />
        </Button>
        <div className="flex-grow mx-4 h-2 bg-gray-600 rounded-full">
          <div className="h-full w-1/3 bg-white rounded-full" /> {/* Progress bar */}
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <Volume2 className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700 ml-2">
          <Maximize className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
