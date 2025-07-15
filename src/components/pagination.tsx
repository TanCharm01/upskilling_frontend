import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Button variant="outline" size="icon" disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      <span className="text-lg font-medium">
        {currentPage} / {totalPages}
      </span>
      <Button variant="outline" size="icon" disabled={currentPage === totalPages}>
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
