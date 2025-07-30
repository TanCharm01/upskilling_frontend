'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { decodeJWT, buildApiUrl } from '@/lib/utils';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import FeedbackFormModal from '@/components/ui/FeedbackFormModal';

export default function CourseCertificatePage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');
  const [user, setUser] = useState<any>(null);
  const [courseName, setCourseName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [checkingFeedback, setCheckingFeedback] = useState(true);

  useEffect(() => {
    // Get user info from JWT
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userInfo = decodeJWT(token);
    if (!userInfo?.id || !params.courseId) {
      setError('Missing user or course information.');
      return;
    }
    // Fetch user info from backend
    fetch(buildApiUrl(`users/${userInfo.id}`))
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user info.');
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
    // Fetch course name on mount
    fetch(buildApiUrl(`courses/${params.courseId}/content`))
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch course info.');
        return res.json();
      })
      .then(data => {
        setCourseName(data.title || '');
      })
      .catch(() => {
        setCourseName('');
      });
  }, [params.courseId]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const userInfo = decodeJWT(token);
    if (userInfo?.id && courseName) {
      setUserId(userInfo.id);
      setCheckingFeedback(true);
      fetch(buildApiUrl(`feedback/user/${userInfo.id}/course/${params.courseId}`))
        .then(res => res.json())
        .then(data => {
          setFeedbackSubmitted(!!data);
        })
        .catch(() => setFeedbackSubmitted(false))
        .finally(() => setCheckingFeedback(false));
    }
  }, [courseName]);

  // Handler to generate certificate
  const handleGenerateCertificate = async () => {
    if (!user?.id || !params.courseId) return;
    setGenerating(true);
    setError('');
    try {
      const res = await fetch(buildApiUrl('certificates/generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, courseId: params.courseId })
      });
      if (!res.ok) throw new Error('Failed to generate certificate.');
      const data = await res.json();
      setCertificateUrl(data.certificateUrl || data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate certificate.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-[60vh] bg-gray-50">
      <div className="w-full max-w-md flex items-center mb-2">
        <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-700 text-sm font-medium bg-transparent px-2 py-1 rounded transition-colors">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      <Card className="max-w-md w-full shadow-lg border-2 border-blue-100">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="mb-2 h-16 w-16">
            {user?.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} alt={user.firstname || 'User'} />
            ) : (
              <AvatarFallback>{user?.firstname?.[0] || '?'}</AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="text-center text-2xl font-bold">Certificate of Completion</CardTitle>
          <CardDescription className="text-center">Congratulations{user?.firstname || user?.lastname ? `, ${user?.firstname || ''} ${user?.lastname || ''}`.trim() : ''}!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-gray-700 text-center">You have successfully completed the course:</p>
          <p className="font-semibold text-lg text-blue-900 text-center">
            {courseName ? courseName : loading ? 'Loading course...' : 'Course'}
          </p>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : certificateUrl ? (
            <a href={certificateUrl} target="_blank" rel="noopener noreferrer" download>
              <Button className="mt-2 w-full flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                Download Certificate
              </Button>
            </a>
          ) : (
            <Button
              className="mt-2 w-full flex items-center justify-center gap-2"
              onClick={() => {
                if (feedbackSubmitted === false) {
                  setShowFeedbackModal(true);
                  return;
                }
                handleGenerateCertificate();
              }}
              disabled={generating || checkingFeedback}
            >
              {generating ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Generating...
                </>
              ) : (
                <>Generate Certificate</>
              )}
            </Button>
          )}
          {showFeedbackModal && (
            <FeedbackFormModal
              open={showFeedbackModal}
              onClose={() => setShowFeedbackModal(false)}
              courseId={String(params.courseId)}
              userId={userId}
              onFeedbackSubmitted={() => {
                setShowFeedbackModal(false);
                setFeedbackSubmitted(true);
              }}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
} 