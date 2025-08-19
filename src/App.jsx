import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./lib/queryClient";
import { ProtectedRoute, PublicRoute } from "./components/auth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserInfo from "./pages/UserInfo";
import ErrorFallback from "./pages/ErrorFallback";
import { config } from "./lib/config";

/**
 * Main App component with routing and React Query setup
 * Features: Protected routes, auth redirects, query client provider
 */

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to console in development
        if (config.isDevelopment) {
          console.error("Error Boundary caught an error:", error, errorInfo);
        }

        // In production, you would send this to an error reporting service
        // Example: Sentry.captureException(error, { extra: errorInfo })
      }}
      onReset={() => {
        // Clear any state that might be causing the error
        queryClient.clear();
        window.location.reload();
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Nested routes within Layout */}
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<UserInfo />} />
              <Route
                path="settings"
                element={
                  <div className="p-8">
                    <h1 className="text-2xl">Settings Page</h1>
                    <p>Coming soon...</p>
                  </div>
                }
              />
            </Route>

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>

        {/* React Query DevTools - only in development */}
        {config.isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
