import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

const CourseNavbar = () => {
  const [user, setUser] = useState<{ name?: string; avatar?: string } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3001/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        // ignore
      }
    }
    fetchUser();
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

  return (
  <header className="bg-white border-b-0 px-6 py-4 w-full fixed top-0 left-0 right-0 z-50">
    <div className="flex items-center justify-between w-full">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          uncommon
        </Link>
      </div>
      {/* Center: Nav Links */}
      <nav className="flex-1 flex justify-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            Home
        </a>
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
        </a>
          <a href="/courses" className="text-gray-600 hover:text-gray-900">
          Courses
        </a>
      </nav>
      {/* Right: User */}
      <div className="flex-1 flex justify-end items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/profile'}>
        <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
            <span className="text-sm font-medium">{user?.name || ""}</span>
          </div>
      </div>
    </div>
    <div className="w-full border-b border-gray-100 absolute left-0 right-0 bottom-0" />
  </header>
)
}

export default CourseNavbar 