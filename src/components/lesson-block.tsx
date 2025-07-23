"use client"

import type React from "react"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { File, Trash, ImageIcon, Video, FileText, Plus, Minus, X } from "lucide-react" // Import X icon for delete

interface LessonBlockProps {
  lessonNumber: number
  onDelete: () => void // Make onDelete required
}

export function LessonBlock({ lessonNumber, onDelete }: LessonBlockProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null)

  const [additionalResources, setAdditionalResources] = useState([{ title: "", link: "" }])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setFileName(file.name)
      setFileSize((file.size / 1024 / 1024).toFixed(1) + "MB")

      const url = URL.createObjectURL(file)
      setFilePreviewUrl(url)

      if (file.type.startsWith("image/")) {
        setFileType("image")
      } else if (file.type.startsWith("video/")) {
        setFileType("video")
      } else if (file.type === "application/pdf") {
        setFileType("pdf")
      } else {
        setFileType("other")
      }
    }
  }

  const handleDeleteMedia = () => {
    setFileName(null)
    setFileSize(null)
    setFileType(null)
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl)
      setFilePreviewUrl(null)
    }
  }

  const renderMediaPreview = () => {
    if (!filePreviewUrl) {
      return (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )
    }

    switch (fileType) {
      case "image":
        return (
          <img
            src={filePreviewUrl || "/placeholder.svg"}
            alt="Media Preview"
            className="max-h-full max-w-full object-contain"
          />
        )
      case "video":
        return (
          <video controls src={filePreviewUrl} className="max-h-full max-w-full object-contain">
            Your browser does not support the video tag.
          </video>
        )
      case "pdf":
        return (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-500">
            <FileText className="h-16 w-16 mb-2" />
            <p>PDF Preview (not directly supported in browser)</p>
            <p className="text-sm">{fileName}</p>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-500">
            <File className="h-16 w-16 mb-2" />
            <p>File Preview</p>
            <p className="text-sm">{fileName}</p>
          </div>
        )
    }
  }

  const handleAddResource = () => {
    setAdditionalResources([...additionalResources, { title: "", link: "" }])
  }

  const handleRemoveResource = (index: number) => {
    setAdditionalResources(additionalResources.filter((_, i) => i !== index))
  }

  const handleResourceChange = (index: number, field: "title" | "link", value: string) => {
    const newResources = [...additionalResources]
    newResources[index] = { ...newResources[index], [field]: value }
    setAdditionalResources(newResources)
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Lesson {lessonNumber}</CardTitle>
        <Button variant="outline"  onClick={onDelete} className="text-red-500 hover:bg-red-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Delete Lesson</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Lesson Details */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label htmlFor={`lesson-title-${lessonNumber}`} className="text-sm font-medium">
                Lesson Title
              </label>
              <Input id={`lesson-title-${lessonNumber}`} placeholder="Enter lesson title" className="w-full" />
            </div>
            <div className="space-y-2">
              <label htmlFor={`lesson-notes-${lessonNumber}`} className="text-sm font-medium">
                Lesson Notes
              </label>
              <Textarea
                id={`lesson-notes-${lessonNumber}`}
                placeholder="Add detailed notes for this lesson."
                className="min-h-[100px] w-full"
              />
            </div>
            {/* Additional Resources Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Resources</label>
              {additionalResources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Resource Title"
                    value={resource.title}
                    onChange={(e) => handleResourceChange(index, "title", e.target.value)}
                    className="flex-1 w-full"
                  />
                  <Input
                    placeholder="Resource Link (URL)"
                    value={resource.link}
                    onChange={(e) => handleResourceChange(index, "link", e.target.value)}
                    className="flex-1 w-full"
                  />
                  {additionalResources.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveResource(index)}
                      className="text-red-500 hover:bg-red-100"
                    >
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Remove resource</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={handleAddResource} className="w-full mt-2 bg-transparent flex items-center justify-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Resource</span>
              </Button>
            </div>
            <div className="space-y-2">
              <label htmlFor={`lesson-duration-${lessonNumber}`} className="text-sm font-medium">
                Lesson Duration (minutes)
              </label>
              <Input id={`lesson-duration-${lessonNumber}`} type="number" placeholder="e.g., 30" min="0" className="w-full" />
            </div>
          </div>
          {/* Right: Lesson Media */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="space-y-2 w-full">
              <h3 className="text-base font-semibold">Lesson Media</h3>
              <p className="text-sm text-muted-foreground">
                Add your course media below. This could be a PDF, video, or image.
              </p>
              {fileName ? (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg h-[350px] text-center relative overflow-hidden w-full">
                  {renderMediaPreview()}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-white/80 backdrop-blur-sm p-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {fileType === "image" && <ImageIcon className="h-4 w-4 text-gray-600" />}
                      {fileType === "video" && <Video className="h-4 w-4 text-gray-600" />}
                      {fileType === "pdf" && <FileText className="h-4 w-4 text-gray-600" />}
                      {fileType === "other" && <File className="h-4 w-4 text-gray-600" />}
                      <div>
                        <p className="font-medium text-sm">{fileName}</p>
                        <p className="text-xs text-muted-foreground">{fileSize}</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleDeleteMedia} className="text-red-500 hover:bg-red-100">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete Media</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg h-[350px] text-center w-full">
                  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drop your media here, or{" "}
                    <label htmlFor={`file-upload-${lessonNumber}`} className="text-blue-600 hover:underline cursor-pointer">
                      click to browse
                    </label>
                    . Supported formats: .png, .jpg, .mp4, .pdf, up to 5MB.
                  </p>
                  <Input id={`file-upload-${lessonNumber}`} type="file" className="hidden" onChange={handleFileChange} />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
