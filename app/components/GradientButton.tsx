import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  points: number
  className?: string
  children: React.ReactNode
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

export function GradientButton({ points, className, children, ...props }: GradientButtonProps) {
  return (
    <Button
      className={cn(
        `bg-gradient-to-r ${getPointsGradientClass(points)}`,
        'text-black hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}