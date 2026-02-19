"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function BpscStudyPage() {
  return (
    <>
      <Header />

      <main className="bg-black text-white pt-24 pb-20 min-h-screen">
        {/* ================= HERO SECTION ================= */}
        <section className="pt-12 pb-16 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-bold uppercase tracking-widest mb-6">
                Target: BPSC TRE 4.0
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                Complete <span className="text-primary">Fine Arts</span> Notes
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Everything you need to crack the BPSC Teacher Recruitment Exam (TRE 4.0) for Fine Arts. High-yield concepts, syllabus-aligned content, and exam-ready PDF notes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= EXAM DETAILS GRID ================= */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Detail Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Syllabus Aligned</h3>
                <p className="text-gray-400 leading-relaxed">
                  Strictly follows the latest BPSC syllabus for Fine Arts, covering Indian Art History, Western Art, Fundamentals, and more.
                </p>
              </motion.div>

              {/* Detail Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">High-Yield Content</h3>
                <p className="text-gray-400 leading-relaxed">
                  To-the-point bullet notes, crucial dates, artist biographies, and important art movements summarized for quick revision.
                </p>
              </motion.div>

              {/* Detail Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Ready to Print</h3>
                <p className="text-gray-400 leading-relaxed">
                  High-quality PDF format designed to be easily readable on devices or printed out for physical study sessions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= PDF DOWNLOAD SECTION ================= */}
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.4)]"
            >
              {/* Decorative Internal Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Download Fine Arts Notes
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  Get instant access to the complete Fine Arts study material for BPSC TRE 4.0. Click the button below to download your copy securely.
                </p>

                {/* Replace '#' with your actual PDF path in the public folder */}
                <a
                  href="/Fineartsnotes.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-extrabold text-lg transition-all duration-300 hover:bg-primary hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  <svg 
                    className="w-6 h-6 transition-transform group-hover:-translate-y-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download PDF Now
                </a>
                
                <div className="mt-8 text-sm text-gray-500 font-medium">
                  PDF Format • 15MB • Updated for 2026 Syllabus
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
