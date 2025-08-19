import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Simple loading indicator component
 * Sizes: xs, sm, md, lg
 */
export function LoadingSpinner({ size = 'sm', className }) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }
  
  return (
    <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />
  )
}

export default LoadingSpinner 