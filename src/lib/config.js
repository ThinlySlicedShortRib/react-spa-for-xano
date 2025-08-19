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
  return import.meta.env[key] ?? defaultValue;
}

/**
 * Get boolean environment variable
 * @param {string} key - Environment variable key
 * @param {boolean} defaultValue - Default boolean value
 * @returns {boolean} Boolean value
 */
function getBooleanEnv(key, defaultValue = false) {
  const value = getEnv(key);
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Get number environment variable
 * @param {string} key - Environment variable key
 * @param {number} defaultValue - Default number value
 * @returns {number} Number value
 */
function getNumberEnv(key, defaultValue = 0) {
  const value = getEnv(key);
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
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
    baseUrl: getEnv("VITE_API_BASE_URL", "/api"),
    timeout: getNumberEnv("VITE_API_TIMEOUT", 10000),
  },

  // Feature Flags
  features: {
    debug: getBooleanEnv("VITE_ENABLE_DEBUG", true),
  },
};

/**
 * Validate required environment variables
 * Call this during app initialization to catch missing config early
 */
export function validateConfig() {
  const required = ["VITE_API_BASE_URL"];

  const missing = required.filter((key) => !getEnv(key));

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(
      ", "
    )}`;
    console.error(message);

    if (config.isProduction) {
      throw new Error(message);
    } else {
      console.warn(
        "⚠️  Some environment variables are missing. Check .env.example for reference."
      );
    }
  }
}

/**
 * Log configuration in development
 */
export function logConfig() {
  if (config.isDevelopment && config.features.debug) {
    console.group("🔧 Application Configuration");
    console.log("Environment:", config.mode);
    console.log("API Base URL:", config.api.baseUrl);
    console.log("Features:", config.features);
    console.log("Full config:", config);
    console.groupEnd();
  }
}

// Auto-validate and log on import
validateConfig();
logConfig();

export default config;
