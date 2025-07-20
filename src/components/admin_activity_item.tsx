import Image from "next/image"
import { Circle } from "lucide-react" // Using Circle as a generic icon for activity status

interface AdminActivityItemProps {
  userName: string
  activityType: string
  timeAgo: string
  avatarSrc: string
}

export default function AdminActivityItem({ userName, activityType, timeAgo, avatarSrc }: AdminActivityItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image
            src={avatarSrc || "/placeholder.svg?height=40&width=40&text=User"}
            alt={`Avatar of ${userName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-base font-medium text-gray-800">{userName}</p>
          <p className="text-sm text-gray-500">{activityType}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">{timeAgo}</span>
        <Circle className="h-4 w-4 text-gray-300" /> {/* Placeholder icon */}
      </div>
    </div>
  )
}
