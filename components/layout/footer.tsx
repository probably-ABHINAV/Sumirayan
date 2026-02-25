"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ================= BRAND & CONTACT ================= */}
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

            {/* CONTACT INFO */}
            <div className="flex flex-col gap-2 mb-6 text-sm sm:text-base text-muted-foreground items-center sm:items-start">
              <a href="mailto:contact@sumirayandesign.com" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@sumirayandesign.com
              </a>
              <a href="tel:+919876543210" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98765 43210
              </a>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex justify-center sm:justify-start gap-4 flex-wrap">
              {[
                {
                  name: "Instagram",
                  url: "https://instagram.com/your_handle", // Replace with your link
                  icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
                },
                {
                  name: "YouTube",
                  url: "https://youtube.com/@your_handle", // Replace with your link
                  icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
                },
                {
                  name: "Facebook",
                  url: "https://facebook.com/your_page", // Replace with your link
                  icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  name: "LinkedIn",
                  url: "https://linkedin.com/company/your_company", // Replace with your link
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  name: "X (Twitter)",
                  url: "https://x.com/your_handle", // Replace with your link
                  icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ================= SERVICES ================= */}
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/design" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Design</Link>
              <Link href="/photography" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Photography</Link>
              <Link href="/art" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Art</Link>
              <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Learn</Link>
            </nav>
          </div>

          {/* ================= COMPANY ================= */}
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">About</Link>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Careers</Link>
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Events</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">Contact</Link>
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
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
