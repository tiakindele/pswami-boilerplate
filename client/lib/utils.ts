import { Axios, AxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function titleize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function deviseErrorToMessage(error: Error): string | undefined {
  const asAxiosError = error as AxiosError<{ error: string; errors: Record<string, string[]> | string[] }>;
  const { response } = asAxiosError;
  let message: string | undefined;

  // Check if `error` is present directly
  if (response?.data?.error) {
    message = response.data.error;
  }
  // Check if `errors` is an object and handle accordingly
  else if (response?.data?.errors && typeof response.data.errors === 'object' && !Array.isArray(response.data.errors)) {
    message = Object.entries(response.data.errors)
      .map(([key, value]) => `${titleize(key)} ${value.join(", ")}`)
      .join(", ");
  }
  // Check if `errors` is an array and join the strings
  else if (Array.isArray(response?.data?.errors)) {
    message = response.data.errors.join(", ");
  }

  return message;
}
