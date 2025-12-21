"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { stats } from "@/lib/data"
import { GradientButton } from "@/components/ui/gradient-button"

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-black text-white">
        {/* HERO (aligned) */}
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                About Us
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Sumirayan Design — The Best Solution in Your Budget
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Sumirayan Design Private Limited is a Patna-based creative
                agency delivering design, photography & art services for local
                businesses and national clients. We combine strategic thinking
                with craft-led execution to build identities, campaigns, and
                visual experiences that perform.
              </p>

              <p className="text-gray-300 mb-8">
                Built to serve startups, small businesses and cultural projects
                across Bihar, Sumirayan blends studio-grade production with
                practical budgets — making premium creative work accessible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* STORY */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story — rooted in Patna, serving wide
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sumirayan Design was incorporated as a private limited company
                  in 2024 and operates from Patna, serving clients across
                  Bihar and neighbouring regions. Our work spans brand identity,
                  campaigns, product photography, and large-format art projects.
                </p>

                <p>
                  We started as a small creative studio with a simple goal:
                  craft memorable visual communication without the premium price
                  tag. Over time we've partnered with educational institutions,
                  local businesses, and event organisers to deliver tailor-made
                  creative solutions.
                </p>

                <p>
                  Our team mixes advertising discipline with an artist’s eye —
                  so whether it’s a commercial shoot, a brand refresh, or a
                  mural for a public space, we approach every brief with equal
                  care.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-4/3 rounded-2xl overflow-hidden glass"
            >
              <img
                src="/creative-studio-sumirayan-patna.jpg"
                alt="Sumirayan Design Studio - Patna"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* VALUES */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Craft with Purpose",
                description:
                  "Every visual decision must support a business goal — clarity, recall and conversion.",
                icon: "✦",
              },
              {
                title: "Accessible Excellence",
                description:
                  "We design premium experiences while respecting practical budgets and timelines.",
                icon: "◈",
              },
              {
                title: "Collaborative Integrity",
                description:
                  "Transparent communication and accountable delivery form the core of our client relationships.",
                icon: "◇",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4 text-primary">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LOCATION & LEGAL (data-driven) */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">Location & Legal</h2>

          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Local Presence</h3>
              <p className="mb-2">
                Sumirayan Design operates in Patna with local listings and a studio presence serving clients across the city (local listings reference Patna neighbourhoods such as Kumhrar / Biscomaun Colony).
              </p>
              <p>
                For bookings, events and collaborations in Patna, the studio is the primary contact point for regional clients and partners.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Company Registration</h3>
              <p className="mb-2">
                Sumirayan Design Private Limited is registered with RoC-Patna and incorporated in 2024 (CIN available in public company records).
              </p>
              <p>
                Registered office details are on record with ROC (official filings list a registered address in Bhojpur / Garhani region). For formal corporate requests, please use the official company contact channels.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Whether you need brand design, commercial photography, or a site-specific mural, we’ll plan the creative and manage delivery — on budget and on time.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <GradientButton href="/contact" variant="primary" size="lg">
                Start Your Campaign
              </GradientButton>
              <GradientButton href="/careers" variant="outline" size="lg">
                Join Our Team
              </GradientButton>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}
