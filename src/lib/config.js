/**
 * Environment configuration utility
 * Features: Centralized env var access, validation, type conversion
 */

/**
 * Get environment variable with optional default value
 * @param {string} key - Environment variable key
 * @param {any} defaultValue - Default value if env var is not set
 * @returns {string|undefined} Environment variable value
 */
function getEnv(key, defaultValue = undefined) {
  return import.meta.env[key] ?? defaultValue
}

/**
 * Get boolean environment variable
 * @param {string} key - Environment variable key
 * @param {boolean} defaultValue - Default boolean value
 * @returns {boolean} Boolean value
 */
function getBooleanEnv(key, defaultValue = false) {
  const value = getEnv(key)
  if (value === undefined) return defaultValue
  return value === 'true' || value === '1' || value === 'yes'
}

/**
 * Get number environment variable
 * @param {string} key - Environment variable key
 * @param {number} defaultValue - Default number value
 * @returns {number} Number value
 */
function getNumberEnv(key, defaultValue = 0) {
  const value = getEnv(key)
  if (value === undefined) return defaultValue
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

/**
 * Application configuration object
 */
export const config = {
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // API Configuration
  api: {
    baseUrl: getEnv('VITE_API_BASE_URL', '/api'),
    timeout: getNumberEnv('VITE_API_TIMEOUT', 10000),
  },

  // Application Settings
  app: {
    name: getEnv('VITE_APP_NAME', 'React SPA Template'),
    version: getEnv('VITE_APP_VERSION', '1.0.0'),
  },

  // Authentication & Security
  auth: {
    tokenExpiresIn: getNumberEnv('VITE_TOKEN_EXPIRES_IN', 60),
    cookieSecure: getBooleanEnv('VITE_COOKIE_SECURE', false),
    cookieSameSite: getEnv('VITE_COOKIE_SAME_SITE', 'lax'),
    storagePrefix: getEnv('VITE_STORAGE_PREFIX', 'spa_template_'),
  },

  // Feature Flags
  features: {
    devtools: getBooleanEnv('VITE_ENABLE_DEVTOOLS', true),
    debug: getBooleanEnv('VITE_ENABLE_DEBUG', true),
    analytics: getBooleanEnv('VITE_ENABLE_ANALYTICS', false),
    errorReporting: getBooleanEnv('VITE_ENABLE_ERROR_REPORTING', false),
    mockApi: getBooleanEnv('VITE_USE_MOCK_API', false),
  },

  // UI & UX Settings
  ui: {
    toastDuration: getNumberEnv('VITE_TOAST_DURATION', 4000),
    loadingDelay: getNumberEnv('VITE_LOADING_DELAY', 200),
  },

  // External Services
  // services: {
  //   sentry: {
  //     dsn: getEnv('VITE_SENTRY_DSN'),
  //     enabled: getBooleanEnv('VITE_ENABLE_ERROR_REPORTING', false),
  //   },
  //   analytics: {
  //     gaTrackingId: getEnv('VITE_GA_TRACKING_ID'),
  //     enabled: getBooleanEnv('VITE_ENABLE_ANALYTICS', false),
  //   },
  //   upload: {
  //     maxSize: getNumberEnv('VITE_UPLOAD_MAX_SIZE', 10485760), // 10MB
  //     allowedTypes: getEnv('VITE_UPLOAD_ALLOWED_TYPES', 'image/jpeg,image/png,application/pdf'),
  //   },
  // },

  // Social Authentication
  // social: {
  //   google: {
  //     clientId: getEnv('VITE_GOOGLE_CLIENT_ID'),
  //   },
  //   github: {
  //     clientId: getEnv('VITE_GITHUB_CLIENT_ID'),
  //   },
  // },

  // Production Settings
  production: {
    forceHttps: getBooleanEnv('VITE_FORCE_HTTPS', false),
    cdnUrl: getEnv('VITE_CDN_URL'),
    cspEnabled: getBooleanEnv('VITE_CSP_ENABLED', false),
  },
}

/**
 * Validate required environment variables
 * Call this during app initialization to catch missing config early
 */
export function validateConfig() {
  const required = [
    'VITE_API_BASE_URL',
  ]

  const missing = required.filter(key => !getEnv(key))
  
  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}`
    console.error(message)
    
    if (config.isProduction) {
      throw new Error(message)
    } else {
      console.warn('⚠️  Some environment variables are missing. Check .env.example for reference.')
    }
  }
}

/**
 * Log configuration in development
 */
export function logConfig() {
  if (config.isDevelopment && config.features.debug) {
    console.group('🔧 Application Configuration')
    console.log('Environment:', config.mode)
    console.log('API Base URL:', config.api.baseUrl)
    console.log('Features:', config.features)
    console.log('Full config:', config)
    console.groupEnd()
  }
}

// Auto-validate and log on import
validateConfig()
logConfig()

export default config