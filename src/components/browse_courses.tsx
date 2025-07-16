import CourseCard from "./course_card"
import Pagination from "./pagination"

export default function BrowseCourses() {
  const courses = [
    {
      id: "1",
      title: "Building A Growth Mindset",
      lessons: 24,
      duration: "1 hr 30 min",
      description:
        "Get ready for the world of work. Whether you're crafting your first CV or preparing for interviews, this track gives you the practical tools to stand out in any hiring process.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "2",
      title: "Introduction to Web Development",
      lessons: 18,
      duration: "2 hr 00 min",
      description:
        "Learn the fundamentals of web development, including HTML, CSS, and JavaScript. Build your first interactive web pages.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "3",
      title: "Data Science for Beginners",
      lessons: 30,
      duration: "3 hr 15 min",
      description:
        "Dive into the world of data science. Understand data analysis, visualization, and basic machine learning concepts.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "4",
      title: "Mobile App Design Principles",
      lessons: 20,
      duration: "1 hr 45 min",
      description:
        "Master the art of designing user-friendly mobile applications. Learn about UI/UX best practices and prototyping.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "5",
      title: "Digital Marketing Essentials",
      lessons: 28,
      duration: "2 hr 30 min",
      description:
        "Explore the core concepts of digital marketing, including SEO, social media, and content marketing strategies.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "6",
      title: "Cloud Computing Fundamentals",
      lessons: 22,
      duration: "1 hr 50 min",
      description:
        "Understand the basics of cloud computing, different service models, and popular cloud platforms like AWS and Azure.",
      imageSrc: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <section className="w-full max-w-[1400px] bg-white rounded-3xl shadow-lg mx-auto mt-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-medium mb-4">Browse Courses</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Explore a wide range of courses designed to help you learn new skills and advance your career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

     
    </section>
  )
}
