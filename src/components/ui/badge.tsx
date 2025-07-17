import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", className = "", ...props }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
        variant === "secondary"
          ? "bg-gray-100 text-gray-700"
          : "bg-blue-100 text-blue-800"
      } ${className}`}
      {...props}
    />
  );
}; 