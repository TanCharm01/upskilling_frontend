import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  course: string
  quote: string
  rating: number // e.g., 4 for 4 stars
  imageSrc: string
}

export default function TestimonialCard({ name, course, quote, rating, imageSrc }: TestimonialCardProps) {
  return (
    <div className="w-[380px] flex flex-col items-start p-8 bg-white rounded-lg shadow-md h-[295px]">
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-10">
          <Image
            src={imageSrc || "/placeholder.svg?height=64&width=64"}
            alt={`Profile picture of ${name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg" // Apply rounded corners to the image itself
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600 text-sm">{course}</p>
        </div>
      </div>
      <p className="text-gray-800 text-base italic mb-4">
        {'"'}
        {quote}
        {'"'}
      </p>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    </div>
  )
}