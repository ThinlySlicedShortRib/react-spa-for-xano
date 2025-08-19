import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * React Query client with smart configuration
 * Features: Smart retry logic, cache management, error handling
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Cache time - how long inactive data stays in cache
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry configuration - no retry for 4xx errors
      retry: (failureCount, error) => {
        // Don't retry 4xx errors (client errors)
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }

        // Retry server errors (5xx) up to 3 times
        return failureCount < 3;
      },

      // Exponential backoff for retries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Background refetch settings
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,

      // Network mode configuration
      networkMode: "online",
    },
    mutations: {
      // Retry configuration for mutations
      retry: (failureCount, error) => {
        // Don't retry 4xx errors for mutations
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }

        // Retry server errors up to 2 times for mutations
        return failureCount < 2;
      },

      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});

/**
 * Query key factory for consistent and type-safe key generation
 * Hierarchical organization by domain/feature
 */
export const queryKeys = {
  // Auth domain
  auth: {
    all: ["auth"],
    user: () => [...queryKeys.auth.all, "user"],
    profile: () => [...queryKeys.auth.all, "profile"],
  },

  // Users domain
  users: {
    all: ["users"],
    list: (filters) => [...queryKeys.users.all, "list", filters],
    detail: (id) => [...queryKeys.users.all, "detail", id],
  },
};

/**
 * Global error handler for React Query
 * Auto-initializes when queryClient is imported
 */
function setupGlobalErrorHandler() {
  queryClient.setMutationDefaults(["mutation"], {
    onError: (error) => {
      console.error("Mutation error:", error);

      // Don't show toast for errors already handled by axios interceptor
      // Only handle network errors or other uncaught errors
      if (!error?.status) {
        toast.error("Network error. Please check your connection.");
      }
    },
  });

  // Set default query error handler
  queryClient.setQueryDefaults(["query"], {
    onError: (error) => {
      console.error("Query error:", error);

      // Don't show toast for errors already handled by axios interceptor
      // Only handle network errors or other uncaught errors
      if (!error?.status) {
        toast.error("Failed to load data. Please check your connection.");
      }
    },
  });
}

// Auto-initialize global error handling when this module is imported
setupGlobalErrorHandler();

export default queryClient;
