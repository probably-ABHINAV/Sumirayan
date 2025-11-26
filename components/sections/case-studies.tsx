"use client"

import { motion } from "framer-motion"

interface CaseStudy {
  title: string
  category: string
  image: string
}

interface CaseStudiesProps {
  studies: CaseStudy[]
}

export function CaseStudies({ studies }: CaseStudiesProps) {
  return (
    <section className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest text-muted-foreground mb-12"
        >
          Case Studies
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass mb-4">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                {study.category}
              </span>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {study.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
