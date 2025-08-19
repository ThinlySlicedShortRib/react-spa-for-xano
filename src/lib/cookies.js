/**
 * Cookie utility functions with secure configuration
 * Features: Secure, SameSite: strict, path: /, 7-day expiration
 */

import { config } from './config'

const COOKIE_CONFIG = {
  secure: config.isProduction, // HTTPS only in production
  sameSite: 'strict', // CSRF protection
  path: '/', // Available site-wide
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
}

/**
 * Set a cookie with secure configuration
 */
export function setCookie(name, value, options = {}) {
  const config = { ...COOKIE_CONFIG, ...options }
  
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  
  if (config.maxAge) {
    cookieString += `; Max-Age=${config.maxAge}`
  }
  
  if (config.path) {
    cookieString += `; Path=${config.path}`
  }
  
  if (config.secure) {
    cookieString += '; Secure'
  }
  
  if (config.sameSite) {
    cookieString += `; SameSite=${config.sameSite}`
  }
  
  document.cookie = cookieString
}

/**
 * Get a cookie value by name
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null
  
  const nameEQ = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')
  
  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }
  
  return null
}

/**
 * Delete a cookie by setting expiration to past date
 */
export function deleteCookie(name) {
  setCookie(name, '', {
    maxAge: -1,
    path: '/',
  })
}

 