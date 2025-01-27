import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HamburgerButtonProps {
  onClick: () => void
  className?: string
}

export function HamburgerButton({ onClick, className }: HamburgerButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label="Toggle menu"
      className={`fixed top-4 left-4 z-50 ${className}`}
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
}