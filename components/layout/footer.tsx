import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ================= BRAND ================= */}
          <div className="sm:col-span-2 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center mb-4">
              {/* SAME LOGO AS HEADER */}
              <Image
                src="/sumirayan design.png"
                alt="Sumirayan Design"
                width={200}
                height={60}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto sm:mx-0 mb-6">
              The Best Solution in Your Budget. Sumirayan Design Private Limited
              is a Patna-based creative agency specializing in Design,
              Photography & Videography, and Art.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex justify-center sm:justify-start gap-4">
              {[
                {
                  name: "Instagram",
                  icon:
                    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
                },
                {
                  name: "YouTube",
                  icon:
                    "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
                },
                {
                  name: "Facebook",
                  icon:
                    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
              ].map((social) => (
                <a
                  key={Instagram}
                  href="https://www.instagram.com/sumirayan_design?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  aria-label={social.name}
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/design" className="footer-link">Design</Link>
              <Link href="/photography" className="footer-link">Photography</Link>
              <Link href="/art" className="footer-link">Art</Link>
              <Link href="/learn" className="footer-link">Learn</Link>
            </nav>
          </div>

          {/* ================= COMPANY ================= */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="footer-link">About</Link>
              <Link href="/careers" className="footer-link">Careers</Link>
              <Link href="/events" className="footer-link">Events</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
            </nav>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Sumirayan Design Private Limited. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="footer-link text-sm">Privacy Policy</a>
            <a href="#" className="footer-link text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
