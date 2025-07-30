"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CourseNavbar from "@/components/CourseNavbar";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { decodeJWT, buildApiUrl } from "@/lib/utils";

export default function QuizPage() {
  const params = useParams();
  const { courseId, quizId } = params as { courseId: string; quizId: string };
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<any[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [grading, setGrading] = useState(false);
  const [review, setReview] = useState<any | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Get userId from token if available
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
    async function fetchQuiz() {
      setLoading(true);
      setError("");
      try {
        // Fetch course content and find the quiz by quizId
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) throw new Error("No token found. Please login.");
        const res = await fetch(buildApiUrl(`courses/${courseId}/content`));
        if (!res.ok) throw new Error("Failed to fetch course content");
        const data = await res.json();
        let foundQuiz = null;
        for (const module of data.modules) {
          if (Array.isArray(module.quizzes)) {
            foundQuiz = module.quizzes.find((q: any) => q.id === quizId);
            if (foundQuiz) break;
          }
        }
        if (!foundQuiz) throw new Error("Quiz not found");
        setQuiz(foundQuiz);
        setAnswers(Array(foundQuiz.questions.length).fill(""));
      } catch (err: any) {
        setError(err.message || "Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [courseId, quizId]);

  // Fetch review if quiz is completed
  useEffect(() => {
    if (quiz && quiz.completed && userId && quizId) {
      setReviewLoading(true);
      fetch(buildApiUrl(`quizzes/submissions/${userId}/${quizId}`))
        .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch review"))
        .then(data => setReview(data))
        .catch(() => setReview(null))
        .finally(() => setReviewLoading(false));
    }
  }, [quiz, userId, quizId]);

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quiz) return;
    setGrading(true);
    setError("");
    try {
      const res = await fetch(buildApiUrl("quizzes/grade"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          quizId,
          userId,
          answers,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        // Map backend results to the order of quiz.questions
        const mappedResults = quiz.questions.map((q: any) => {
          const found = data.results.find((r: any) => r.questionId === q.id);
          return found || { score: 0, feedback: "No feedback", questionId: q.id };
        });
        setResults(mappedResults);
      } else {
        throw new Error("Failed to grade quiz");
      }
    } catch {
      setError("Failed to grade quiz. Please try again.");
    } finally {
      setGrading(false);
    }
  };

  const totalScore = results ? results.reduce((sum, r) => sum + r.score, 0) : 0;
  const pass = results ? totalScore >= (quiz?.questions.length || 1) * 0.7 : false;

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
            Back to Course
          </button>
        </div>
        {loading ? (
          <div className="text-gray-500">Loading quiz...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : quiz ? (
          quiz.completed ? (
            reviewLoading ? (
              <div className="text-gray-500">Loading review...</div>
            ) : review ? (
              <>
                <h1 className="text-2xl font-bold mb-4">Quiz Review: {quiz.title}</h1>
                <div className="mb-4 text-gray-600 text-sm">Completed at: {review.completedAt ? new Date(review.completedAt).toLocaleString() : "-"}</div>
                <div className="space-y-8">
                  {review.questions.map((q: any, idx: number) => (
                    <div key={q.id || idx} className="p-6 rounded border border-gray-100 bg-white w-full">
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
                  ))}
                </div>
              </>
            ) : (
              <div className="text-gray-500">No review data found.</div>
            )
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Quiz: {quiz.title}</h1>
              <form onSubmit={handleSubmit} className="space-y-10">
                {quiz.questions.map((q: any, idx: number) => (
                  <div key={q.id || idx} className="p-6 rounded border border-gray-100 bg-white w-full">
                    <label className="block font-medium mb-3 text-lg">{idx + 1}. {q.prompt}</label>
                    <textarea
                      className="w-full border border-gray-200 rounded p-4 min-h-[120px] text-base resize-vertical"
                      value={answers[idx]}
                      onChange={e => handleChange(idx, e.target.value)}
                      disabled={!!results}
                    />
                    {results && (
                      <div className="mt-3">
                        <div className="text-sm text-gray-700">Feedback: {results[idx].feedback}</div>
                        <div className="text-sm">Score: <span className={results[idx].score === 1 ? 'text-green-600' : 'text-red-600'}>{results[idx].score} / 1</span></div>
                      </div>
                    )}
                  </div>
                ))}
                {!results && !grading && (
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold">Submit Quiz</button>
                )}
                {grading && (
                  <div className="px-6 py-2 bg-blue-600 text-white rounded font-semibold inline-flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Grading...
                  </div>
                )}
                {error && (
                  <div className="text-red-500 mt-4">{error}</div>
                )}
              </form>
              {results && (
                <div className="mt-8 p-6 rounded bg-gray-50 border border-gray-100 w-full">
                  <span className="text-lg font-semibold">Overall Score: {totalScore} / {quiz.questions.length}</span>
                  <span className={`ml-4 px-3 py-1 rounded text-white text-sm font-bold ${pass ? 'bg-green-500' : 'bg-red-500'}`}>{pass ? 'PASS' : 'FAIL'}</span>
                </div>
              )}
            </>
          )
        ) : null}
      </div>
    </>
  );
} 