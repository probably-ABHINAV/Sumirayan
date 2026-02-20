"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { navLinks } from "@/lib/data"
import { useUser, useStackApp } from "@stackframe/stack"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()
  const app = useStackApp()
  const router = useRouter()

  const handleLogout = async () => {
    await app.signOut()
    setIsMenuOpen(false)
    // Stack Auth usually handles redirect, but we can force it or let the handler do it
  }

  // --- NEW PROTECTED NAVIGATION LOGIC ---
  const handleProtectedNavigation = (e, href) => {
    // Agar user Learn page par jana chahta hai aur logged in NAHI hai
    if (href === "/learn" && !user) {
      e.preventDefault(); // Normal page load rok do
      setIsMenuOpen(false); // Menu close kar do (mobile ke liye)
      router.push("/handler/sign-in"); // Login page par redirect kar do
    } else {
      // Agar user logged in hai ya kisi aur page pe ja raha hai
      setIsMenuOpen(false);
    }
  }

  return (
    <>
      {/* ================= HEADER BAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* LOGO */}
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/sumirayan design.png"
                alt="Sumirayan Design"
                width={200}
                height={60}
                priority
                className="h-10 sm:h-12 w-auto max-w-[160px]"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/design" className="nav-link">Design</Link>
              <Link href="/photography" className="nav-link">Photography</Link>
              <Link href="/art" className="nav-link">Art</Link>
              {/* Added onClick interceptor here */}
              <Link 
                href="/learn" 
                onClick={(e) => handleProtectedNavigation(e, "/learn")} 
                className="nav-link"
              >
                Learn
              </Link>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-3">
                {user ? (
                  <>
                    <Link href="/account" className="nav-link">Account</Link>
                    <button onClick={handleLogout} className="nav-link">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/handler/sign-in" className="nav-link">Login</Link>
                    <Link
                      href="/handler/sign-up"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= FULLSCREEN MENU ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl"
          >
            <div className="h-full flex flex-col">
              {/* MENU HEADER */}
              <div className="flex items-center justify-between px-6 h-16 md:h-20">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center h-full"
                >
                  <Image
                    src="/sumirayan design.png"
                    alt="Sumirayan Design"
                    width={200}
                    height={60}
                    priority
                    className="h-8 sm:h-12 w-auto max-w-[160px]"
                  />
                </Link>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* MENU BODY */}
              <div className="flex-1 flex flex-col lg:flex-row">
                {/* LINKS */}
                <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {/* Added onClick interceptor for mobile menu too */}
                        <Link
                          href={link.href}
                          onClick={(e) => handleProtectedNavigation(e, link.href)}
                          className="block text-2xl sm:text-3xl md:text-5xl font-bold hover:text-primary transition-colors py-2"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
                    >
                      Start Your Campaign →
                    </Link>
                  </motion.div>
                </div>

                {/* ACCOUNT */}
                <div className="lg:w-80 p-8 lg:p-16 flex flex-col justify-center gap-4 border-t lg:border-t-0 lg:border-l border-border">
                  <p className="text-muted-foreground text-sm mb-4">
                    {user ? `Signed in as ${user.email}` : "Access Sumirayan Learn"}
                  </p>

                  <div className="flex flex-col gap-3">
                    {user ? (
                      <>
                        <Link
                          href="/account"
                          onClick={() => setIsMenuOpen(false)}
                          className="px-6 py-3 bg-secondary rounded-lg text-center font-medium"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="px-6 py-3 border border-border rounded-lg font-medium"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/handler/sign-in"
                          onClick={() => setIsMenuOpen(false)}
                          className="px-6 py-3 border border-border rounded-lg text-center"
                        >
                          Log In
                        </Link>
                        <Link
                          href="/handler/sign-up"
                          onClick={() => setIsMenuOpen(false)}
                          className="px-6 py-3 bg-secondary rounded-lg text-center"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
