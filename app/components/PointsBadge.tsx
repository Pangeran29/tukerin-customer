import { cn } from "@/lib/utils"

interface PointsBadgeProps {
  points: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  prefix?: string
}

const getPointsGradientClass = (points: number) => {
  if(points >= 500 ) {
    return 'from-[#FDDF23] via-orange-600 to-red-600'
  } else if (points >= 400) {
    return 'from-[#FDDF23] via-orange-500 to-red-500'
  } else if (points >= 300) {
    return 'from-[#FDDF23] via-orange-400 to-orange-500'
  } else if (points >= 200) {
    return 'from-[#FDDF23] via-orange-300 to-orange-400'
  } else {
    return 'from-[#FDDF23] via-[#FDE68A] to-[#FDDF23]'
  }
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'text-xs py-1 px-2'
    case 'lg':
      return 'text-base py-2 px-4'
    default:
      return 'text-sm py-1.5 px-3'
  }
}

export function PointsBadge({ points, className, size = 'md', prefix = '' }: PointsBadgeProps) {
  return (
    <div className={cn(
      `bg-gradient-to-r ${getPointsGradientClass(points)}`,
      'rounded-xl font-medium text-[#1A1A1A] shadow-lg',
      getSizeClasses(size),
      className
    )}>
      {prefix} {points} pts
    </div>
  )
} 