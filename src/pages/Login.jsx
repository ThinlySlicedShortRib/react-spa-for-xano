import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useAuth";
import RequestStatusDisplay from "../components/ui/RequestStatusDisplay";
import { ApiButton } from "../components/ui/ApiButton";
import { cn } from "../lib/utils";
import { config } from "../lib/config";
import { loginSchema } from "../lib/validation";

/**
 * Login page with email/password form and automatic dashboard redirect
 * Features: Zod validation, React Hook Form, loading states, error handling
 */

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={cn(
                  "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400",
                  "focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                  errors.email
                    ? "border-red-300 text-red-900 placeholder-red-300"
                    : "border-gray-300"
                )}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  className={cn(
                    "block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400",
                    "focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                    errors.password
                      ? "border-red-300 text-red-900 placeholder-red-300"
                      : "border-gray-300"
                  )}
                  placeholder="Enter your password"
                />
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
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Login Status */}
          <RequestStatusDisplay
            mutation={loginMutation}
            successMessage="Login successful! Redirecting..."
          />

          {/* Submit Button */}
          <div>
            <ApiButton
              mutation={loginMutation}
              type="submit"
              loadingText="Signing in..."
              className="w-full"
              disabled={isSubmitting || !isValid}
            >
              Sign in
            </ApiButton>
          </div>

          {/* Additional Links */}
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              Create account
            </Link>
          </div>
        </form>

        {/* Demo Credentials (Development Only) */}
        {config.isDevelopment && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              🎭 Demo Mode Active
            </h4>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>
                <strong>Demo credentials (only these work):</strong>
              </p>
              <p>
                Email: <code>user@test.com</code>
              </p>
              <p>
                Password: <code>123456</code>
              </p>
              <p className="text-yellow-600 mt-2">
                ⚠️ Using demo authentication - no real API calls are made
              </p>
              <p className="text-yellow-600">
                To enable real authentication, uncomment API calls in
                authService.js
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
