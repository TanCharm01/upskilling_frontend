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
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FeedbackMetricCard } from "@/components/ui/feedback-metric-card"
import { useEffect, useState } from "react"

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
  // --- State for metrics and feedback ---
  const [metrics, setMetrics] = useState<any>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<any[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // --- Modal state ---
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Pagination state ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Filter state ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [courses, setCourses] = useState<any[]>([]);

  // Fetch courses for filter dropdown
  useEffect(() => {
    fetch("http://localhost:3001/courses")
      .then((res) => res.json())
      .then((data) => setCourses(Array.isArray(data) ? data : data.courses || []))
      .catch(() => setCourses([]));
  }, []);

  const openFeedbackModal = (feedbackItem: any) => {
    setSelectedFeedback(feedbackItem);
    setIsModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setSelectedFeedback(null);
    setIsModalOpen(false);
  };

  // Filter feedback based on search and filters
  const filteredFeedback = feedback.filter((fb: any) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const learnerName = fb.user ? `${fb.user.firstname || ''} ${fb.user.lastname || ''}`.trim().toLowerCase() : '';
    const courseTitle = fb.course?.title?.toLowerCase() || '';
    const comment = fb.comment?.toLowerCase() || '';
    const testimonial = fb.testimonial?.toLowerCase() || '';
    
    const matchesSearch = !searchQuery || 
      learnerName.includes(searchLower) || 
      courseTitle.includes(searchLower) || 
      comment.includes(searchLower) || 
      testimonial.includes(searchLower);

    // Course filter
    const matchesCourse = selectedCourse === "all" || 
      fb.course?.title === selectedCourse;

    // Rating filter
    const matchesRating = selectedRating === "all" || 
      fb.rating === parseInt(selectedRating);

    // Date range filter
    const feedbackDate = new Date(fb.submittedAt || fb.createdAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - feedbackDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let matchesDateRange = true;
    if (selectedDateRange === "7") {
      matchesDateRange = daysDiff <= 7;
    } else if (selectedDateRange === "30") {
      matchesDateRange = daysDiff <= 30;
    } else if (selectedDateRange === "90") {
      matchesDateRange = daysDiff <= 90;
    }

    return matchesSearch && matchesCourse && matchesRating && matchesDateRange;
  });

  // Remove uniqueCourses, use courses from backend

  // Calculate pagination based on filtered results
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFeedback = filteredFeedback.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCourse, selectedRating, selectedDateRange]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Fetch metrics
    setMetricsLoading(true);
    setMetricsError(null);
    fetch("http://localhost:3001/feedback/admin/statistics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch feedback metrics");
        return res.json();
      })
      .then((data) => setMetrics(data))
      .catch((err) => setMetricsError(err.message || "Failed to fetch feedback metrics"))
      .finally(() => setMetricsLoading(false));

    // Fetch feedback table data
    setFeedbackLoading(true);
    setFeedbackError(null);
    fetch("http://localhost:3001/feedback/admin/all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch feedback");
        return res.json();
      })
      .then((data) => setFeedback(Array.isArray(data) ? data : data.feedback || []))
      .catch((err) => setFeedbackError(err.message || "Failed to fetch feedback"))
      .finally(() => setFeedbackLoading(false));
  }, []);

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

          {/* Metrics Cards */}
          {metricsLoading ? (
            <div className="mb-8 text-center text-gray-500">Loading metrics...</div>
          ) : metricsError ? (
            <div className="mb-8 text-center text-red-500">{metricsError}</div>
          ) : metrics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              <FeedbackMetricCard title="Average Rating" value={metrics.averageRating} description="Overall average rating" icon={Star} />
              <FeedbackMetricCard title="Top suggestion" value={metrics.topSuggestion} description="Most mentioned word" icon={TrendingUp} />
              <FeedbackMetricCard title="Top rate course" value={metrics.topRatedCourse} description="Highest average rating" icon={Star} />
              <FeedbackMetricCard title="Needs attention" value={metrics.needsAttention} description="Lowest average rating" icon={Frown} valueColor="text-red-500" />
              <FeedbackMetricCard title="Would recommend" value={metrics.wouldRecommend} description="Of all learners" icon={ThumbsUp} valueColor="text-green-500" />
          </div>
          ) : null}

          <h2 className="text-xl font-bold mb-4">Filters & Search</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search learner, course, or keyword..." 
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    {selectedCourse === "all" ? "All courses" : selectedCourse} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedCourse("all")}>
                    All courses
                  </DropdownMenuItem>
                  {courses.map((course) => (
                    <DropdownMenuItem key={course.id} onClick={() => setSelectedCourse(course.title)}>
                      {course.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    {selectedRating === "all" ? "All ratings" : `${selectedRating} Stars`} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedRating("all")}>
                    All ratings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRating("5")}>
                    5 Stars
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRating("4")}>
                    4 Stars
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRating("3")}>
                    3 Stars
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRating("2")}>
                    2 Stars
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRating("1")}>
                    1 Star
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    {selectedDateRange === "all" ? "All time" : 
                     selectedDateRange === "7" ? "Last 7 days" :
                     selectedDateRange === "30" ? "Last 30 days" :
                     selectedDateRange === "90" ? "Last 90 days" : "Date range"} <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedDateRange("all")}>
                    All time
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("7")}>
                    Last 7 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("30")}>
                    Last 30 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDateRange("90")}>
                    Last 90 days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results counter */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredFeedback.length} of {feedback.length} feedback items
            {(searchQuery || selectedCourse !== "all" || selectedRating !== "all" || selectedDateRange !== "all") && (
              <span className="text-blue-600"> (filtered)</span>
            )}
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
                    {feedbackLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">Loading feedback...</TableCell>
                      </TableRow>
                    ) : feedbackError ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-red-500">{feedbackError}</TableCell>
                      </TableRow>
                    ) : feedback.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">No feedback found.</TableCell>
                      </TableRow>
                    ) : (
                      currentFeedback.map((fb: any) => (
                        <TableRow key={fb.id}>
                          <TableCell className="font-medium">{
                            (fb.user && (fb.user.firstname || fb.user.lastname))
                              ? `${fb.user.firstname || ''} ${fb.user.lastname || ''}`.trim()
                              : (fb.learnerName || fb.learner || (fb.user && (fb.user.name || fb.user.fullName)) || "-")
                          }</TableCell>
                          <TableCell>{
                            fb.course?.title ||
                            (typeof fb.courseTitle === "string" && fb.courseTitle) ||
                            (typeof fb.course === "string" && fb.course) ||
                            (fb.courseObj && (fb.courseObj.title || fb.courseObj.name)) ||
                            (typeof fb.course === "object" && fb.course && (fb.course.title || fb.course.name)) ||
                            "-"
                          }</TableCell>
                          <TableCell>{renderStars(fb.rating)}</TableCell>
                        <TableCell>
                          <Badge
                            className={`px-2 py-0.5 rounded-full text-xs font-normal ${
                                (fb.usefulness || (fb.fullResponse?.usefulness && fb.fullResponse.usefulness.toLowerCase() === 'very-useful'))
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                              {
                                fb.usefulness ||
                                (fb.fullResponse?.usefulness
                                  ? fb.fullResponse.usefulness.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                                  : "-")
                              }
                          </Badge>
                        </TableCell>
                          <TableCell>{fb.submittedAt || fb.submitted || fb.createdAt || "-"}</TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-normal">
                              {fb.status || "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" className="text-blue-600 hover:text-blue-700" onClick={() => openFeedbackModal(fb)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <div className="flex items-center justify-between p-4 border-t">
              <Button variant="outline" disabled={currentPage === 1} onClick={goToPreviousPage}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      className={currentPage === pageNumber ? "bg-blue-600 text-white" : ""}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                </Button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                <span className="text-sm text-muted-foreground">...</span>
                    <Button variant="outline" onClick={() => goToPage(totalPages)}>
                      {totalPages}
                </Button>
                  </>
                )}
              </div>
              <Button variant="outline" disabled={currentPage === totalPages} onClick={goToNextPage}>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </section>
      </main>

        {/* Feedback Modal */}
        {isModalOpen && selectedFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="absolute inset-0" onClick={closeFeedbackModal} />
            <Card className="relative w-full max-w-2xl mx-4 rounded-xl shadow-lg z-10 max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
                onClick={closeFeedbackModal}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
                <div className="space-y-4">
                  {/* User Information */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Learner Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="text-gray-800">
                          {selectedFeedback.user ? `${selectedFeedback.user.firstname || ''} ${selectedFeedback.user.lastname || ''}`.trim() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-800">{selectedFeedback.user?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Status:</span>
                        <p className="text-gray-800">{selectedFeedback.user?.status || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Member Since:</span>
                        <p className="text-gray-800">
                          {selectedFeedback.user?.createdAt ? new Date(selectedFeedback.user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Information */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Course Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Course:</span>
                        <p className="text-gray-800">{selectedFeedback.course?.title || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Category:</span>
                        <p className="text-gray-800">{selectedFeedback.course?.category || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Level:</span>
                        <p className="text-gray-800 capitalize">{selectedFeedback.course?.level || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Duration:</span>
                        <p className="text-gray-800">{selectedFeedback.course?.duration ? `${selectedFeedback.course.duration} minutes` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Details */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Feedback Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Rating:</span>
                        {renderStars(selectedFeedback.rating)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Usefulness:</span>
                        <Badge className={`ml-2 px-2 py-0.5 rounded-full text-xs font-normal ${
                          (selectedFeedback.usefulness || (selectedFeedback.fullResponse?.usefulness && selectedFeedback.fullResponse.usefulness.toLowerCase() === 'very-useful'))
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {selectedFeedback.usefulness || 
                           (selectedFeedback.fullResponse?.usefulness
                             ? selectedFeedback.fullResponse.usefulness.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
                             : 'N/A')}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Submitted:</span>
                        <p className="text-gray-800">
                          {selectedFeedback.submittedAt ? new Date(selectedFeedback.submittedAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Survey Responses */}
                  {selectedFeedback.fullResponse && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Survey Responses</h3>
                      <div className="space-y-3 text-sm">
                        {selectedFeedback.fullResponse.enjoyment && (
                          <div>
                            <span className="font-medium text-gray-600">What did you enjoy most?</span>
                            <p className="text-gray-800">{selectedFeedback.fullResponse.enjoyment}</p>
                          </div>
                        )}
                        {selectedFeedback.fullResponse.improvements && (
                          <div>
                            <span className="font-medium text-gray-600">What could be improved?</span>
                            <p className="text-gray-800">{selectedFeedback.fullResponse.improvements}</p>
                          </div>
                        )}
                        {selectedFeedback.fullResponse.clarity && (
                          <div>
                            <span className="font-medium text-gray-600">Content Clarity:</span>
                            <p className="text-gray-800 capitalize">{selectedFeedback.fullResponse.clarity.replace(/-/g, ' ')}</p>
                          </div>
                        )}
                        {selectedFeedback.fullResponse.recommend && (
                          <div>
                            <span className="font-medium text-gray-600">Would you recommend this course?</span>
                            <p className="text-gray-800 capitalize">{selectedFeedback.fullResponse.recommend}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Comments and Testimonials */}
                  {(selectedFeedback.comment || selectedFeedback.testimonial) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Additional Feedback</h3>
                      <div className="space-y-3 text-sm">
                        {selectedFeedback.comment && (
                          <div>
                            <span className="font-medium text-gray-600">Comment:</span>
                            <p className="text-gray-800">{selectedFeedback.comment}</p>
                          </div>
                        )}
                        {selectedFeedback.testimonial && (
                          <div>
                            <span className="font-medium text-gray-600">Testimonial:</span>
                            <p className="text-gray-800 italic">"{selectedFeedback.testimonial}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
    </div>
  )
}
