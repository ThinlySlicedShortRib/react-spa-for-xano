import { api } from "../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../lib/cookies";

/**
 * Authentication service with login/logout/user management
 * Features: JWT token management, user data fetching, auth utilities
 *
 * 🎭 DEMO MODE ACTIVE:
 * - All API calls are commented out and replaced with dummy data
 * - Any email/password combination will work for login
 * - Profile updates and password changes are simulated
 * - To enable real authentication, uncomment the API calls marked with "DEMO MODE"
 */

/**
 * Login with email and password
 */
export async function login(email, password) {
  console.log("🔐 [AUTH] Login started at:", new Date().toISOString());
  console.log("🔐 [AUTH] Email:", email);

  // ==================== DEMO MODE ====================
  // Comment out for production - replace with real API call

  // const response = await api.post('/auth/login', {
  //   email,
  //   password,
  // })
  // const { token, user } = response.data

  // DUMMY DATA for development/demo
  const dummyToken = "dummy_jwt_token_" + Date.now();
  const dummyUser = {
    id: 1,
    name: "Test User",
    email: "user@test.com",
    role: "user",
    phone: "+1 (555) 123-4567",
    bio: "This is a demo user account for testing the React SPA template.",
    avatar: null,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  };

  console.log("🔐 [AUTH] Starting simulated delay...");
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("🔐 [AUTH] Delay completed, starting validation...");

  // Simulate login validation (only accept specific credentials for demo)
  if (!email || !password) {
    console.log("❌ [AUTH] Validation failed: Missing email or password");
    throw new Error("Email and password are required");
  }

  // Only allow specific demo credential
  if (email !== "user@test.com" || password !== "123456") {
    console.log("❌ [AUTH] Validation failed: Invalid credentials");
    throw new Error("Invalid email or password");
  }

  console.log("✅ [AUTH] Validation passed, preparing response...");
  const token = dummyToken;
  const user = dummyUser;

  // ==================== END DEMO MODE ====================

  console.log("🍪 [AUTH] Setting cookie...");
  // Store token in secure cookie
  if (token) {
    setCookie("authToken", token);
  }

  console.log("🔐 [AUTH] Login completed at:", new Date().toISOString());
  console.log("🔐 [AUTH] Total login time:", Date.now() - new Date().getTime());
  return { token, user };
}

/**
 * Logout and clear authentication
 */
export async function logout() {
  try {
    // ==================== DEMO MODE ====================
    // Comment out for production - replace with real API call

    // await api.post('/auth/logout')

    // DEMO: Just simulate a logout delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Demo logout - no server call made");

    // ==================== END DEMO MODE ====================
  } catch (error) {
    // Continue with client-side logout even if server call fails
    console.warn("Logout endpoint failed:", error);
  } finally {
    // Always clear client-side auth state
    deleteCookie("authToken");
  }
}

/**
 * Get current user data from API
 */
export async function getCurrentUser() {
  // ==================== DEMO MODE ====================
  // Comment out for production - replace with real API call

  // const response = await api.get('/auth/me')
  // return response.data

  // DUMMY USER DATA for development/demo
  const dummyUser = {
    id: 1,
    name: "Test User",
    email: "user@test.com",
    role: "admin",
    phone: "+1 (555) 123-4567",
    bio: "This is a demo user account for testing the React SPA template. You can edit this profile to test the update functionality.",
    avatar: null,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    preferences: {
      theme: "light",
      notifications: true,
      language: "en",
    },
  };

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return dummyUser;

  // ==================== END DEMO MODE ====================
}

/**
 * Refresh user profile data
 */
export async function refreshUser() {
  // ==================== DEMO MODE ====================
  // Comment out for production - replace with real API call

  // const response = await api.get('/auth/me')
  // return response.data

  // Use same dummy data as getCurrentUser
  return getCurrentUser();

  // ==================== END DEMO MODE ====================
}

/**
 * Update user profile
 */
export async function updateProfile(profileData) {
  // ==================== DEMO MODE ====================
  // Comment out for production - replace with real API call

  // const response = await api.patch('/auth/profile', profileData)
  // return response.data

  // DEMO: Simulate successful profile update
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return updated user data (merge with existing dummy data)
  const updatedUser = {
    id: 1,
    ...profileData,
    role: "admin", // Keep role unchanged
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    preferences: {
      theme: "light",
      notifications: true,
      language: "en",
    },
  };

  console.log("Demo: Profile updated successfully", updatedUser);
  return updatedUser;

  // ==================== END DEMO MODE ====================
}

/**
 * Change password
 */
export async function changePassword(currentPassword, newPassword) {
  // ==================== DEMO MODE ====================
  // Comment out for production - replace with real API call

  // const response = await api.post('/auth/change-password', {
  //   currentPassword,
  //   newPassword,
  // })
  // return response.data

  // DEMO: Simulate password change validation and success
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Basic validation simulation
  if (!currentPassword || !newPassword) {
    throw new Error("Current password and new password are required");
  }

  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters");
  }

  console.log("Demo: Password changed successfully");
  return {
    message: "Password changed successfully",
    success: true,
  };

  // ==================== END DEMO MODE ====================
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email) {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
}

/**
 * Reset password with token
 */
export async function resetPassword(token, newPassword) {
  const response = await api.post("/auth/reset-password", {
    token,
    newPassword,
  });
  return response.data;
}

/**
 * Auth utility functions
 */

/**
 * Check if user is authenticated (has valid token)
 */
export function isAuthenticated() {
  return !!getCookie("authToken");
}

/**
 * Get stored token
 */
export function getToken() {
  return getCookie("authToken");
}

/**
 * Clear all authentication data
 */
export function clearAuth() {
  deleteCookie("authToken");
  // Could also clear other user-related data if needed
}

/**
 * Register new user account
 */
export async function register(userData) {
  const response = await api.post("/auth/register", userData);

  const { token, user } = response.data;

  // Store token in secure cookie
  if (token) {
    setCookie("authToken", token);
  }

  return { token, user };
}

export default {
  login,
  logout,
  getCurrentUser,
  refreshUser,
  updateProfile,
  changePassword,
  requestPasswordReset,
  resetPassword,
  register,
  isAuthenticated,
  getToken,
  clearAuth,
};
