'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { buildApiUrl } from "@/lib/utils"

// OTP Input Component
function OTPInput({ value, onChange, disabled = false }: { value: string, onChange: (value: string) => void, disabled?: boolean }) {
  const handleChange = (index: number, digit: string) => {
    // Only allow digits
    if (!/^\d*$/.test(digit)) return;
    
    // Create new array from current value
    const newValue = value.split('');
    newValue[index] = digit;
    const result = newValue.join('').slice(0, 6);
    onChange(result);
    
    // Auto-focus next input if digit was entered
    if (digit && index < 5) {
      setTimeout(() => {
        const nextInput = document.getElementById(`admin-otp-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        setTimeout(() => {
          const prevInput = document.getElementById(`admin-otp-${index - 1}`);
          if (prevInput) {
            (prevInput as HTMLInputElement).focus();
          }
        }, 0);
      } else if (value[index]) {
        // Clear current input and stay in same position
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }, (_, index) => (
        <Input
          key={index}
          id={`admin-otp-${index}`}
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

export default function AdminAuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>('login');
  const [step, setStep] = useState<'form' | 'otp' | 'reset-password'>('form');
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpType, setOtpType] = useState<'verification' | 'reset'>('verification');
  const [countdown, setCountdown] = useState(0);
  
  // Password reset state
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

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
    setError('');
    setSuccess('');
    const email = form.email.trim();
    const password = form.password.trim();
    if (!email || !password) {
      setError('Please enter both email and password (no leading/trailing spaces).');
      setLoading(false);
      return;
    }
    try {
      console.log("Sending admin login request:", { email });
      const res = await fetch(buildApiUrl('auth/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log("Admin login response:", { status: res.status, data });
      if (res.ok && data.access_token) {
        localStorage.setItem('admin_token', data.access_token);
        setSuccess('Login successful!');
        setTimeout(() => {
          setLoading(false);
          setSuccess('');
          router.push('/admin/dashboard');
        }, 800);
      } else if (res.status === 401 && data.message === "Email not verified") {
        // Email not verified, show OTP verification
        setOtpEmail(email);
        setOtpType('verification');
        setStep('otp');
        setSuccess("Please verify your email with the OTP sent to your inbox.");
        setLoading(false); // Reset loading state
        startCountdown();
      } else {
        setError(data.message || 'Login failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const email = form.email.trim();
    const password = form.password.trim();
    const firstname = form.firstname.trim();
    const lastname = form.lastname.trim();
    if (!email || !password || !firstname || !lastname) {
      setError('Please fill all fields (no leading/trailing spaces).');
      setLoading(false);
      return;
    }
    try {
      console.log("Sending admin signup request:", { email, firstname, lastname });
      const res = await fetch(buildApiUrl('auth/admin/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        })
      });
      const data = await res.json();
      console.log("Admin signup response:", { status: res.status, data });
      if (res.ok) {
        setOtpEmail(email);
        setOtpType('verification');
        setStep('otp');
        setSuccess("Registration successful! Please verify your email with the OTP sent to your inbox.");
        setLoading(false); // Reset loading state
        startCountdown();
      } else {
        setError(data.message || 'Signup failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error');
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

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (otpType === 'reset') {
        // Handle reset OTP verification
        console.log("Sending admin reset OTP verification request:", { email: otpEmail, otp });
        const res = await fetch(buildApiUrl("auth/verify-reset-otp"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: otpEmail, otp })
        });
        const data = await res.json();
        console.log("Admin reset OTP verification response:", { status: res.status, data });
        if (res.ok) {
          setStep('reset-password');
          setSuccess("OTP verified! Please enter your new password.");
        } else {
          setError(data.message || "OTP verification failed");
        }
      } else {
        // Handle verification OTP
        console.log("Sending admin OTP verification request:", { email: otpEmail, otp });
        const res = await fetch(buildApiUrl("auth/verify-email"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: otpEmail, otp })
        });
        const data = await res.json();
        console.log("Admin OTP verification response:", { status: res.status, data });
        if (res.ok && data.access_token) {
          localStorage.setItem("admin_token", data.access_token);
          setSuccess("Email verification successful! Redirecting to admin dashboard...");
          
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
            console.log("Attempting to redirect to admin dashboard...");
            try {
              router.push("/admin/dashboard");
            } catch (error) {
              console.error("Error during redirect:", error);
            }
          }, 1500);
        } else {
          setError(data.message || "OTP verification failed");
        }
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
          setStep('form');
          setMode('login');
          setOtp("");
          setOtpEmail("");
          setOtpType('verification');
          setResetEmail("");
          setNewPassword("");
          setConfirmPassword("");
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
          purpose: otpType === 'verification' ? 'signup' : 'reset'
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

  const goBack = () => {
    setStep('form');
    setOtp("");
    setOtpEmail("");
    setOtpType('verification');
    setError("");
    setSuccess("");
    setCountdown(0);
    setResetEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Card className="relative w-full max-w-md rounded-xl shadow-lg z-10">
        {step === 'form' && (
          <>
            {mode === 'login' && (
              <>
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                  <CardDescription>Please enter your admin credentials to sign in.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="admin@company.com" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required value={form.password} onChange={handleChange} />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading} onClick={handleLogin}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Don&apos;t have an admin account?{' '}
                      <button type="button" className="text-v0-purple hover:underline" onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}>
                        Sign up
                      </button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      <button type="button" className="text-v0-purple hover:underline" onClick={() => { setMode('forgot-password'); setError(''); setSuccess(''); }}>
                        Forgot password?
                      </button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {mode === 'signup' && (
              <>
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Admin Signup</CardTitle>
                  <CardDescription>Please provide your admin details to create an account.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input id="firstname" name="firstname" placeholder="First Name" required value={form.firstname} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input id="lastname" name="lastname" placeholder="Last Name" required value={form.lastname} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="admin@company.com" required value={form.email} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required value={form.password} onChange={handleChange} />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading} onClick={handleSignup}>
                      {loading ? "Signing up..." : "Sign up"}
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Already have an admin account?{' '}
                      <button type="button" className="text-v0-purple hover:underline" onClick={() => { setMode('login'); setError(''); setSuccess(''); }}>
                        Login
                      </button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {mode === 'forgot-password' && (
              <>
                <CardHeader className="space-y-1 text-center">
                  <button
                    className="absolute top-3 left-3 text-gray-400 hover:text-gray-700"
                    onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                    aria-label="Go back"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                  <CardDescription>Enter your email address to receive a password reset code.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <form className="grid gap-4" onSubmit={handleForgotPassword}>
                    <div className="grid gap-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input 
                        id="reset-email" 
                        type="email" 
                        placeholder="admin@company.com" 
                        required 
                        value={resetEmail} 
                        onChange={(e) => setResetEmail(e.target.value)} 
                      />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <Button type="submit" className="w-full bg-v0-purple hover:bg-v0-purple/90 text-white" disabled={loading}>
                      {loading ? "Sending..." : "Send Reset Code"}
                    </Button>
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
                {otpType === 'verification' ? 'Verify your admin email' : 'Reset your password'}
              </CardTitle>
              <CardDescription>
                {otpType === 'verification' 
                  ? 'Enter the 6-digit code sent to your email to verify your admin account.'
                  : 'Enter the 6-digit code sent to your email to reset your password.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form className="grid gap-4" onSubmit={handleVerifyOTP}>
                <div className="grid gap-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <OTPInput value={otp} onChange={setOtp} disabled={false} />
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
              <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
              <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form className="grid gap-4" onSubmit={handleResetPassword}>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    required 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    required 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
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
