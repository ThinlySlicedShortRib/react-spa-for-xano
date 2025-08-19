import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import { queryKeys } from "../lib/queryClient";
import toast from "react-hot-toast";

/**
 * Authentication hooks using React Query
 * Features: Login, logout, auth status, user data management
 */

/**
 * Login mutation hook
 */
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }) => {
      console.log('🚀 [HOOK] Login mutation started at:', new Date().toISOString());
      return authService.login(email, password);
    },
    retry: false, // Disable retries for login - we don't want to retry failed login attempts
    onSuccess: (data) => {
      console.log('✅ [HOOK] Login mutation successful at:', new Date().toISOString());
      console.log('✅ [HOOK] User data received:', data.user);
      
      // Set user data in cache
      console.log('💾 [HOOK] Setting user data in cache...');
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Show success message
      console.log('🎉 [HOOK] Showing toast notification...');
      toast.success("Welcome back!");

      // Redirect to dashboard
      console.log('📍 [HOOK] Navigating to dashboard...');
      navigate("/");
      console.log('✅ [HOOK] Login flow completed at:', new Date().toISOString());
    },
    onError: (error) => {
      console.log('❌ [HOOK] Login mutation failed at:', new Date().toISOString());
      console.log('❌ [HOOK] Error:', error);
    },
  });
}

/**
 * Logout mutation hook
 */
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      // Show success message
      toast.success("Logged out successfully");

      // Redirect to login
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Still redirect even if logout call fails
      queryClient.clear();
      navigate("/login");
    },
  });
}

/**
 * Get current user data
 */
export function useUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: authService.getCurrentUser,
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry if not authenticated
      if (error?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

/**
 * Auth status hook - checks if user is authenticated
 */
export function useAuthStatus() {
  const { data: user, isLoading, error } = useUser();

  return {
    isAuthenticated: authService.isAuthenticated() && !!user,
    isLoading,
    user,
    error,
  };
}

/**
 * Require authentication hook - redirects if not authenticated
 */
export function useRequireAuth() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStatus();

  // Redirect to login if not authenticated and not loading
  if (!isLoading && !isAuthenticated) {
    navigate("/login");
  }

  return { isAuthenticated, isLoading };
}

/**
 * Update profile mutation
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedUser) => {
      // Update user data in cache
      queryClient.setQueryData(queryKeys.auth.user(), updatedUser);

      // Show success message
      toast.success("Profile updated successfully");

      // Optionally invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
  });
}

/**
 * Change password mutation
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }) =>
      authService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
  });
}

/**
 * Register mutation hook
 */
export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      // Set user data in cache
      queryClient.setQueryData(queryKeys.auth.user(), data.user);

      // Redirect to dashboard
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

/**
 * Password reset request mutation
 */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: authService.requestPasswordReset,
    onError: (error) => {
      console.error("Password reset request failed:", error);
    },
  });
}

/**
 * Password reset mutation
 */
export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ token, newPassword }) =>
      authService.resetPassword(token, newPassword),
    onSuccess: () => {
      // Redirect to login after successful reset
      navigate("/login");
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });
}

/**
 * Manual logout function (for use in components)
 */
export function useManualLogout() {
  const logout = useLogout();

  return {
    logout: logout.mutate,
    isLoading: logout.isPending,
  };
}
