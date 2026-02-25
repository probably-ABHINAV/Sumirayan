"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { stats } from "@/lib/data"

// Replace these with the actual paths to your PNG logos in your public folder
const topRowLogos = [
  "/logos/accessorize.png",
  "/logos/happy-threads.png",
  "/logos/pomp.png",
  "/logos/colombian.png",
  "/logos/true-fro.png",
]

const bottomRowLogos = [
  "/logos/home-kouzina.png",
  "/logos/kotak.png",
  "/logos/the-zappy-box.png",
  "/logos/peepal-tales.png",
  "/logos/unbottle.png",
]

export function Impact() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Stats */}
          <div>
            <SectionHeading label="Our Impact" title="Numbers That Speak" align="left" />
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6"
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Client Logos */}
          <div className="mt-8 lg:mt-0 overflow-hidden">
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-6 sm:mb-8 text-center lg:text-left">
              Trusted by brands across the US, UK & India
            </h3>
            
            <div className="relative flex flex-col gap-6 sm:gap-8 overflow-hidden">
              
              {/* First Row: Moving Left */}
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="flex gap-8 sm:gap-12 w-max"
              >
                {/* Duplicating the array twice creates the seamless infinite loop effect */}
                {[...topRowLogos, ...topRowLogos].map((src, i) => (
                  <div
                    key={`top-${i}`}
                    className="flex-shrink-0 w-24 sm:w-32 h-12 sm:h-16 flex items-center justify-center"
                  >
                    <img 
                      src={src} 
                      alt={`Client logo ${i}`} 
                      className="max-w-full max-h-full object-contain filter brightness-0 invert" // Remove filter if logos are already white PNGs
                    />
                  </div>
                ))}
              </motion.div>

              {/* Second Row: Moving Right */}
              <motion.div
                animate={{ x: ["-50%", "0%"] }} // Starting at -50% and moving to 0% creates the rightward movement
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="flex gap-8 sm:gap-12 w-max"
              >
                {[...bottomRowLogos, ...bottomRowLogos].map((src, i) => (
                  <div
                    key={`bottom-${i}`}
                    className="flex-shrink-0 w-24 sm:w-32 h-12 sm:h-16 flex items-center justify-center"
                  >
                    <img 
                      src={src} 
                      alt={`Client logo ${i}`} 
                      className="max-w-full max-h-full object-contain filter brightness-0 invert" // Remove filter if logos are already white PNGs
                    />
                  </div>
                ))}
              </motion.div>

              {/* Fade Gradients (Left & Right Edges) */}
              <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
