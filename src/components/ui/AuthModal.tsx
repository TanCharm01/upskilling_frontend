"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chrome, Apple, Facebook, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthModal({ onClose, initialMode = 'login', onAuthSuccess }: { onClose: () => void, initialMode?: 'login' | 'signup', onAuthSuccess?: (userData: any) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Signup state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  // Shared
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill all fields (no leading/trailing spaces)");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        setSuccess("Login successful!");
        // Fetch user data and call onAuthSuccess callback
        try {
          const userRes = await fetch("http://localhost:3001/dashboard", {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            if (onAuthSuccess) {
              onAuthSuccess(userData.user);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setTimeout(() => {
          setSuccess("");
          onClose();
          router.push("/dashboard");
        }, 800);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const trimmedFirstname = firstname.trim();
    const trimmedLastname = lastname.trim();
    const trimmedEmail = signupEmail.trim();
    const trimmedPassword = signupPassword.trim();
    if (!trimmedFirstname || !trimmedLastname || !trimmedEmail || !trimmedPassword) {
      setError("Please fill all fields (no leading/trailing spaces)");
      setLoading(false);
      return;
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
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        setSuccess("Signup successful!");
        // Fetch user data and call onAuthSuccess callback
        try {
          const userRes = await fetch("http://localhost:3001/dashboard", {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            if (onAuthSuccess) {
              onAuthSuccess(userData.user);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setTimeout(() => {
          setSuccess("");
          onClose();
          router.push("/dashboard");
        }, 800);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="absolute inset-0" onClick={onClose} />
      <Card className="relative w-full max-w-md rounded-xl shadow-lg z-10">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        {mode === 'login' ? (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
              <CardDescription>Please enter your information to sign in.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form className="grid gap-4" onSubmit={handleLogin}>
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
                    <Checkbox id="remember-me-modal" />
                    <label
                      htmlFor="remember-me-modal"
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
                  <button type="button" className="text-v0-purple hover:underline" onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}>
                    Sign up
                  </button>
                </div>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Please provide your information to create an account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form className="grid gap-4" onSubmit={handleSignup}>
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
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="name@company.com" required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
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
                  <button type="button" className="text-v0-purple hover:underline" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>
                    Login
                  </button>
                </div>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
} 