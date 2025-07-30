"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { decodeJWT, buildApiUrl } from "@/lib/utils";
import CourseNavbar from "@/components/CourseNavbar";
import { ChevronLeft } from "lucide-react";

export default function FinalAssessmentReviewPage() {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const [userId, setUserId] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [review, setReview] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const userInfo = decodeJWT(token);
        setUserId(userInfo?.id || null);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch the assessmentId (finalAssessment.id) if available
    async function fetchAssessmentId() {
      try {
        const res = await fetch(buildApiUrl(`courses/${courseId}/content?userId=${userId}`));
        if (!res.ok) throw new Error("Failed to fetch course content");
        const data = await res.json();
        if (data.finalAssessment && data.finalAssessment.id) {
          setAssessmentId(data.finalAssessment.id);
        } else {
          setAssessmentId(courseId); // fallback
        }
      } catch {
        setAssessmentId(courseId); // fallback
      }
    }
    if (courseId && userId) fetchAssessmentId();
  }, [courseId, userId]);

  useEffect(() => {
    async function fetchReview() {
      setLoading(true);
      setError("");
      try {
        if (!assessmentId || !userId) return;
        const res = await fetch(buildApiUrl(`final-assessments/submission/${userId}/${assessmentId}`));
        if (!res.ok) throw new Error("Failed to fetch assessment review");
        const data = await res.json();
        setReview(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch assessment review");
      } finally {
        setLoading(false);
      }
    }
    if (assessmentId && userId) fetchReview();
  }, [assessmentId, userId]);

  return (
    <>
      <CourseNavbar />
      <div className="pt-[72px] max-w-3xl w-full mx-auto px-2 md:px-8">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push(`/courses/${courseId}/learn`);
              }
            }}
            className="inline-flex items-center px-3 py-2 rounded hover:bg-gray-100 transition-colors text-gray-600 text-sm font-medium"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </button>
        </div>
        {loading ? (
          <div className="text-gray-500">Loading review...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : review ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{review.title || "Final Assessment Review"}</h1>
            <div className="mb-4 text-gray-600 text-sm">Completed at: {review.completedAt ? new Date(review.completedAt).toLocaleString() : "-"}</div>
            <div className="mb-4 text-lg font-semibold">
              Overall Score: {typeof review.score === 'number' ? review.score : 0} / {Array.isArray(review.results) ? review.results.length : 0}
              <span className={`ml-4 px-3 py-1 rounded text-white text-sm font-bold ${review.passed ? 'bg-green-500' : 'bg-red-500'}`}>{review.passed ? 'PASS' : 'FAIL'}</span>
            </div>
            <div className="space-y-8">
              {Array.isArray(review.results) && review.results.length > 0 ? (
                review.results.map((q: any, idx: number) => (
                  <div key={q.questionId} className="p-6 rounded border border-gray-100 bg-white w-full">
                    <div className="block font-medium mb-2 text-lg">{idx + 1}. {q.prompt}</div>
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700">Your answer:</span>
                      <div className="mt-1 p-2 bg-gray-50 border border-gray-100 rounded text-gray-900 whitespace-pre-line">{q.userAnswer || <span className="italic text-gray-400">No answer</span>}</div>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold text-gray-700">Feedback:</span>
                      <div className="mt-1 text-sm text-gray-700">{q.feedback}</div>
                    </div>
                    {typeof q.score === 'number' && (
                      <div className="text-sm">Score: <span className={q.score === 1 ? 'text-green-600' : 'text-red-600'}>{q.score} / 1</span></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No questions found in this review.</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-500">No review data found.</div>
        )}
      </div>
    </>
  );
} 