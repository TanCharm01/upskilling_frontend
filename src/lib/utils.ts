import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
=======

// Decodes a JWT and returns the payload as an object
export function decodeJWT(token: string | null): {
  id?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
  tagline?: string;
} | null {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    // Try id, then sub, then userId
    return {
      id: payload.id || payload.sub || payload.userId,
      firstname: payload.firstname,
      email: payload.email,
      avatar: payload.avatar,
      tagline: payload.tagline,
    };
  } catch (e) {
    return null;
  }
}
>>>>>>> feat/scaffold-pages
