import { useParams } from 'next/navigation';

export default function CourseAssessmentPage() {
  const params = useParams();
  return (
    <main>
      <h1>Assessment</h1>
      <p>Assessment for course: {params.courseId}</p>
    </main>
  );
} 