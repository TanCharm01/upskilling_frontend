"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Chrome, Apple, Facebook, ChevronLeft } from "lucide-react"

export default function Component() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    // Trim input values
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    // Validate
    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill all fields (no leading/trailing spaces)")
      setLoading(false)
      return
    }
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      })
      const data = await res.json()
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token)
        setSuccess("Login successful!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 800)
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4 flex-col">
      <div className="flex justify-center mb-8 mt-4 w-full">
        <Link href="/" className="flex items-center text-gray-600 hover:text-blue-700 text-sm font-medium bg-transparent px-2 py-1 rounded transition-colors">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Homepage
        </Link>
      </div>
      <Card className="w-full max-w-md rounded-xl shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
          <CardDescription>Please enter your information to sign in.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent" type="button">
                <Chrome className="h-5 w-5 text-red-500" />
                <span className="sr-only">Sign in with Google</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent" type="button">
                <Apple className="h-5 w-5 text-black dark:text-white" />
                <span className="sr-only">Sign in with Apple</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent" type="button">
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="sr-only">Sign in with Meta</span>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm text-v0-purple hover:underline">
                Forgot password?
              </Link>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
            <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-v0-purple hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
