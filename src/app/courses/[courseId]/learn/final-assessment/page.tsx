"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { decodeJWT } from "@/lib/utils";
import CourseNavbar from "@/components/CourseNavbar";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

type AssessmentResults = {
  assessmentId: string;
  userId: string;
  score: number;
  completedAt: string;
  results: Array<{
    questionId: string;
    prompt: string;
    sampleAnswer: string;
    userAnswer: string;
    score: number;
    feedback: string;
  }>;
  passed: boolean;
};

export default function FinalAssessmentPage() {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const [userId, setUserId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<AssessmentResults | null>(null);
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
        const res = await fetch(`http://localhost:3001/courses/${courseId}/content?userId=${userId}`);
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
    async function fetchAssessment() {
      setLoading(true);
      setError("");
      try {
        if (!assessmentId || !userId) return;
        // Use the correct API endpoint
        const res = await fetch(`http://localhost:3001/final-assessments/user/${userId}/${assessmentId}`);
        if (!res.ok) throw new Error("Failed to fetch final assessment");
        const data = await res.json();
        setAssessment(data.assessment);
        setAnswers(Array(data.assessment.questions.length).fill(""));
      } catch (err: any) {
        setError(err.message || "Failed to fetch final assessment");
      } finally {
        setLoading(false);
      }
    }
    if (assessmentId && userId) fetchAssessment();
  }, [assessmentId, userId]);

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!assessment || !assessmentId) return;
    try {
      const res = await fetch("http://localhost:3001/final-assessments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId,
          assessmentId,
          answers,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        setError("Failed to grade assessment");
      }
    } catch {
      setError("Failed to grade assessment");
    }
  };

  const totalScore = results ? results.score : 0;
  const pass = results ? totalScore >= (assessment?.questions.length || 1) * 0.7 : false;

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
          <div className="text-gray-500">Loading final assessment...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : assessment ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{assessment.title || "Final Assessment"}</h1>
            <div className="mb-6 text-gray-600"><span className="font-semibold">{assessment.title || courseId}</span></div>
            {results && (
              <div className="mb-6 p-4 rounded bg-gray-50 border border-gray-100">
                <span className="text-lg font-semibold">Overall Score: {typeof results.score === 'number' ? results.score : 0} / {assessment.questions.length}</span>
                <span className={`ml-4 px-3 py-1 rounded text-white text-sm font-bold ${results.passed ? 'bg-green-500' : 'bg-red-500'}`}>{results.passed ? 'PASS' : 'FAIL'}</span>
              </div>
            )}
            {(!results || results.passed === false) && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {assessment.questions.map((q: any, idx: number) => (
                  <div key={q.id} className="p-4 rounded border border-gray-100 bg-white">
                    <label className="block font-medium mb-2">{idx + 1}. {q.prompt || q.question}</label>
                    <textarea
                      className="w-full border border-gray-200 rounded p-2 min-h-[60px]"
                      value={answers[idx]}
                      onChange={e => handleChange(idx, e.target.value)}
                      disabled={!!results && results.passed !== false}
                    />
                    {results && results.results && (
                      <div className="mt-2">
                        <div className="text-sm text-gray-700">Feedback: {results.results[idx]?.feedback}</div>
                        <div className="text-sm">Score: <span className={results.results[idx]?.score === 1 ? 'text-green-600' : 'text-red-600'}>{results.results[idx]?.score} / 1</span></div>
                      </div>
                    )}
                  </div>
                ))}
                {!results && (
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold">Submit Assessment</button>
                )}
              </form>
            )}
            {results && results.passed === false && (
              <div className="mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-yellow-500 text-white rounded font-semibold"
                  onClick={() => {
                    setAnswers(Array(assessment.questions.length).fill(""));
                    setResults(null);
                  }}
                >
                  Retake Assessment
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
} 