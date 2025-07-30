"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Chrome, Apple, Facebook, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/lib/utils";

// OTP Input Component
function OTPInput({ value, onChange, disabled = false }: { value: string, onChange: (value: string) => void, disabled?: boolean }) {
  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(digit)) return; // Only allow digits
    
    const newValue = value.split('');
    newValue[index] = digit;
    const result = newValue.join('').slice(0, 6);
    onChange(result);
    
    // Auto-focus next input
    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }, (_, index) => (
        <Input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="text-center text-lg font-mono tracking-widest w-12 h-12"
          placeholder="0"
          maxLength={1}
          autoComplete="off"
        />
      ))}
    </div>
  );
}

export default function AuthModal({ onClose, initialMode = 'login', onAuthSuccess }: { onClose: () => void, initialMode?: 'login' | 'signup', onAuthSuccess?: (userData: any) => void }) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>('login');
  const [step, setStep] = useState<'form' | 'otp' | 'reset-password'>('form');
  
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpType, setOtpType] = useState<'verification' | 'reset'>('verification');
  const [verificationMode, setVerificationMode] = useState<'signup' | 'signin'>('signup');
  
  // Password reset state
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Shared
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  // Countdown timer for resend OTP
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

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
      const res = await fetch(buildApiUrl("auth/login"), {
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
          const userRes = await fetch(buildApiUrl("dashboard"), {
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
      } else if (res.status === 401 && data.message === "Email not verified") {
        // Email not verified, show OTP verification
        setOtpEmail(trimmedEmail);
        setOtpType('verification');
        setVerificationMode('signin');
        setStep('otp');
        setSuccess("Please verify your email with the OTP sent to your inbox.");
        startCountdown();
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
      const res = await fetch(buildApiUrl("auth/register"), {
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
      if (res.ok) {
        setOtpEmail(trimmedEmail);
        setOtpType('verification');
        setVerificationMode('signup');
        setStep('otp');
        setSuccess("Registration successful! Please verify your email with the OTP sent to your inbox.");
        startCountdown();
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      console.log("Sending OTP verification request:", { email: otpEmail, otp });
      const res = await fetch(buildApiUrl("auth/verify-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, otp })
      });
      const data = await res.json();
      console.log("OTP verification response:", { status: res.status, data });
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        setSuccess("Email verification successful! Redirecting to dashboard...");
        
        // Fetch user data and call onAuthSuccess callback
        try {
          const userRes = await fetch(buildApiUrl("dashboard"), {
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
        
        // Clear any errors and close modal immediately
        setError("");
        setLoading(false);
        
        // Reset modal state
        setStep('form');
        setOtp("");
        setOtpEmail("");
        setOtpType('verification');
        
        // Close modal and redirect after a short delay
        setTimeout(() => {
          console.log("Attempting to close modal and redirect...");
          try {
            onClose();
            console.log("Modal closed, redirecting to dashboard...");
            router.push("/dashboard");
          } catch (error) {
            console.error("Error during redirect:", error);
            // Fallback: just close the modal
            onClose();
          }
        }, 1500);
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(buildApiUrl("auth/resend-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: otpEmail,
          purpose: otpType === 'verification' ? verificationMode : 'reset'
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("OTP resent successfully!");
        startCountdown();
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const trimmedEmail = resetEmail.trim();
    if (!trimmedEmail) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(buildApiUrl("auth/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpEmail(trimmedEmail);
        setOtpType('reset');
        setStep('otp');
        setSuccess("Password reset OTP sent to your email!");
        startCountdown();
      } else {
        setError(data.message || "Failed to send reset OTP");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyResetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(buildApiUrl("auth/verify-reset-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setStep('reset-password');
        setSuccess("OTP verified! Please enter your new password.");
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(buildApiUrl("auth/reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: otpEmail, 
          otp, 
          newPassword 
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Password reset successfully!");
        setTimeout(() => {
          setSuccess("");
          onClose();
        }, 1500);
      } else {
        setError(data.message || "Password reset failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep('form');
    setOtp("");
    setOtpEmail("");
    setOtpType('verification');
    setVerificationMode('signup');
    setError("");
    setSuccess("");
    setCountdown(0);
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
        
        {step === 'form' && (
          <>
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
                      <button 
                        type="button" 
                        className="text-sm text-v0-purple hover:underline"
                        onClick={() => { setMode('forgot-password'); setError(''); setSuccess(''); }}
                      >
                        Forgot password?
                      </button>
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
            ) : mode === 'signup' ? (
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
            ) : (
              <>
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                  <CardDescription>Enter your email to receive a password reset code.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <form className="grid gap-4" onSubmit={handleForgotPassword}>
                    <div className="grid gap-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input id="reset-email" type="email" placeholder="name@company.com" required value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Code"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Remember your password?{" "}
                      <button type="button" className="text-v0-purple hover:underline" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>
                        Back to login
                      </button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}
          </>
        )}

        {step === 'otp' && (
          <>
            <CardHeader className="space-y-1 text-center">
              <button
                className="absolute top-3 left-3 text-gray-400 hover:text-gray-700"
                onClick={goBack}
                aria-label="Go back"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <CardTitle className="text-2xl font-bold">
                {otpType === 'verification' ? 'Verify your email' : 'Reset your password'}
              </CardTitle>
              <CardDescription>
                {otpType === 'verification' 
                  ? 'Enter the 6-digit code sent to your email to verify your account.'
                  : 'Enter the 6-digit code sent to your email to reset your password.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form className="grid gap-4" onSubmit={otpType === 'verification' ? handleVerifyOTP : handleVerifyResetOTP}>
                <div className="grid gap-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Didn&apos;t receive the code?{" "}
                  <button 
                    type="button" 
                    className={`text-v0-purple hover:underline ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleResendOTP}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
                  </button>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {step === 'reset-password' && (
          <>
            <CardHeader className="space-y-1 text-center">
              <button
                className="absolute top-3 left-3 text-gray-400 hover:text-gray-700"
                onClick={goBack}
                aria-label="Go back"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <CardTitle className="text-2xl font-bold">Set new password</CardTitle>
              <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form className="grid gap-4" onSubmit={handleResetPassword}>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
} 