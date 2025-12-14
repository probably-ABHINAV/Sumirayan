"use client"

import { motion } from "framer-motion"

export function EventsLearnPreview() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-xl sm:rounded-2xl p-6 md:p-10 text-center">

            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-xs mb-4">
              Announcement
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              New Event Coming Soon 🚀
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mb-6">
              We’re preparing something exciting for you!  
              Stay tuned for our upcoming event by <strong>Sumirayan Design Pvt. Ltd.</strong>  
              Full details, dates, and registration will be announced very soon.
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold">
              ⏳ Stay Connected
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
