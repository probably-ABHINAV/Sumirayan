"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { ReactNode } from "react"

interface GradientButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function GradientButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: GradientButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all"

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90 glow-primary",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90 glow-secondary",
    outline: "border border-border text-foreground hover:bg-muted",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const MotionComponent = motion.create(href ? Link : "button")

  return (
    <MotionComponent
      href={href || ""}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClass}
    >
      {children}
    </MotionComponent>
  )
}
