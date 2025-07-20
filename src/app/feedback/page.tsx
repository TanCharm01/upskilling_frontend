"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star } from "lucide-react"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Give us your feedback!</h1>
        </div>

        <form className="space-y-6">
          {/* Question 1: Rating */}
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">1. How would you rate this course?</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <Star
                  key={starValue}
                  className={`h-8 w-8 cursor-pointer ${
                    starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(starValue)}
                />
              ))}
            </div>
          </div>

          {/* Question 2: Enjoyment */}
          <div>
            <label htmlFor="enjoyment" className="mb-2 block text-base font-medium text-gray-700">
              2. What did you enjoy most about the course?
            </label>
            <Textarea id="enjoyment" placeholder="Placeholder" rows={4} />
          </div>

          {/* Question 3: Improvement */}
          <div>
            <label htmlFor="improvement" className="mb-2 block text-base font-medium text-gray-700">
              3. Is there anything you think could be improved?
            </label>
            <Textarea id="improvement" placeholder="Placeholder" rows={4} />
          </div>

          {/* Question 4: Usefulness */}
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">
              4. How useful was this course to your personal or career goals?
            </label>
            <RadioGroup defaultValue="" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-useful" id="useful-1" />
                <label htmlFor="useful-1" className="text-sm text-gray-700">
                  Not useful
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="somewhat-useful" id="useful-2" />
                <label htmlFor="useful-2" className="text-sm text-gray-700">
                  Somewhat useful
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-useful" id="useful-3" />
                <label htmlFor="useful-3" className="text-sm text-gray-700">
                  Very useful
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 5: Clarity */}
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">
              5. How clear and easy to follow was the content?
            </label>
            <RadioGroup defaultValue="" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-clear" id="clear-1" />
                <label htmlFor="clear-1" className="text-sm text-gray-700">
                  Very clear
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clear" id="clear-2" />
                <label htmlFor="clear-2" className="text-sm text-gray-700">
                  Clear
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confusing" id="clear-3" />
                <label htmlFor="clear-3" className="text-sm text-gray-700">
                  Confusing
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-confusing" id="clear-4" />
                <label htmlFor="clear-4" className="text-sm text-gray-700">
                  Very confusing
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 6: Recommendation */}
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">
              6. Would You Recommend This Course?
            </label>
            <RadioGroup defaultValue="" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="recommend-yes" />
                <label htmlFor="recommend-yes" className="text-sm text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maybe" id="recommend-maybe" />
                <label htmlFor="recommend-maybe" className="text-sm text-gray-700">
                  Maybe
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="recommend-no" />
                <label htmlFor="recommend-no" className="text-sm text-gray-700">
                  No
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Question 7: Comment/Testimonial */}
          <div>
            <label htmlFor="comment" className="mb-2 block text-base font-medium text-gray-700">
              7. Leave a comment or testimonial we can share with others
            </label>
            <Textarea id="comment" placeholder="Placeholder" rows={4} />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <Button type="submit" variant="outline" className="px-8 py-2 rounded-md bg-transparent">
              Submit
            </Button>
            <p className="text-gray-500 text-xs mt-2">Your certificate will be ready once you submit</p>
          </div>
        </form>
      </div>
    </div>
  )
}
