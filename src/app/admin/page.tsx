'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminAuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const router = useRouter();

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
      const res = await fetch('http://localhost:3001/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem('admin_token', data.access_token);
        setSuccess('Login successful!');
        setTimeout(() => {
          setLoading(false);
          setSuccess('');
          router.push('/admin/dashboard');
        }, 800);
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
      const res = await fetch('http://localhost:3001/auth/admin/register', {
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
      if (res.ok && data.access_token) {
        localStorage.setItem('admin_token', data.access_token);
        setSuccess('Signup successful!');
        setTimeout(() => {
          setLoading(false);
          setSuccess('');
          router.push('/admin/dashboard');
        }, 800);
      } else {
        setError(data.message || 'Signup failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Card className="relative w-full max-w-md rounded-xl shadow-lg z-10">
        {mode === 'login' ? (
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
              </form>
            </CardContent>
          </>
        ) : (
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
      </Card>
    </div>
  );
}
