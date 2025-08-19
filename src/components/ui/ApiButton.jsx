import { cn } from '../../lib/utils'
import { LoadingSpinner } from './LoadingSpinner'

/**
 * API status aware button that shows loading state
 * Automatically disables and shows spinner when mutation is pending
 */
export function ApiButton({ 
  mutation, 
  children, 
  loadingText = 'Loading...',
  disabled,
  className,
  ...props 
}) {
  const isLoading = mutation?.isPending
  
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 rounded-md',
        'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {isLoading ? loadingText : children}
    </button>
  )
}

export default ApiButton 