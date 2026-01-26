"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { ArrowLeft, Image as ImageIcon, Play } from "lucide-react"
import { projects } from "@/lib/data" // Importing your real data here

export function SignatureProjects() {
  // --- STATE MANAGEMENT ---
  const [selectedClient, setSelectedClient] = useState<any>(null) // Level 1 -> 2
  const [viewMode, setViewMode] = useState<"menu" | "photos" | "videos" | null>(null) // Level 2 -> 3

  // --- HANDLERS ---
  
  // Reset everything to go back to main grid
  const handleBackToMain = () => {
    setSelectedClient(null)
    setViewMode(null)
  }

  // Go back from Gallery to Choice Menu
  const handleBackToMenu = () => {
    setViewMode("menu")
  }

  return (
    <section id="projects" className="py-16 sm:py-24 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Dynamically updates based on selection */}
        <div className="mb-12">
           {!selectedClient ? (
             <SectionHeading
               label="Portfolio"
               title="Our Signature Clients"
               description="Select a client to view their exclusive photography and videography."
             />
           ) : (
             <div className="flex items-center gap-4">
               <button 
                 onClick={viewMode === "menu" ? handleBackToMain : handleBackToMenu}
                 className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
               >
                 <ArrowLeft size={24} />
               </button>
               <div>
                 <h2 className="text-3xl font-bold">{selectedClient.title}</h2>
                 <p className="text-muted-foreground text-sm">
                   {viewMode === "menu" ? "Select Category" : viewMode === "photos" ? "Photography Collection" : "Video Collection"}
                 </p>
               </div>
             </div>
           )}
        </div>

        <AnimatePresence mode="wait">
          
          {/* --- VIEW 1: CLIENT GRID (DEFAULT) --- */}
          {!selectedClient && (
            <motion.div
              key="client-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {projects.map((client) => (
                <motion.div
                  key={client.id}
                  layoutId={`client-${client.id}`}
                  onClick={() => {
                    setSelectedClient(client)
                    setViewMode("menu")
                  }}
                  className="group cursor-pointer relative aspect-[3/4] rounded-xl overflow-hidden glass border border-white/10"
                >
                  {/* Handle cases where coverImage might be missing */}
                  <img
                    src={client.coverImage || "/placeholder.svg"}
                    alt={client.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-bold text-lg truncate">{client.title}</h3>
                    <span className="text-white/80 text-xs uppercase tracking-wider">{client.category}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* --- VIEW 2: CHOICE MENU (PHOTOS OR VIDEOS) --- */}
          {selectedClient && viewMode === "menu" && (
            <motion.div
              key="choice-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8"
            >
              {/* Option A: Photography */}
              <div 
                onClick={() => setViewMode("photos")}
                className="group cursor-pointer relative h-64 md:h-96 rounded-2xl overflow-hidden border border-border bg-card hover:border-primary transition-all"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-12 h-12 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Graphic</h3>
                  <p className="text-muted-foreground">{selectedClient.photos?.length || 0} items</p>
                </div>
                {/* Background preview using the first photo or cover */}
                <img 
                  src={selectedClient.photos?.[0] || selectedClient.coverImage} 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 blur-sm group-hover:blur-0 transition-all duration-500"
                  alt="Photography Preview"
                />
              </div>

              {/* Option B: Videos */}
              <div 
                onClick={() => setViewMode("videos")}
                className="group cursor-pointer relative h-64 md:h-96 rounded-2xl overflow-hidden border border-border bg-card hover:border-primary transition-all"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-md group-hover:scale-110 transition-transform">
                    <Play className="w-12 h-12 text-foreground ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold">Videos</h3>
                  <p className="text-muted-foreground">{selectedClient.videos?.length || 0} items</p>
                </div>
                 {/* Background preview */}
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-100 group-hover:opacity-80 transition-all" />
              </div>
            </motion.div>
          )}

          {/* --- VIEW 3: GALLERIES --- */}
          
          {/* 3A: PHOTO GALLERY */}
          {selectedClient && viewMode === "photos" && (
            <motion.div
              key="photo-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedClient.photos?.map((photo: string, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <img src={photo} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
              {(!selectedClient.photos || selectedClient.photos.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                  No Graphic uploaded for this client yet.
                </div>
              )}
            </motion.div>
          )}

          {/* 3B: VIDEO GALLERY */}
          {selectedClient && viewMode === "videos" && (
            <motion.div
              key="video-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedClient.videos?.map((video: string, idx: number) => (
                  <motion.div 
                    key={idx}
                    className="aspect-video rounded-xl overflow-hidden bg-black shadow-xl"
                  >
                    <video 
                      controls 
                      className="w-full h-full"
                      poster={selectedClient.coverImage} 
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </motion.div>
                ))}
              </div>
              {(!selectedClient.videos || selectedClient.videos.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                  No videos uploaded for this client yet.
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
