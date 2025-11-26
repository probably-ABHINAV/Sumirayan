"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeading({ label, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">{title}</h2>
      {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
    </motion.div>
  )
}
