import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

interface FeedbackFormModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  userId: string | null;
  onFeedbackSubmitted: () => void;
}

export default function FeedbackFormModal({ open, onClose, courseId, userId, onFeedbackSubmitted }: FeedbackFormModalProps) {
  const [rating, setRating] = useState(0)
  const [enjoyment, setEnjoyment] = useState("")
  const [improvements, setImprovements] = useState("")
  const [usefulness, setUsefulness] = useState("")
  const [clarity, setClarity] = useState("")
  const [recommend, setRecommend] = useState("")
  const [testimonial, setTestimonial] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [publicOk, setPublicOk] = useState(false)

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:3001/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          courseId,
          rating,
          testimonial,
          publicOk,
          fullResponse: {
            enjoyment,
            improvements,
            usefulness,
            clarity,
            recommend,
          }
        })
      })
      if (!res.ok) throw new Error('Failed to submit feedback')
      setSubmitted(true)
      onFeedbackSubmitted()
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
        <Card className="w-full bg-white shadow-none border-none">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Give us your feedback!</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center text-green-600 text-lg font-semibold py-12">
                Thank you for your feedback!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Question 1: Rating */}
                <div>
                  <Label htmlFor="rating" className="text-base font-medium text-gray-800 mb-3 block">
                    1. How would you rate this course?
                  </Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 cursor-pointer transition-colors ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                {/* Question 2: Enjoyment */}
                <div>
                  <Label htmlFor="enjoyment" className="text-base font-medium text-gray-800 mb-3 block">
                    2. What did you enjoy most about the course?
                  </Label>
                  <Textarea
                    id="enjoyment"
                    placeholder="Share what you liked most..."
                    value={enjoyment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEnjoyment(e.target.value)}
                    rows={4}
                    className="min-h-[100px] w-full"
                  />
                </div>

                {/* Question 3: Improvements */}
                <div>
                  <Label htmlFor="improvements" className="text-base font-medium text-gray-800 mb-3 block">
                    3. Is there anything you think could be improved?
                  </Label>
                  <Textarea
                    id="improvements"
                    placeholder="Let us know what could be better..."
                    value={improvements}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setImprovements(e.target.value)}
                    rows={4}
                    className="min-h-[100px] w-full"
                  />
                </div>

                {/* Question 4: Usefulness */}
                <div>
                  <Label className="text-base font-medium text-gray-800 mb-3 block">
                    4. How useful was this course to your personal or career goals?
                  </Label>
                  <RadioGroup value={usefulness} onValueChange={setUsefulness} className="space-y-2 w-full">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-useful" id="usefulness-1" />
                      <Label htmlFor="usefulness-1">Not useful</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="somewhat-useful" id="usefulness-2" />
                      <Label htmlFor="usefulness-2">Somewhat useful</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-useful" id="usefulness-3" />
                      <Label htmlFor="usefulness-3">Very useful</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 5: Clarity */}
                <div>
                  <Label className="text-base font-medium text-gray-800 mb-3 block">
                    5. How clear and easy to follow was the content?
                  </Label>
                  <RadioGroup value={clarity} onValueChange={setClarity} className="space-y-2 w-full">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-clear" id="clarity-1" />
                      <Label htmlFor="clarity-1">Very clear</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="clear" id="clarity-2" />
                      <Label htmlFor="clarity-2">Clear</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="confusing" id="clarity-3" />
                      <Label htmlFor="clarity-3">Confusing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-confusing" id="clarity-4" />
                      <Label htmlFor="clarity-4">Very confusing</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 6: Recommendation */}
                <div>
                  <Label className="text-base font-medium text-gray-800 mb-3 block">
                    6. Would You Recommend This Course?
                  </Label>
                  <RadioGroup value={recommend} onValueChange={setRecommend} className="space-y-2 w-full">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="recommend-1" />
                      <Label htmlFor="recommend-1">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="recommend-2" />
                      <Label htmlFor="recommend-2">Maybe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="recommend-3" />
                      <Label htmlFor="recommend-3">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 7: Testimonial */}
                <div>
                  <Label htmlFor="testimonial" className="text-base font-medium text-gray-800 mb-3 block">
                    7. Leave a comment or testimonial we can share with others
                  </Label>
                  <Textarea
                    id="testimonial"
                    placeholder="Share your thoughts..."
                    value={testimonial}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTestimonial(e.target.value)}
                    rows={4}
                    className="min-h-[100px] w-full"
                  />
                  <div className="flex items-center mt-2">
                    <Checkbox id="publicOk" checked={publicOk} onCheckedChange={checked => setPublicOk(checked === true)} />
                    <Label htmlFor="publicOk" className="ml-2 text-sm text-gray-700">Make my testimonial public for others to see and learn from</Label>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <Button type="submit" className="w-full max-w-xs bg-[#0747A1] hover:bg-[#05316e]" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                  </Button>
                  <p className="text-sm text-gray-600">Your certificate will be ready once you submit</p>
                  {error && <div className="text-red-600 text-xs mt-2">{error}</div>}
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 