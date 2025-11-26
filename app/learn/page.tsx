"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { articles } from "@/lib/data"

const filters = ["All", "Design", "Marketing", "Art History", "Photography"]

export default function LearnPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const featuredArticle = articles.find((a) => a.featured)
  const otherArticles = articles.filter((a) => !a.featured)

  const filteredArticles =
    activeFilter === "All" ? otherArticles : otherArticles.filter((a) => a.category === activeFilter)

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              Sumirayan Learn
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Insights & Inspiration
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our collection of articles, tutorials, and industry insights to fuel your creative journey.
            </p>
          </motion.div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="#" className="block group">
                <div className="grid lg:grid-cols-2 gap-8 glass rounded-2xl overflow-hidden">
                  <div className="aspect-video lg:aspect-auto relative">
                    <img
                      src={featuredArticle.image || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4 w-fit">
                      Featured
                    </span>
                    <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                      <span>{featuredArticle.category}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Read Article
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="#" className="block group">
                  <div className="glass rounded-2xl overflow-hidden h-full">
                    <div className="aspect-video relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-muted-foreground text-xs">{article.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                      <div className="mt-4 text-xs text-muted-foreground">{article.date}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
