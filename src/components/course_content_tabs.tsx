"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface CourseContentTabsProps {
  transcription: string
  notes: string
  resources: string[]
}

export default function CourseContentTabs({ transcription, notes, resources }: CourseContentTabsProps) {
  return (
    <Tabs defaultValue="transcription" className="w-full mt-8">
      <div className="flex justify-between items-center border-b border-gray-200">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="transcription" className="py-3">
            Transcription
          </TabsTrigger>
          <TabsTrigger value="notes" className="py-3">
            Notes
          </TabsTrigger>
          <TabsTrigger value="resources" className="py-3">
            Resources
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">Transcript language</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md border hover:bg-gray-100">
              English <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Spanish</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsContent value="transcription" className="mt-4 text-gray-800 text-base leading-relaxed">
        <div className="flex gap-4">
          <span className="text-gray-500 text-sm flex-shrink-0">0.00</span>
          <p>{transcription}</p>
        </div>
      </TabsContent>
      <TabsContent value="notes" className="mt-4 text-gray-800 text-base leading-relaxed">
        <p>{notes || "No notes available for this lesson."}</p>
      </TabsContent>
      <TabsContent value="resources" className="mt-4 text-gray-800 text-base leading-relaxed">
        {resources.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        ) : (
          <p>No resources available for this lesson.</p>
        )}
      </TabsContent>
    </Tabs>
  )
}
