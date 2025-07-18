"use client"

import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  ChevronDown,
  Star,
  StarHalf,
  ThumbsUp,
  TrendingUp,
  Frown,
  ArrowLeft,
  ArrowRight,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FeedbackMetricCard } from "@/components/ui/feedback-metric-card"

// Dummy data for feedback table
const feedbackData = [
  {
    id: "1",
    learner: "Daisy Kudzai Tsenesa",
    course: "Speak with Impact",
    rating: 4,
    usefulness: "Very useful",
    submitted: "March 3, 2025",
    status: "Pending",
  },
  {
    id: "2",
    learner: "Daisy Kudzai Tsenesa",
    course: "Networking",
    rating: 3.5,
    usefulness: "Very useful",
    submitted: "March 3, 2025",
    status: "Pending",
  },
  {
    id: "3",
    learner: "Daisy Kudzai Tsenesa",
    course: "Networking",
    rating: 4,
    usefulness: "Very useful",
    submitted: "March 3, 2025",
    status: "Pending",
  },
  {
    id: "4",
    learner: "Daisy Kudzai Tsenesa",
    course: "Interview",
    rating: 3,
    usefulness: "Very useful",
    submitted: "March 3, 2025",
    status: "Pending",
  },
  {
    id: "5",
    learner: "Daisy Kudzai Tsenesa",
    course: "Networking",
    rating: 2.5,
    usefulness: "Not useful",
    submitted: "March 3, 2025",
    status: "Pending",
  },
  {
    id: "6",
    learner: "Daisy Kudzai Tsenesa",
    course: "Networking",
    rating: 4,
    usefulness: "Very useful",
    submitted: "March 3, 2025",
    status: "Pending",
  },
]

// Helper to render star ratings
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
    </div>
  )
}

export default function FeedbackManagement() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Feedback Management</h2>
        </header>

        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feedback Management</h1>
          <p className="text-sm text-muted-foreground mb-6">Monitor and manage learner feedback across all courses</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            <FeedbackMetricCard title="Average Rating" value="4/5" description="Overall average rating" icon={Star} />
            <FeedbackMetricCard
              title="Top suggestion"
              value="Pace"
              description="Most mentioned word"
              icon={TrendingUp}
            />
            <FeedbackMetricCard
              title="Top rate course"
              value="Networking"
              description="Highest average rating"
              icon={Star}
            />
            <FeedbackMetricCard
              title="Needs attention"
              value="Speak with Impact"
              description="Lowest average rating"
              icon={Frown}
              valueColor="text-red-500"
            />
            <FeedbackMetricCard
              title="Would recommend"
              value="79%"
              description="Of all learners"
              icon={ThumbsUp}
              valueColor="text-green-500"
            />
          </div>

          <h2 className="text-xl font-bold mb-4">Filters & Search</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search learner, course. or keyword.." className="pl-9 w-full" />
            </div>
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    All courses <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Networking</DropdownMenuItem>
                  <DropdownMenuItem>Speak with Impact</DropdownMenuItem>
                  <DropdownMenuItem>Interview</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    All rating <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>5 Stars</DropdownMenuItem>
                  <DropdownMenuItem>4 Stars</DropdownMenuItem>
                  <DropdownMenuItem>3 Stars</DropdownMenuItem>
                  <DropdownMenuItem>2 Stars</DropdownMenuItem>
                  <DropdownMenuItem>1 Star</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    Date range <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Learner</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Usefulness</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackData.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">{feedback.learner}</TableCell>
                        <TableCell>{feedback.course}</TableCell>
                        <TableCell>{renderStars(feedback.rating)}</TableCell>
                        <TableCell>
                          <Badge
                            className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                              feedback.usefulness === "Very useful"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {feedback.usefulness}
                          </Badge>
                        </TableCell>
                        <TableCell>{feedback.submitted}</TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-normal">
                            {feedback.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <div className="flex items-center justify-between p-4 border-t">
              <Button variant="outline" disabled>
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline">
                  2
                </Button>
                <Button variant="outline">
                  3
                </Button>
                <span className="text-sm text-muted-foreground">...</span>
                <Button variant="outline">
                  7
                </Button>
                <Button variant="outline">
                  8
                </Button>
                <Button variant="outline">
                  9
                </Button>
              </div>
              <Button variant="outline">
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
