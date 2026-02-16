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
