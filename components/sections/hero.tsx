"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"

const tabs = [
  {
    id: "design",
    title: "Design",
    description:
      "Campaign planning, digital marketing, graphic design, and video editing that captivates and converts.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "photography",
    title: "Photography",
    description: "Wedding, events, product, portrait, and advertising photography that tells your story beautifully.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "art",
    title: "Art",
    description: "Manual & digital painting, sketching, wall murals, and handmade artwork that transforms spaces.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function Hero() {
  const [activeTab, setActiveTab] = useState("design")

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      {/* Ticker Bar */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden border-b border-border/50 bg-background/50 backdrop-blur-sm">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="flex gap-8 py-3 whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Upcoming: Creativity Conference 2025
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Now Hiring: Senior Video Editor
              </span>
              <span>•</span>
              <span>New Project: Tech Startup Rebrand Launch</span>
              <span>•</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              <span className="text-foreground">Sumirayan</span>
              <br />
              <span className="gradient-text">Design</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">The Best Solution in Your Budget</p>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Premium creative agency delivering exceptional design, photography, and art solutions that elevate your
              brand and captivate your audience.
            </p>
            <div className="flex flex-wrap gap-4">
              <GradientButton href="/contact" variant="primary" size="lg">
                Start Your Campaign
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </GradientButton>
              <GradientButton href="#projects" variant="outline" size="lg">
                Explore Our Work
              </GradientButton>
            </div>
          </motion.div>

          {/* Right Content - Interactive Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {tabs.map(
                (tab) =>
                  tab.id === activeTab && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="glass rounded-2xl overflow-hidden"
                    >
                      <div className="aspect-video relative">
                        <img
                          src={tab.image || "/placeholder.svg"}
                          alt={tab.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">{tab.title}</h3>
                        <p className="text-muted-foreground mb-4">{tab.description}</p>
                        <a
                          href={`/${tab.id}`}
                          className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                        >
                          View Details
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
