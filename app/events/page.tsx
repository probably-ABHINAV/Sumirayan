"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { events } from "@/lib/data"
import { GradientButton } from "@/components/ui/gradient-button"

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status === "upcoming")
  const pastEvents = events.filter((e) => e.status === "completed")

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Events
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Connect & Create
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join us at workshops, conferences, and exhibitions to learn, network, and be inspired by creative minds.
            </p>
          </motion.div>
        </section>

        {/* Upcoming Events */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-muted-foreground mb-8"
          >
            Upcoming Events
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 group hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    Upcoming
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {event.date.split(" ")[1].replace(",", "")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.date.split(" ")[0]} {event.date.split(" ")[2]}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    {event.location}
                  </span>
                  <GradientButton variant="outline" size="sm">
                    Register
                  </GradientButton>
                </div>
              </motion.div>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="glass rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Past Events */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-muted-foreground mb-8"
          >
            Past Events
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Completed
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-muted-foreground">
                      {event.date.split(" ")[1].replace(",", "")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.date.split(" ")[0]} {event.date.split(" ")[2]}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-4">{event.description}</p>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
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
                  {event.location}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
