"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { events, articles } from "@/lib/data"

export function EventsLearnPreview() {
  const upcomingEvent = events.find((e) => e.status === "upcoming")
  const featuredArticle = articles.find((a) => a.featured)

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Events */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Upcoming Events</h3>
              <Link href="/events" className="text-primary text-sm font-medium hover:underline">
                View All
              </Link>
            </div>
            {upcomingEvent && (
              <div className="glass rounded-2xl p-8 h-full">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4">
                  {upcomingEvent.status.charAt(0).toUpperCase() + upcomingEvent.status.slice(1)}
                </span>
                <h4 className="text-2xl font-bold text-foreground mb-2">{upcomingEvent.title}</h4>
                <p className="text-muted-foreground mb-4">{upcomingEvent.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {upcomingEvent.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {upcomingEvent.location}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Learn */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground">From Learn</h3>
              <Link href="/learn" className="text-primary text-sm font-medium hover:underline">
                View All
              </Link>
            </div>
            {featuredArticle && (
              <Link href="/learn" className="block group">
                <div className="glass rounded-2xl overflow-hidden h-full">
                  <div className="aspect-video relative">
                    <img
                      src={featuredArticle.image || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                        {featuredArticle.category}
                      </span>
                      <span className="text-muted-foreground text-xs">{featuredArticle.readTime}</span>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">{featuredArticle.excerpt}</p>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
