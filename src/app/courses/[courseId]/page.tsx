import { useParams } from 'next/navigation';

export default function CourseDetailsPage() {
  const params = useParams();
  return (
    <main>
      <h1>Course Details</h1>
      <p>Details for course: {params.courseId}</p>
    </main>
  );
} 