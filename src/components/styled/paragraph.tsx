import type React from "react"

interface ParagraphProps {
  children: React.ReactNode
  className?: string
}

export default function Paragraph({ children, className }: ParagraphProps) {
  return <p className={`text-base text-gray-700 ${className || ""}`}>{children}</p>
}
