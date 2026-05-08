import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatYear(year: number) {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year === 2026) return "Present";
  return `${year} CE`;
}
