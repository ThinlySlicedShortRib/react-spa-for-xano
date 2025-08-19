import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge for optimal Tailwind CSS composition
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date using date-fns with a consistent format
 */
export function formatDate(date) {
  // Import date-fns format function when needed
  // return format(date, format)
  return new Date(date).toLocaleDateString()
}

/**
 * Generates a random ID for form elements or keys
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Debounce function for search inputs and API calls
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value) {
  if (value == null) return true
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
} 