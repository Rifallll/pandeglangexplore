import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGoogleMapsLink(coords: [number, number]) {
  const [lat, lng] = coords;
  // Directions (dir) jumps straight to navigation calculation from user location
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
export function getAssetPath(path: string) {
  // Ensure path doesn't start with slash if BASE_URL ends with slash, or handle cleanly
  const baseUrl = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // If path is absolute URL (http/https), return as is
  if (path.startsWith('http')) return path;

  return `${cleanBase}${cleanPath}`;
}
