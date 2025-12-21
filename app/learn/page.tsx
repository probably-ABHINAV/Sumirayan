"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { getPosts, getFeaturedPost } from "@/lib/supabase-data"
import type { Post } from "@/lib/types"

const filters = ["All", "Design", "Marketing", "Art History", "Photography"]

export default function LearnPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [posts, setPosts] = useState<Post[]>([])
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [allPosts, featured] = await Promise.all([
          getPosts(),
          getFeaturedPost()
        ])
        setPosts(allPosts.filter(p => !p.is_featured))
        setFeaturedPost(featured)
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredPosts =
    activeFilter === "All" ? posts : posts.filter(p => p.tag === activeFilter)

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-black">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="bg-black text-white pt-24 pb-16">
        {/* ================= HERO ================= */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Sumirayan Learn
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Insights, Ideas & Inspiration
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Learn from real-world creative experience. Explore design,
                marketing, photography, and art insights crafted by industry
                professionals at Sumirayan Design Private Limited.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= LEARN PHILOSOPHY ================= */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Sumirayan Learn?
            </h2>
            <p className="mb-4">
              Sumirayan Learn is built for creatives, entrepreneurs, marketers,
              and artists who want more than surface-level knowledge. Our content
              is rooted in real projects, real challenges, and real solutions.
            </p>
            <p>
              From understanding design fundamentals to exploring art history
              and modern marketing strategies, we focus on clarity, depth, and
              practical value.
            </p>
          </div>
        </section>

        {/* ================= FEATURED POST ================= */}
        {featuredPost && (
          <section className="pb-20">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link href={`/learn/${featuredPost.slug}`} className="block group">
                  <div className="grid lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden border border-white/10">
                    <div className="aspect-video lg:aspect-auto relative">
                      <img
                        src={featuredPost.image_url || "/placeholder.svg"}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          Featured
                        </span>
                        {featuredPost.is_premium && (
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-medium">
                            Premium
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-400 mb-4">
                        {featuredPost.tag} • {featuredPost.read_time}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-400 mb-6">
                        {featuredPost.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-primary font-medium">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* ================= FILTERS ================= */}
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-black"
                      : "bg-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= POSTS GRID ================= */}
        <section>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link href={`/learn/${post.slug}`} className="block group">
                    <div className="rounded-2xl overflow-hidden border border-white/10 h-full">
                      <div className="aspect-video relative">
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {post.is_premium && (
                          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold">
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-gray-400 mb-2">
                          {post.tag} • {post.read_time}
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No articles found for this category.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
