import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-medium rounded ${
        variant === "outline"
          ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          : variant === "secondary"
          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
          : "bg-[#0747A1] text-white hover:bg-[#053674]"
      } ${className}`}
      {...props}
    />
  );
}; 