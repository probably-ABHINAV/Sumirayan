"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/sections/service-hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { GalleryGrid } from "@/components/sections/gallery-grid"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data"

export default function ArtPage() {
  const artData = services.art

  return (
    <>
      <Header />

      <main className="bg-black text-white">
        {/* ================= HERO (ALIGNED) ================= */}
        <section className="pt-28 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <ServiceHero
              title={artData.title}
              tagline={artData.tagline}
              description={artData.description}
            />
          </div>
        </section>

        {/* ================= COMMON CONTAINER ================= */}
        <div className="max-w-6xl mx-auto px-6">
          {/* ================= ART PHILOSOPHY ================= */}
          <section className="pb-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Artistic Philosophy
            </h2>
            <p className="mb-4">
              Art is expression without limitation. At Sumirayan Design Private
              Limited, we believe art should evoke emotion, spark curiosity, and
              transform spaces. Every artwork we create carries intention,
              meaning, and individuality.
            </p>
            <p>
              From fine art paintings to large-scale murals and handcrafted
              illustrations, our artists blend imagination with skill to deliver
              pieces that feel personal, powerful, and timeless.
            </p>
          </section>

          {/* ================= ART SERVICES ================= */}
          <section className="pb-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Art Services
            </h2>
            <p className="text-gray-300 mb-12">
              We offer a diverse range of artistic services designed for homes,
              offices, commercial spaces, and personal collections. Each artwork
              is custom-created to match your vision, space, and emotion.
            </p>

            <ServiceGrid services={artData.services} />
          </section>

          {/* ================= CREATIVE PROCESS ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Creative Art Process
            </h2>

            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong className="text-white">Concept Discussion:</strong> We
                begin by understanding your ideas, space, inspiration, and
                purpose.
              </li>
              <li>
                <strong className="text-white">Sketch & Visualization:</strong>{" "}
                Initial sketches and visual references are shared for alignment.
              </li>
              <li>
                <strong className="text-white">Creation:</strong> Our artists
                bring the concept to life using traditional or digital
                techniques.
              </li>
              <li>
                <strong className="text-white">Final Delivery:</strong> The
                finished artwork is refined, detailed, and delivered with care.
              </li>
            </ul>
          </section>

          {/* ================= ART GALLERY ================= */}
          <section className="py-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Artwork
            </h2>
            <p className="text-gray-300 mb-12">
              Explore a curated collection of our artwork — including paintings,
              sketches, murals, and experimental pieces created for diverse
              spaces and clients.
            </p>

            <GalleryGrid
              category="art"
              useSupabase={true}
              title="Featured Artwork"
            />
          </section>

          {/* ================= WHY CHOOSE US ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Choose Sumirayan for Art
            </h2>

            <ul className="space-y-3 list-disc list-inside">
              <li>Experienced artists with strong creative vision</li>
              <li>Custom-made artwork tailored to your space and taste</li>
              <li>Blend of traditional and contemporary styles</li>
              <li>Attention to detail and artistic integrity</li>
              <li>Transparent collaboration from concept to completion</li>
            </ul>
          </section>
        </div>

        {/* ================= CTA (FULL WIDTH) ================= */}
        <CTASection
          title="Commission Your Masterpiece"
          description="Whether it’s a statement mural, a custom painting, or a unique artistic concept, our artists are ready to transform your imagination into a visual masterpiece."
        />
      </main>

      <Footer />
    </>
  )
}
