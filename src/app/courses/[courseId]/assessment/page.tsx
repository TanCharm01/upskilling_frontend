"use client"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import CourseNavbar from '@/components/CourseNavbar';

// Dummy assessment data
const questions = [
  {
    id: 1,
    question: 'Describe a time you overcame a communication challenge.',
    answer: 'Open', // open-ended
    correctKeywords: ['communication', 'challenge', 'overcame'],
  },
  {
    id: 2,
    question: 'What is one technique to build confidence before public speaking?',
    answer: 'Open',
    correctKeywords: ['practice', 'visualize', 'power pose', 'preparation'],
  },
];

type GradedResult = { score: number; feedback: string };

function gradeAnswer(userAnswer: string, correctKeywords: string[]): GradedResult {
  if (!userAnswer) return { score: 0, feedback: 'No answer provided.' };
  let matched = 0;
  correctKeywords.forEach((kw: string) => {
    if (userAnswer.toLowerCase().includes(kw)) matched++;
  });
  const score = matched > 0 ? 1 : 0;
  const feedback =
    score === 1
      ? 'Good answer! You mentioned key concepts.'
      : 'Try to include more relevant concepts from the course.';
  return { score, feedback };
}

export default function CourseAssessmentPage() {
  const params = useParams();
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [results, setResults] = useState<GradedResult[] | null>(null);

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const graded = questions.map((q, idx) => gradeAnswer(answers[idx], q.correctKeywords));
    setResults(graded);
  };

  const totalScore = results ? results.reduce((sum, r) => sum + r.score, 0) : 0;
  const pass = results ? totalScore >= questions.length * 0.7 : false;

  return (
    <>
      <CourseNavbar />
      <div className="pt-[72px] max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Assessment</h1>
        <p className="mb-6 text-gray-600">Assessment for course: <span className="font-semibold">{params.courseId}</span></p>
        {results && (
          <div className="mb-6 p-4 rounded bg-gray-50 border border-gray-100">
            <span className="text-lg font-semibold">Overall Score: {totalScore} / {questions.length}</span>
            <span className={`ml-4 px-3 py-1 rounded text-white text-sm font-bold ${pass ? 'bg-green-500' : 'bg-red-500'}`}>{pass ? 'PASS' : 'FAIL'}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded border border-gray-100 bg-white">
              <label className="block font-medium mb-2">{idx + 1}. {q.question}</label>
              <textarea
                className="w-full border border-gray-200 rounded p-2 min-h-[60px]"
                value={answers[idx]}
                onChange={e => handleChange(idx, e.target.value)}
                disabled={!!results}
              />
              {results && (
                <div className="mt-2">
                  <div className="text-sm text-gray-700">Feedback: {results[idx].feedback}</div>
                  <div className="text-sm">Score: <span className={results[idx].score === 1 ? 'text-green-600' : 'text-red-600'}>{results[idx].score} / 1</span></div>
                </div>
              )}
            </div>
          ))}
          {!results && (
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold">Submit Assessment</button>
          )}
        </form>
      </div>
    </>
  );
} 