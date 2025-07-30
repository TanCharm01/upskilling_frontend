"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { decodeJWT, buildApiUrl } from "@/lib/utils";

type AdminData = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
};

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch admin data from backend
  useEffect(() => {
    const fetchAdmin = async () => {
      // Only run on client side
      if (typeof window === 'undefined') return;
      
      try {
        const token = localStorage.getItem('admin_token');
        if (!token) {
          setError('No admin token found');
          setLoading(false);
          return;
        }

        const adminInfo = decodeJWT(token);
        if (!adminInfo?.id) {
          setError('Invalid admin token');
          setLoading(false);
          return;
        }

        const response = await fetch(buildApiUrl(`admins/profile/${adminInfo.id}`), {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admin profile');
        }

        const adminData = await response.json();
        setAdmin(adminData);
        setFormData({ 
          firstname: adminData.firstname || "", 
          lastname: adminData.lastname || "", 
          email: adminData.email || "" 
        });
      } catch (error) {
        console.error('Error fetching admin profile:', error);
        setError('Failed to load admin profile');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setError('No admin token found');
        setSaving(false);
        return;
      }

      const adminInfo = decodeJWT(token);
      if (!adminInfo?.id) {
        setError('Invalid admin token');
        setSaving(false);
        return;
      }

      const response = await fetch(buildApiUrl(`admins/profile/${adminInfo.id}`), {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update admin profile');
      }

      const updatedAdmin = await response.json();
      setAdmin(updatedAdmin);
      setEditing(false);
    } catch (error) {
      console.error('Error updating admin profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  if (!admin) {
    return <div className="p-10 text-center text-gray-500">No admin data found</div>;
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>

      <div className="flex items-center space-x-6 mb-6">
        <Image
          src={admin.avatar || "/default-avatar.png"}
          alt="Profile picture"
          width={100}
          height={100}
          className="rounded-full border shadow-md"
        />
        <div>
          <p className="text-xl font-semibold">{`${admin.firstname} ${admin.lastname}`}</p>
          <p className="text-gray-500">{admin.email}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mt-1">
            {admin.role}
          </span>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-medium">Account Details</h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 w-1/3">First Name:</span>
            {editing ? (
              <input
                name="firstname"
                className="border px-2 py-1 rounded w-2/3"
                value={formData.firstname}
                onChange={handleChange}
              />
            ) : (
              <span className="w-2/3">{admin.firstname}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 w-1/3">Last Name:</span>
            {editing ? (
              <input
                name="lastname"
                className="border px-2 py-1 rounded w-2/3"
                value={formData.lastname}
                onChange={handleChange}
              />
            ) : (
              <span className="w-2/3">{admin.lastname}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 w-1/3">Email:</span>
            {editing ? (
              <input
                name="email"
                className="border px-2 py-1 rounded w-2/3"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <span className="w-2/3">{admin.email}</span>
            )}
          </div>
        </div>

        <div className="pt-4">
          {editing ? (
            <div className="space-x-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
