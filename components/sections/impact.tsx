"use client"

import { motion } from "framer-motion"

// Replace these with the actual paths to your PNG logos in your public folder
const topRowLogos = [
  "/sankalp logo.png",
  "/one step logo.png",
  "/blve & blessed logo.png",
  "/rexine house logo.png",
  "/ashadeep clinic logo.png",
]

const bottomRowLogos = [
  "/arch build logo.png",
  "/birdcart logo.png",
  "/raj automobiles.png",
  "/sasta plots logo.png",
  "/ampush logo.png",
]

export function Impact() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative w-full overflow-hidden bg-background">
      <div className="w-full">
        
        {/* Heading */}
        <h3 className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-8 sm:mb-12 text-center">
          Trusted by brands across the US, UK & India
        </h3>
        
        <div className="relative flex flex-col gap-8 sm:gap-12 overflow-hidden w-full">
          
          {/* First Row: Moving Left */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex gap-8 sm:gap-16 w-max"
          >
            {/* Array quadrupled to prevent gaps on ultra-wide monitors */}
            {[...topRowLogos, ...topRowLogos, ...topRowLogos, ...topRowLogos].map((src, i) => (
              <div
                key={`top-${i}`}
                className="flex-shrink-0 w-32 sm:w-48 h-16 sm:h-20 flex items-center justify-center"
              >
                <img 
                  src={src} 
                  alt={`Client logo ${i}`} 
                  className="max-w-full max-h-full object-contain filter brightness-0 invert" // Remove filter if logos are already white
                />
              </div>
            ))}
          </motion.div>

          {/* Second Row: Moving Right */}
          <motion.div
            animate={{ x: ["-50%", "0%"] }} // Starting at -50% and moving to 0% creates the rightward movement
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex gap-8 sm:gap-16 w-max"
          >
            {[...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos].map((src, i) => (
              <div
                key={`bottom-${i}`}
                className="flex-shrink-0 w-32 sm:w-48 h-16 sm:h-20 flex items-center justify-center"
              >
                <img 
                  src={src} 
                  alt={`Client logo ${i}`} 
                  className="max-w-full max-h-full object-contain filter brightness-0 invert" // Remove filter if logos are already white
                />
              </div>
            ))}
          </motion.div>

          {/* Fade Gradients (Left & Right Edges) */}
          {/* Increased width of gradients for a smoother fade on large screens */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
