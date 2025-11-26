import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceHero } from "@/components/sections/service-hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { GalleryGrid } from "@/components/sections/gallery-grid"
import { CTASection } from "@/components/sections/cta-section"
import { services } from "@/lib/data"

export const metadata = {
  title: "Art Services | Sumirayan Design Private Limited",
  description: "Manual & digital painting, sketching, wall murals, and handmade artwork that transforms spaces.",
}

export default function ArtPage() {
  const artData = services.art

  return (
    <>
      <Header />
      <main>
        <ServiceHero title={artData.title} tagline={artData.tagline} description={artData.description} />
        <ServiceGrid services={artData.services} />
        <GalleryGrid items={artData.gallery} title="Featured Artwork" />
        <CTASection
          title="Commission Your Masterpiece"
          description="Whether it's a stunning mural for your office or a custom painting for your home, our artists bring imagination to life."
        />
      </main>
      <Footer />
    </>
  )
}
