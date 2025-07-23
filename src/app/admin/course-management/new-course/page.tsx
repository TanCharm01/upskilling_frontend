"use client"

import { useState, useRef } from "react" // Import useState, useRef
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Plus, Minus, ArrowRight } from "lucide-react" // Import Plus and Minus icons
import Link from "next/link"

export default function AddNewCourse() {
  const categories = [
    "career skills",
    "Money Matters",
    "communication skills",
    "personal growth",
    "Digital Tools",
    "professionalism",
  ]

  // State to manage learning objectives
  const [learningObjectives, setLearningObjectives] = useState<string[]>([""]) // Start with one empty objective
  // State for image upload and preview
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setThumbnail(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleAddObjective = () => {
    setLearningObjectives([...learningObjectives, ""])
  }

  const handleRemoveObjective = (index: number) => {
    setLearningObjectives(learningObjectives.filter((_, i) => i !== index))
  }

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...learningObjectives]
    newObjectives[index] = value
    setLearningObjectives(newObjectives)
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload New Course</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Add course details to help students discover your course and understand what they will learn
          </p>
        </header>

        <section className="mb-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Info Section */}
            <Card>
              <CardHeader>
                <CardTitle>Course Info</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Add course details to help students discover your course and understand what they will learn
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="course-title"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Course Title
                  </label>
                  <Input id="course-title" placeholder="Course Title" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="course-description"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Course Description
                  </label>
                  <Textarea id="course-description" placeholder="Course Description" className="min-h-[120px] w-full" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Category
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Learning Objectives Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Learning Objectives
                  </label>
                  {learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Objective ${index + 1}`}
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                      />
                      {learningObjectives.length > 1 && (
                        <Button
                          variant="outline"
                          
                          onClick={() => handleRemoveObjective(index)}
                          className="text-red-500 hover:bg-red-100"
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Remove objective</span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={handleAddObjective} className="w-full mt-2 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Objective
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Thumbnail Section */}
            <Card>
              <CardHeader>
                <CardTitle>Course Thumbnail</CardTitle>
                <p className="text-sm text-muted-foreground">Add your course's cover image</p>
              </CardHeader>
              <CardContent>
                <div
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg h-[300px] text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleBrowseClick}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="mb-4 rounded-lg object-contain max-h-40" />
                  ) : (
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg flex flex-col items-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                      <p className="text-lg font-semibold mt-2">Upload Photo</p>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mb-2">JPG, PNG, max 2MB</p>
                  <p className="text-sm text-muted-foreground">
                    Drop your document here, or{' '}
                    <span className="text-blue-600 hover:underline" onClick={e => { e.stopPropagation(); handleBrowseClick(); }}>
                      click to browse
                    </span>
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
