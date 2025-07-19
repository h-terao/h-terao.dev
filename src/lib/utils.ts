import clsx from "clsx";
import { type ClassNameValue, twMerge } from "tailwind-merge";

export const cn = (...classes: ClassNameValue[]) => {
  return twMerge(clsx(classes));
};

/**
 * Formats a date to a human-readable string.
 *
 * @param date - The date to format.
 * @returns A formatted date string in the format "MMM dd, yyyy".
 */
export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
