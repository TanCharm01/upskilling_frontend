import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  course: string
  quote: string
  rating: number // e.g., 4 for 4 stars
  avatar: string
}

export default function TestimonialCard({ name, course, quote, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="w-[380px] flex flex-col items-start p-8 bg-white rounded-lg shadow-md h-[295px]">
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-10 flex items-center justify-center bg-amber-700">
          {avatar ? (
            <Image
              src={avatar}
              alt={`Profile picture of ${name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <span className="text-amber-50 text-2xl font-bold">
              {(() => {
                if (!name) return '?';
                const words = name.trim().split(' ');
                if (words.length === 1) return words[0].charAt(0).toUpperCase();
                return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
              })()}
            </span>
          )}
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