import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Set custom delay
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const MAX_DOCUMENT_LENGTH = 25_000;
