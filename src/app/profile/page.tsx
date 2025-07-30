"use client";

import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildApiUrl } from "@/lib/utils"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", tagline: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }
    fetch(buildApiUrl("dashboard"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data.user);
        setStats(data.stats);
        setForm({ name: data.user.name || "", tagline: data.user.tagline || "" });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: user?.name || "", tagline: user?.tagline || "" });
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("tagline", form.tagline);
      if (avatarFile) formData.append("avatar", avatarFile);
      const res = await fetch(buildApiUrl(`users/${user.id}`), {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setUser(updated);
      setEditMode(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh] text-gray-500">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-[60vh] text-red-500">{error}</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 py-12 px-4">
      <Card className="max-w-lg w-full shadow-lg border-2 border-blue-100 p-8 flex flex-col items-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24">
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt={form.name || "User"} />
            ) : user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name || "User"} />
            ) : (
              <AvatarFallback className="text-3xl font-bold">{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
            )}
          </Avatar>
          {editMode && (
            <button
              className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700"
              onClick={() => fileInputRef.current?.click()}
              type="button"
              title="Change avatar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1-3 3L5 15v4h4l8.5-8.5a2.121 2.121 0 0 0-3-3z" /></svg>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </button>
          )}
        </div>
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="mb-2 px-4 py-2 border rounded w-full text-center"
              placeholder="Your name"
            />
            <textarea
              name="tagline"
              value={form.tagline}
              onChange={handleInputChange}
              className="mb-4 px-4 py-2 border rounded w-full text-center"
              placeholder="Your tagline"
              rows={2}
            />
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || "User"}</h1>
            {user?.tagline && <p className="text-gray-600 mb-4">{user.tagline}</p>}
            <Button className="mb-4" onClick={handleEdit}>Edit Profile</Button>
          </>
        )}
        <CardContent className="w-full mt-4">
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-700">{stats?.totalCourses ?? 0}</div>
              <div className="text-sm text-gray-500">Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{stats?.totalHours ?? 0}</div>
              <div className="text-sm text-gray-500">Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{stats?.badges ?? 0}</div>
              <div className="text-sm text-gray-500">Badges</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">{stats?.certificates ?? 0}</div>
              <div className="text-sm text-gray-500">Certificates</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
} 