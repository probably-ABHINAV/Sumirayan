"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/sections/service-hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { CaseStudies } from "@/components/sections/case-studies"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data"

export default function DesignPage() {
  const designData = services.design

  return (
    <>
      <Header />

      <main className="bg-black text-white">
        {/* ================= HERO (ALIGNED) ================= */}
        <section className="pt-28 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <ServiceHero
              title="Design That Builds Brands"
              tagline="Strategy-led visuals that communicate, convert, and connect"
              description="At Sumirayan Design Private Limited, design is more than aesthetics. It is a strategic tool that shapes perception, strengthens identity, and drives growth. We craft thoughtful, timeless, and performance-driven design solutions tailored to your brand’s goals."
            />
          </div>
        </section>

        {/* ================= COMMON CONTAINER ================= */}
        <div className="max-w-6xl mx-auto px-6">
          {/* ================= PHILOSOPHY ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Design Philosophy
            </h2>
            <p className="mb-4">
              We believe great design begins with understanding. Before creating
              visuals, we study your brand, audience, and market positioning.
              This ensures every design decision serves a clear purpose.
            </p>
            <p>
              Whether it’s a startup building a new identity or an established
              brand seeking transformation, our approach stays consistent —
              clarity, consistency, and creativity with intent.
            </p>
          </section>

          {/* ================= SERVICES ================= */}
          <section className="pb-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Design Services
            </h2>
            <p className="text-gray-300 mb-12">
              From brand foundations to campaign-level execution, we provide
              complete design solutions that ensure visual consistency across
              all platforms.
            </p>

            <ServiceGrid services={designData.services} />
          </section>

          {/* ================= PROCESS ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Creative Process
            </h2>

            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong className="text-white">Discovery:</strong> Understanding
                your brand, goals, and audience.
              </li>
              <li>
                <strong className="text-white">Strategy:</strong> Defining visual
                direction aligned with brand positioning.
              </li>
              <li>
                <strong className="text-white">Design Execution:</strong>
                Translating ideas into impactful visuals.
              </li>
              <li>
                <strong className="text-white">Refinement:</strong> Feedback-based
                improvements and final delivery.
              </li>
            </ul>
          </section>

          {/* ================= CASE STUDIES ================= */}
          <section className="py-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Design Case Studies
            </h2>
            <p className="text-gray-300 mb-12">
              Explore how our design solutions helped brands improve recognition,
              engagement, and business performance through strategic creativity.
            </p>

            <CaseStudies category="design" useSupabase={true} />
          </section>

          {/* ================= WHY US ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Choose Sumirayan Design
            </h2>

            <ul className="space-y-3 list-disc list-inside">
              <li>Strategy-first design approach</li>
              <li>Experienced advertising-focused designers</li>
              <li>Consistent and scalable brand systems</li>
              <li>Transparent communication & timely delivery</li>
              <li>Designs optimized for both beauty and performance</li>
            </ul>
          </section>
        </div>

        {/* ================= CTA (FULL WIDTH INTENTIONAL) ================= */}
        <CTASection
          title="Let’s Create Something Impactful"
          description="Whether you’re launching a new brand or refreshing an existing one, our design team is ready to help you stand out with purpose-driven visuals."
        />
      </main>

      <Footer />
    </>
  )
}
