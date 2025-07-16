import TestimonialCard from "./testimonial_cards"
import { Button } from "./ui/button"

export default function StudentSuccessStories() {
  const testimonials = [
    {
      id: "1",
      name: "Marcus John",
      course: "Budgeting Masterclass",
      quote:
        "The Budgeting Masterclass helped me learn how to manage my finances. Through the lessons I learnt from this course, I was able to save up for my new laptop which has helped make my work as a designer easier.",
      rating: 4,
      imageSrc: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "2",
      name: "Sarah Chen",
      course: "Web Development Fundamentals",
      quote:
        "This course was a game-changer! I went from zero coding knowledge to building my first website. The instructors were fantastic and the content was easy to follow.",
      rating: 5,
      imageSrc: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "3",
      name: "David Lee",
      course: "Digital Marketing Strategy",
      quote:
        "I highly recommend this course for anyone looking to boost their online presence. The strategies I learned helped me significantly increase traffic to my small business website.",
      rating: 4,
      imageSrc: "/placeholder.svg?height=64&width=64",
    },
  ]

  return (
    <section className="w-full max-w-[1400px] bg-white rounded-3xl shadow-lg p-8 md:p-16 lg:p-24 mx-auto mt-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Student Success Stories</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Discover how the Uncommon upskilling platform has transformed careers and empowered individuals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
      {/*Call to action section content */}
      <div className="text-center mt-16 pt-8 border-t border-gray-200">
        {" "}
        {/* Added top border for subtle separation */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Your Next Step Begins Here!</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
          This platform was created to help Uncommon alumni keep growing beyond the bootcamp. It fills in the gaps,
          covering soft skills, advanced digital tools, and new career pathways that weren’t fully explored during the
          one-year program. Whether you're refining your communication, boosting your tech skills, or preparing for
          real-world challenges, this space is here to support your next step.
        </p>
        <Button className="bg-uncommonBlue hover:bg-uncommonBlue-dark text-white px-8 py-3 rounded-md text-lg">
          Get Started &gt;&gt;
        </Button>
      </div>

    </section>
  )
}
