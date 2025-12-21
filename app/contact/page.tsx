"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GradientButton } from "@/components/ui/gradient-button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <Header />

      <main className="pt-24 pb-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* ================= LEFT : CONTACT INFO ================= */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="py-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Contact Us
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Let’s Build Something Meaningful
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed mb-10">
                Whether you’re a startup, business, institution, or individual,
                Sumirayan Design Private Limited is ready to help you shape your
                visual identity. Tell us about your idea, and we’ll guide you
                with clarity, creativity, and honesty.
              </p>

              {/* WHY CONTACT US */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Why Work With Us?
                </h3>
                <ul className="space-y-2 text-gray-400 list-disc list-inside">
                  <li>Patna-based creative agency with regional understanding</li>
                  <li>Transparent pricing — best solution within your budget</li>
                  <li>Design, photography, art & marketing under one roof</li>
                  <li>Personal attention and structured project execution</li>
                </ul>
              </div>

              {/* CONTACT DETAILS */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                    Office Location
                  </h3>
                  <p className="text-white leading-relaxed">
                    Sumirayan Design Private Limited
                    <br />
                    Patna, Bihar
                    <br />
                    India
                  </p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@sumirayan.com"
                    className="text-white hover:text-primary transition-colors"
                  >
                    designsumirayan@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                    Phone / WhatsApp
                  </h3>
                  <a
                    href="tel:+919876543210"
                    className="text-white hover:text-primary transition-colors"
                  >
                    +91 89368 41201
                  </a>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                    Social Presence
                  </h3>
                  <div className="flex gap-4 text-sm">
                    {["Instagram", "YouTube", "LinkedIn", "Facebook"].map(
                      (social) => (
                        <a
                          key={social}
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {social}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT : CONTACT FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="py-12"
            >
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 md:p-10"
              >
                <h2 className="text-2xl font-bold mb-6">
                  Start Your Project
                </h2>

                <p className="text-gray-400 mb-8">
                  Share a few details about your requirement. Our team will
                  review your message and get back to you with the next steps.
                </p>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Type *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="design">Design & Branding</option>
                      <option value="photography">
                        Photography & Videography
                      </option>
                      <option value="art">Art / Murals / Paintings</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border"
                    >
                      <option value="">Select budget range</option>
                      <option value="10k-25k">₹10,000 – ₹25,000</option>
                      <option value="25k-50k">₹25,000 – ₹50,000</option>
                      <option value="50k-1L">₹50,000 – ₹1,00,000</option>
                      <option value="1L-5L">₹1,00,000 – ₹5,00,000</option>
                      <option value="5L+">₹5,00,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Details *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-input border border-border resize-none"
                      placeholder="Tell us about your idea, timeline, and expectations..."
                      required
                    />
                  </div>

                  <GradientButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Send Inquiry
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </GradientButton>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
