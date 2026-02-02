"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function EventsLearnPreview() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-xl sm:rounded-2xl p-6 md:p-10 text-center">

            {/* Badge */}
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-xs mb-4">
              Internship Program
            </span>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Sumirayan 360° Creative & AI Internship 🚀
            </h2>

            {/* Description */}
           <p className="text-muted-foreground max-w-3xl mx-auto text-sm sm:text-base mb-6">
  Kick-start your creative and AI-powered career with our industry-focused 
  <span className="font-semibold text-primary"> 3 Month Internship Program</span>.
  Learn, practice, and build real-world skills under expert guidance.
</p>


            {/* Internship Includes */}
            <div className="max-w-2xl mx-auto text-left mb-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-muted-foreground">
                <li>🎨 Graphic Design</li>
                <li>🎬 Video Editing</li>
                <li>📸 Photography</li>
                <li>🎥 Videography</li>
                <li>✍️ Content Writing</li>
                <li>📱 Social Media Handling</li>
                <li>🤖 AI Prompting</li>
                <li>📢 Marketing Communication</li>
              </ul>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-lg sm:text-xl font-semibold text-primary">
                Internship Fee: ₹1,499 only
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Enroll Button */}
              <a
                href="https://forms.gle/MUT9ELyhHk8vQY4q8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                🚀 Enroll Now
              </a>

              {/* Open Popup */}
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition"
              >
                📂 View Internship Details
              </button>

            </div>

          </div>
        </motion.div>
      </div>

      {/* ================= POPUP MODAL ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-background max-w-3xl w-full rounded-2xl p-6 md:p-8 relative overflow-y-auto max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-xl font-bold text-muted-foreground hover:text-primary"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-4">
                Sumirayan 360° Creative & AI Internship – Full Details
              </h3>

              <div className="text-sm sm:text-base text-muted-foreground space-y-4">

                <p>
                  The <strong>Sumirayan 360° Creative & AI Internship</strong> is a comprehensive,
                  skill-driven program designed for students, freshers, and creative enthusiasts
                  who want to build a future-ready career in the digital and AI-powered industry.
                </p>

                <p>
                  This internship focuses on hands-on learning and real-world exposure,
                  helping participants gain practical experience in creative design,
                  content creation, digital media, and marketing communication.
                </p>

                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Graphic Design:</strong> Branding, posters, creatives & layouts</li>
                  <li><strong>Video Editing:</strong> Reels, promos, transitions & effects</li>
                  <li><strong>Photography:</strong> Composition, lighting & editing</li>
                  <li><strong>Videography:</strong> Shooting techniques & production workflow</li>
                  <li><strong>Content Writing:</strong> Social media & marketing content</li>
                  <li><strong>Social Media Handling:</strong> Strategy, posting & analytics</li>
                  <li><strong>AI Prompting:</strong> Smart AI usage for creative productivity</li>
                  <li><strong>Marketing Communication:</strong> Brand messaging & campaigns</li>
                </ul>

                <p>
                  The internship is available at a highly affordable one-time fee of
                  <strong> ₹1,499 only</strong>, making it accessible to learners from all backgrounds.
                </p>

                <p>
                  By the end of the program, interns gain strong practical skills,
                  improved confidence, and real-world experience that can help them
                  secure jobs, start freelancing, or build their own creative brand.
                </p>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ================================================= */}

    </section>
  )
}
