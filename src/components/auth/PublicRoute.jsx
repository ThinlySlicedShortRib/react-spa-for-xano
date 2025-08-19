import { Navigate } from 'react-router-dom'
import { useAuthStatus } from '../../hooks/useAuth'
import { LoadingSpinner } from '../ui/LoadingSpinner'

/**
 * Public Route wrapper component (login, register, etc.)
 * Redirects to dashboard if user is already authenticated
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStatus()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default PublicRoute 