import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { useState } from "react";
import { config } from "../lib/config";

/**
 * Error fallback component for error boundaries
 * Features: User-friendly error display, retry actions, debug details
 */

export function ErrorFallback({ error, resetErrorBoundary }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but something unexpected happened. Please try
            refreshing the page or go back to the homepage.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={resetErrorBoundary}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>

            <div className="flex space-x-3">
              <button
                onClick={handleReload}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Page
              </button>

              <button
                onClick={handleGoHome}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </button>
            </div>
          </div>

          {/* Debug Details (Development Only) */}
          {config.isDevelopment && (
            <div className="mt-6 text-left">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Bug className="h-4 w-4 mr-1" />
                {showDetails ? "Hide" : "Show"} Error Details
              </button>

              {showDetails && (
                <div className="mt-3 p-3 bg-gray-100 rounded-md text-xs">
                  <div className="font-medium text-gray-700 mb-2">
                    Error Details:
                  </div>
                  <div className="text-red-600 font-mono whitespace-pre-wrap break-all">
                    {error?.message}
                  </div>
                  {error?.stack && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                        Stack Trace
                      </summary>
                      <pre className="mt-1 text-xs text-gray-600 overflow-x-auto">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
