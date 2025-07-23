"use client" // Ensure this is a client component if using useRouter

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { FcGoogle } from "react-icons/fc"
import { FaApple, FaFacebook } from "react-icons/fa"

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-gray-500 text-sm mt-2">
            Please enter your information to sign in.
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border bg-transparent"
          >
            <FcGoogle className="h-5 w-5" />
            <span className="sr-only">Sign in with Google</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border bg-transparent"
          >
            <FaApple className="h-5 w-5 text-black" />
            <span className="sr-only">Sign in with Apple</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border bg-transparent"
          >
            <FaFacebook className="h-5 w-5 text-[#1877F2]" />
            <span className="sr-only">Sign in with Facebook</span>
          </Button>
        </div>

        {/* OR Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Email and Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="w-full"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <label htmlFor="remember-me" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              href="#"
              className="text-sm font-medium text-loginPurple-DEFAULT hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-uncommonBlue hover:bg-loginPurple-dark text-white py-2 rounded-md"
          >
            Login
          </Button>
        </form>

        {/* Footer Text */}
        <div className="mt-6 text-center text-sm">
          {"Don't have an account?"}{" "}
          <Link
            href="#"
            className="font-medium text-loginPurple-DEFAULT hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
