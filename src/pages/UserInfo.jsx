import { useState, useEffect } from "react";
import {
  User,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Shield,
  Activity,
  Settings,
  Database,
  AlertTriangle,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useUser,
  useUpdateProfile,
  useChangePassword,
  useLogout,
} from "../hooks/useAuth";
import RequestStatusDisplay from "../components/ui/RequestStatusDisplay";
import { ApiButton } from "../components/ui/ApiButton";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { cn } from "../lib/utils";
import { config } from "../lib/config";
import { profileSchema, passwordChangeSchema } from "../lib/validation";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/Tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";

/**
 * UserInfo page - Template Features Showcase
 *
 * This page demonstrates all the key features of this React SPA template:
 *
 * 🔄 DATA FETCHING:
 * - useUser() hook for fetching user data with React Query
 * - Automatic caching, background refetching, and error retry
 * - Loading states and error handling
 *
 * 🚀 MUTATIONS:
 * - useUpdateProfile() for optimistic updates with cache invalidation
 * - useChangePassword() for form submissions with validation
 * - Automatic loading states via ApiButton component
 *
 * 🎯 VALIDATION:
 * - Zod schemas for type-safe validation
 * - React Hook Form for performant form management
 * - Real-time validation with onBlur mode
 * - Cross-field validation (password confirmation)
 *
 * 🛠️ ERROR HANDLING:
 * - RequestStatusDisplay for consistent error/success feedback
 * - Development-only debug panels with API response data
 * - Toast notifications for user feedback
 * - Error boundaries for graceful degradation
 *
 * 🎨 UI/UX FEATURES:
 * - Responsive design with Tailwind CSS
 * - Loading states and optimistic updates
 * - Form state management with validation
 * - Accessibility with proper ARIA labels
 *
 * 🔍 DEBUGGING:
 * - Debug panels showing raw API data (development only)
 * - Console logging for API responses
 * - React Query DevTools integration
 * - Environment configuration display
 */

export function UserInfo() {
  const { data: user, isLoading, error } = useUser();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const logoutMutation = useLogout();

  const [isEditing, setIsEditing] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error simulation for showcasing RequestStatusDisplay
  const [simulatedError, setSimulatedError] = useState(null);
  const [isSimulatingError, setIsSimulatingError] = useState(false);

  // Profile form with React Hook Form + Zod validation
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: resetProfile,
    setValue: setProfileValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
  });

  // Password form with React Hook Form + Zod validation
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
    mode: "onBlur",
  });

  // Initialize profile form when user loads
  useEffect(() => {
    if (user) {
      setProfileValue("name", user.name || "");
      setProfileValue("email", user.email || "");
      setProfileValue("phone", user.phone || "");
      setProfileValue("bio", user.bio || "");
    }
  }, [user, setProfileValue]);

  const onProfileSubmit = (data) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const onPasswordSubmit = (data) => {
    changePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          resetPassword();
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form to current user data
    if (user) {
      setProfileValue("name", user.name || "");
      setProfileValue("email", user.email || "");
      setProfileValue("phone", user.phone || "");
      setProfileValue("bio", user.bio || "");
    }
  };

  // Error simulation functions for showcasing RequestStatusDisplay
  const simulateNetworkError = () => {
    setIsSimulatingError(true);
    setSimulatedError(null);

    setTimeout(() => {
      setSimulatedError({
        message: "Network Error",
        status: 0,
        statusText: "Network Error",
        data: {
          message:
            "Failed to connect to server. Please check your internet connection.",
        },
      });
      setIsSimulatingError(false);
    }, 2000);
  };

  const simulateServerError = () => {
    setIsSimulatingError(true);
    setSimulatedError(null);

    setTimeout(() => {
      setSimulatedError({
        message: "Internal Server Error",
        status: 500,
        statusText: "Internal Server Error",
        data: {
          message: "Something went wrong on our end. Please try again later.",
        },
      });
      setIsSimulatingError(false);
    }, 2000);
  };

  const simulateValidationError = () => {
    setIsSimulatingError(true);
    setSimulatedError(null);

    setTimeout(() => {
      setSimulatedError({
        message: "Validation Error",
        status: 400,
        statusText: "Bad Request",
        data: {
          message: "Invalid input data",
          errors: {
            email: "Email is already taken",
            name: "Name must be at least 2 characters",
          },
        },
      });
      setIsSimulatingError(false);
    }, 2000);
  };

  const clearSimulatedError = () => {
    setSimulatedError(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Loading user profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <RequestStatusDisplay
          mutation={{ error, isPending: false, isSuccess: false }}
          className="mb-6"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Feature Showcase */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">Template Features Showcase</p>
        </div>
        {config.isDevelopment && (
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            {showDebug ? "Hide" : "Show"} Debug Data
          </button>
        )}
      </div>

      {/* Debug Panel (Development Only) */}
      {config.isDevelopment && showDebug && (
        <div className="bg-gray-50 border rounded-md p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Debug Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">
                User Data
              </h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                {JSON.stringify({ user, isLoading, error }, null, 2)}
              </pre>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-2">
                Environment Config
              </h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                {JSON.stringify(
                  {
                    mode: config.mode,
                    api: config.api,
                    features: config.features,
                    ui: config.ui,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Error Simulation Panel (Development Only) */}
      {config.isDevelopment && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-yellow-800 flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4" />
            Error Simulation (Dev Only)
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-yellow-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Test different error scenarios to see RequestStatusDisplay in
                  action
                </p>
              </TooltipContent>
            </Tooltip>
          </h3>
          <p className="text-xs text-yellow-700 mb-3">
            Test different error scenarios to see RequestStatusDisplay in
            action:
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={simulateNetworkError}
              disabled={isSimulatingError}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
            >
              {isSimulatingError ? "Simulating..." : "Network Error"}
            </button>
            <button
              onClick={simulateServerError}
              disabled={isSimulatingError}
              className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200 disabled:opacity-50"
            >
              {isSimulatingError ? "Simulating..." : "Server Error (500)"}
            </button>
            <button
              onClick={simulateValidationError}
              disabled={isSimulatingError}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
            >
              {isSimulatingError ? "Simulating..." : "Validation Error (400)"}
            </button>
            {simulatedError && (
              <button
                onClick={clearSimulatedError}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Clear Error
              </button>
            )}
          </div>
        </div>
      )}

      {/* Simulated Error Display */}
      {simulatedError && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Simulated Error Response
          </h3>
          <RequestStatusDisplay
            mutation={{
              error: simulatedError,
              isPending: isSimulatingError,
              isSuccess: false,
            }}
            className="mb-4"
          />
          <div className="text-xs text-gray-500">
            <p>
              <strong>Error Details:</strong>
            </p>
            <pre className="mt-1 bg-gray-50 p-2 rounded text-xs overflow-x-auto">
              {JSON.stringify(simulatedError, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Avatar and Basic Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-medium">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
                {user?.role && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {user.role}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Account Stats
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>View your account statistics and activity information</p>
                </TooltipContent>
              </Tooltip>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since</span>
                <span className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last login</span>
                <span className="font-medium">
                  {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Manage your account security settings and authentication
                  </p>
                </TooltipContent>
              </Tooltip>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Two-factor auth</span>
                <span className="text-gray-400">Not enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Login sessions</span>
                <span className="text-blue-600 text-sm">1 active</span>
              </div>
            </div>

            {/* Logout Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to logout? You'll need to sign in
                      again to access your account.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <button
                      onClick={() => logoutMutation.mutate()}
                      disabled={logoutMutation.isPending}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                Profile Information
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Update your personal information and contact details</p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              {!isEditing && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to edit your profile information</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...registerProfile("name")}
                    disabled={!isEditing}
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
                      isEditing
                        ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed",
                      profileErrors.name &&
                        "border-red-300 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {profileErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...registerProfile("email")}
                    disabled={!isEditing}
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
                      isEditing
                        ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed",
                      profileErrors.email &&
                        "border-red-300 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {profileErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...registerProfile("phone")}
                    disabled={!isEditing}
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
                      isEditing
                        ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed",
                      profileErrors.phone &&
                        "border-red-300 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {profileErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.phone.message}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    {...registerProfile("bio")}
                    disabled={!isEditing}
                    className={cn(
                      "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
                      isEditing
                        ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed",
                      profileErrors.bio &&
                        "border-red-300 focus:ring-red-500 focus:border-red-500"
                    )}
                  />
                  {profileErrors.bio && (
                    <p className="mt-1 text-sm text-red-600">
                      {profileErrors.bio.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="mt-4 flex gap-2">
                  <ApiButton
                    mutation={updateProfileMutation}
                    type="submit"
                    loadingText="Saving..."
                    disabled={isProfileSubmitting}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </ApiButton>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}
            </form>

            <RequestStatusDisplay
              mutation={updateProfileMutation}
              successMessage="Profile updated successfully!"
              className="mt-4"
            />
          </div>

          {/* Change Password */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Change Password
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update your password with current password verification</p>
                </TooltipContent>
              </Tooltip>
            </h3>

            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...registerPassword("currentPassword")}
                      className={cn(
                        "mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                        passwordErrors.currentPassword &&
                          "border-red-300 focus:ring-red-500 focus:border-red-500"
                      )}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {showPassword ? "Hide password" : "Show password"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      {...registerPassword("newPassword")}
                      className={cn(
                        "mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                        passwordErrors.newPassword &&
                          "border-red-300 focus:ring-red-500 focus:border-red-500"
                      )}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {showNewPassword ? "Hide password" : "Show password"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...registerPassword("confirmPassword")}
                      className={cn(
                        "mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",
                        passwordErrors.confirmPassword &&
                          "border-red-300 focus:ring-red-500 focus:border-red-500"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <ApiButton
                  mutation={changePasswordMutation}
                  type="submit"
                  loadingText="Changing Password..."
                  disabled={isPasswordSubmitting}
                >
                  Change Password
                </ApiButton>
              </div>
            </form>

            <RequestStatusDisplay
              mutation={changePasswordMutation}
              successMessage="Password changed successfully!"
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
