"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/sections/service-hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { GalleryGrid } from "@/components/sections/gallery-grid"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data"

export default function PhotographyPage() {
  const photographyData = services.photography

  return (
    <>
      <Header />

      <main className="bg-black text-white">
        {/* ================= HERO (ALIGNED) ================= */}
        <section className="pt-28 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <ServiceHero
              title={photographyData.title}
              tagline={photographyData.tagline}
              description={photographyData.description}
            />
          </div>
        </section>

        {/* ================= COMMON CONTAINER ================= */}
        <div className="max-w-6xl mx-auto px-6">
          {/* ================= INTRO / PHILOSOPHY ================= */}
          <section className="pb-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Photography Philosophy
            </h2>
            <p className="mb-4">
              Photography is more than capturing images — it is about preserving
              emotions, telling stories, and communicating value. At Sumirayan
              Design Private Limited, we approach photography with an artistic
              eye and a strategic mindset.
            </p>
            <p>
              Every frame we capture is thoughtfully composed to reflect
              authenticity, mood, and purpose. Whether it’s a wedding, product,
              event, or commercial campaign, our goal is to create visuals that
              feel real, timeless, and impactful.
            </p>
          </section>

          {/* ================= SERVICES ================= */}
          <section className="pb-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Photography & Videography Services
            </h2>
            <p className="text-gray-300 mb-12">
              We offer a wide range of professional photography and videography
              services designed for individuals, brands, and businesses. Our
              work blends technical excellence with creative storytelling to
              deliver visually compelling results.
            </p>

            <ServiceGrid services={photographyData.services} />
          </section>

          {/* ================= PROCESS ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Creative Shooting Process
            </h2>

            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong className="text-white">Understanding the Brief:</strong>{" "}
                We begin by understanding the purpose, audience, and desired
                outcome of the shoot.
              </li>
              <li>
                <strong className="text-white">Planning & Styling:</strong>{" "}
                Locations, lighting, compositions, and visual references are
                carefully planned in advance.
              </li>
              <li>
                <strong className="text-white">Execution:</strong> Our team
                captures moments with precision, creativity, and attention to
                detail.
              </li>
              <li>
                <strong className="text-white">Post-Production:</strong> Each
                image and video is professionally edited to enhance quality
                while maintaining natural aesthetics.
              </li>
            </ul>
          </section>

          {/* ================= GALLERY ================= */}
          <section className="py-20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Selected Photography Works
            </h2>
            <p className="text-gray-300 mb-12">
              A curated selection of our photography projects showcasing diverse
              styles, industries, and storytelling approaches — from weddings
              and events to product, fashion, and advertising shoots.
            </p>

            <GalleryGrid
              category="photography"
              useSupabase={true}
              title="Our Work"
            />
          </section>

          {/* ================= WHY CHOOSE US ================= */}
          <section className="py-20 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Choose Sumirayan for Photography
            </h2>

            <ul className="space-y-3 list-disc list-inside">
              <li>Experienced photographers with an advertising mindset</li>
              <li>High-end equipment and professional lighting setups</li>
              <li>Creative direction tailored to your brand or event</li>
              <li>Consistent quality across photography and videography</li>
              <li>Timely delivery with transparent communication</li>
            </ul>
          </section>
        </div>

        {/* ================= CTA (FULL WIDTH) ================= */}
        <CTASection
          title="Let’s Capture Your Story"
          description="Whether it’s a wedding, event, product shoot, or commercial campaign, our photography team is ready to transform moments into meaningful visual stories."
        />
      </main>

      <Footer />
    </>
  )
}
