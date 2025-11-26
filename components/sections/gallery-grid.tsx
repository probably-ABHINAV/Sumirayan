"use client"

import { motion } from "framer-motion"

interface GalleryItem {
  title: string
  category: string
  image: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  title?: string
}

export function GalleryGrid({ items, title = "Gallery" }: GalleryGridProps) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest text-muted-foreground mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`group cursor-pointer ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden glass">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
