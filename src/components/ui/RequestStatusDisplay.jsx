import { useState } from 'react'
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { config } from '../../lib/config'

/**
 * RequestStatusDisplay component for consistent error/success feedback
 * Features: API response data display, expandable debug details
 * Note: Loading states are handled by ApiButton component
 */

export function RequestStatusDisplay({ 
  mutation, 
  compact = false, 
  showSuccess = true,
  successMessage = 'Operation completed successfully',
  className,
  children
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!mutation) return null
  
  const { error, isSuccess, data } = mutation
  
  // Don't show anything if no error or success to display
  if (!error && !isSuccess) return null
  
  // Error state
  if (error) {
    return (
      <div className={cn(
        'rounded-md bg-red-50 border border-red-200 text-red-800',
        compact ? 'p-2' : 'p-3',
        className
      )}>
        <div className="flex items-start gap-2">
          <AlertCircle className={cn('h-4 w-4 mt-0.5 flex-shrink-0', compact && 'h-3 w-3')} />
          <div className="flex-1 min-w-0">
            <div className={cn('font-medium', compact && 'text-sm')}>
              {error.message || 'An error occurred'}
            </div>
            
            {/* Status code and URL info */}
            {(error.status || error.url) && (
              <div className={cn('text-sm opacity-75 mt-1', compact && 'text-xs')}>
                {error.status && `Status: ${error.status}`}
                {error.status && error.url && ' • '}
                {error.url && `URL: ${error.url}`}
              </div>
            )}
            
            {/* Expandable debug details in development */}
            {config.isDevelopment && error.data && (
              <div className="mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs hover:text-red-900 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                  Debug Details
                </button>
                
                {isExpanded && (
                  <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                    {JSON.stringify(error.data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Success state
  if (isSuccess && showSuccess) {
    return (
      <div className={cn(
        'rounded-md bg-green-50 border border-green-200 text-green-800',
        compact ? 'p-2' : 'p-3',
        className
      )}>
        <div className="flex items-start gap-2">
          <CheckCircle className={cn('h-4 w-4 mt-0.5 flex-shrink-0', compact && 'h-3 w-3')} />
          <div className="flex-1 min-w-0">
            <div className={cn('font-medium', compact && 'text-sm')}>
              {successMessage}
            </div>
            
            {/* Show API response data in development */}
            {config.isDevelopment && data && (
              <div className="mt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs hover:text-green-900 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                  Response Data
                </button>
                
                {isExpanded && (
                  <pre className="mt-2 p-2 bg-green-100 rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                )}
              </div>
            )}
            
            {/* Custom children content */}
            {children && <div className="mt-1">{children}</div>}
          </div>
        </div>
      </div>
    )
  }
  
  return null
}



export default RequestStatusDisplay 