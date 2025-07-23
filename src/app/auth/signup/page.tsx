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
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
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
    const trimmedFirstname = firstname.trim()
    const trimmedLastname = lastname.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    // Validate
    if (!trimmedFirstname || !trimmedLastname || !trimmedEmail || !trimmedPassword) {
      setError("Please fill all fields (no leading/trailing spaces)")
      setLoading(false)
      return
    }
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: trimmedFirstname,
          lastname: trimmedLastname,
          email: trimmedEmail,
          password: trimmedPassword
        })
      })
      const data = await res.json()
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token)
        setSuccess("Signup successful!")
        setTimeout(() => {
          router.push("/dashboard")
        }, 800)
      } else {
        setError(data.message || "Signup failed")
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
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Please provide your information to create an account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Social login buttons */}
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent" type="button">
                <Chrome className="h-5 w-5 text-red-500" />
                <span className="sr-only">Sign up with Google</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent" type="button">
                <Apple className="h-5 w-5 text-black dark:text-white" />
                <span className="sr-only">Sign up with Apple</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-transparent" type="button">
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="sr-only">Sign up with Meta</span>
              </Button>
            </div>
            {/* OR separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="Jane" required value={firstname} onChange={e => setFirstname(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Doe" required value={lastname} onChange={e => setLastname(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@company.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="#" className="text-v0-purple hover:underline">
                  terms and conditions
                </Link>{" "}
                and the{" "}
                <Link href="#" className="text-v0-purple hover:underline">
                  privacy policy
                </Link>
              </label>
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">{success}</div>}
            <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth" className="text-v0-purple hover:underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
