import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Application entry point
 * Features: React 19 StrictMode, root rendering, global error handling
 */

// Global error handlers for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  
  // In production, send to error reporting service
  // Example: Sentry.captureException(event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  
  // In production, send to error reporting service
  // Example: Sentry.captureException(event.reason)
  
  // Prevent the default behavior (logging to console)
  event.preventDefault()
})

createRoot(document.getElementById('root')).render(
  <App />
)
