import axios from 'axios'
import toast from 'react-hot-toast'
import { getCookie, deleteCookie } from './cookies'
import { config as appConfig } from './config'

/**
 * HTTP client with interceptors and error handling
 * Features: JWT token injection, error handling, auth redirects
 */

// Create axios instance with default config
const httpClient = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: appConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor - automatically inject Bearer token
 */
httpClient.interceptors.request.use(
  (config) => {
    const token = getCookie('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log request in development
    if (appConfig.isDevelopment) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data)
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

/**
 * Response interceptor - handle errors and auth redirects
 */
httpClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (appConfig.isDevelopment) {
      console.log(`📥 ${response.status} ${response.config.url}`, response.data)
    }
    
    return response
  },
  (error) => {
    const { response, config } = error
    
    // Log error in development
    if (appConfig.isDevelopment) {
      console.error(`❌ ${config?.method?.toUpperCase()} ${config?.url}`, {
        status: response?.status,
        data: response?.data,
        message: error.message,
      })
    }
    
    // Handle auth errors - redirect to login
    if (response?.status === 401) {
      deleteCookie('authToken')
      toast.error('Session expired. Please log in again.')
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    // Handle other common HTTP errors with toast notifications
    else if (response?.status === 403) {
      toast.error('Access denied. You do not have permission.')
    }
    else if (response?.status === 404) {
      toast.error('Resource not found.')
    }
    else if (response?.status === 429) {
      toast.error('Too many requests. Please wait and try again.')
    }
    else if (response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    }
    else if (response?.status >= 400) {
      // Generic client error with server message if available
      const message = response?.data?.message || 'Request failed. Please check your input.'
      toast.error(message)
    }
    
    // Create structured error object
    const structuredError = {
      message: error.message,
      status: response?.status,
      statusText: response?.statusText,
      data: response?.data,
      url: config?.url,
      method: config?.method,
    }
    
    return Promise.reject(structuredError)
  }
)

export default httpClient

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  get: (url, config) => httpClient.get(url, config),
  post: (url, data, config) => httpClient.post(url, data, config),
  put: (url, data, config) => httpClient.put(url, data, config),
  patch: (url, data, config) => httpClient.patch(url, data, config),
  delete: (url, config) => httpClient.delete(url, config),
}

/**
 * File upload with progress tracking
 */
export function uploadFile(url, file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)
  
  return httpClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    },
  })
} 