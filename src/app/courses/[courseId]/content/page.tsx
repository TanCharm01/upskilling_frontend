import { useParams } from 'next/navigation';

export default function CourseContentPage() {
  const params = useParams();
  return (
    <main>
      <h1>Course Content</h1>
      <p>Modules & Lessons for course: {params.courseId}</p>
    </main>
  );
} 