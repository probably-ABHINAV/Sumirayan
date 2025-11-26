"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { navLinks } from "@/lib/data"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="hidden sm:block text-foreground font-semibold text-lg tracking-tight">Sumirayan</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/design"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Design
              </Link>
              <Link
                href="/photography"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Photography
              </Link>
              <Link
                href="/art"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Art
              </Link>
              <Link
                href="/learn"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Learn
              </Link>
            </nav>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl"
          >
            <div className="h-full flex flex-col">
              {/* Menu Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">S</span>
                  </div>
                  <span className="text-foreground font-semibold text-lg tracking-tight">Sumirayan</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 flex flex-col lg:flex-row">
                {/* Navigation Links */}
                <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-3xl md:text-5xl lg:text-6xl font-bold text-foreground hover:text-primary transition-colors py-2"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-opacity glow-primary"
                    >
                      Start Your Campaign
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                </div>

                {/* Auth Links */}
                <div className="lg:w-80 p-8 lg:p-16 flex flex-col justify-end lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l border-border">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <p className="text-muted-foreground text-sm mb-4">Access Sumirayan Learn</p>
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-6 py-3 border border-border rounded-lg text-center font-medium hover:bg-muted transition-colors"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-center font-medium hover:opacity-90 transition-opacity"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8"
                  >
                    <p className="text-muted-foreground text-sm mb-4">Follow Us</p>
                    <div className="flex gap-4">
                      {["Instagram", "YouTube", "LinkedIn", "Twitter"].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {social}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
