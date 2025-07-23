import CourseCard from "@/components/ui/course_card"
import Pagination from "@/components/ui/pagination"
import { FC } from "react"

type BrowseCoursesProps = {
  courses?: any[];
  stats?: any;
  onRequireLogin?: () => void;
};

const BrowseCourses: FC<BrowseCoursesProps> = ({ courses = [], stats, onRequireLogin }) => {
  return (
    <section className="w-full max-w-[1400px] bg-white mt-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-medium mb-4">Browse Courses</h2>
        <p className="text-lg md:text-xl text-gray-700">
          Explore a wide range of courses designed to help you learn new skills and advance your career.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No courses available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} onRequireLogin={onRequireLogin} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BrowseCourses