"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { processSteps } from "@/lib/data"

export function Process() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          label="How We Work"
          title="Our Process"
          description="A systematic approach to delivering exceptional creative solutions."
        />

        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative text-center">
                {/* Step Number */}
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
