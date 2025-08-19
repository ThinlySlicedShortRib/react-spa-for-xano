import { Navigate } from 'react-router-dom'
import { useAuthStatus } from '../../hooks/useAuth'
import { LoadingSpinner } from '../ui/LoadingSpinner'

/**
 * Protected Route wrapper component
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStatus()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute 