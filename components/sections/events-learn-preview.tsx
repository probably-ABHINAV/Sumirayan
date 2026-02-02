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
              Kick-start your creative and AI-powered career with our industry-focused internship.
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition"
              >
                Enroll Now 
              </a>

              {/* Drive Link */}
              <a
                href="https://forms.gle/MUT9ELyhHk8vQY4q8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition"
              >
                📂 View Internship Details
              </a>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
