import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// this function remove any reference of the data
// and return a copy, including states.
export function deepCopy(data: any) {
  return JSON.parse(JSON.stringify(data));
}