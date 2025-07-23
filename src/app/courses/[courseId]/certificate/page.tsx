import { useParams } from 'next/navigation';

export default function CourseCertificatePage() {
  const params = useParams();
  return (
    <main>
      <h1>Certificate</h1>
      <p>Certificate for course: {params.courseId}</p>
    </main>
  );
} 