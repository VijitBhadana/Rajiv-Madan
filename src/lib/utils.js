import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind class lists, letting later classes win (shadcn's `cn`).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
