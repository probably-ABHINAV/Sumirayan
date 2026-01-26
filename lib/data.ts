// Static data for the website

export const services = {
  design: {
    title: "Design",
    tagline: "Crafting Visual Excellence",
    description:
      "From campaign planning to digital marketing, we create compelling visual stories that resonate with your audience and drive results.",
    services: [
      { title: "Campaign Planning", description: "Strategic advertising campaigns that capture attention and convert" },
      { title: "Digital Marketing", description: "Data-driven digital strategies across all platforms" },
      { title: "Graphic Design", description: "Stunning visuals from logos to complete brand identities" },
      { title: "Video Editing", description: "Professional post-production that brings stories to life" },
      { title: "Brand Identity", description: "Complete branding solutions that define your presence" },
      { title: "Packaging Design", description: "Eye-catching packaging that sells on shelves" },
    ],
    caseStudies: [
      { title: "Tech Startup Rebrand", category: "Branding", image: "/tech-startup-branding-dark.jpg" },
      { title: "Food Festival Campaign", category: "Campaign", image: "/food-festival-campaign-dark.jpg" },
      { title: "Luxury Watch Launch", category: "Digital Marketing", image: "/luxury-watch-advertisement-dark.jpg" },
    ],
  },
  photography: {
    title: "Photography & Videography",
    tagline: "Capturing Moments, Creating Memories",
    description:
      "From weddings to product shoots, our lens captures the essence of every moment with cinematic excellence.",
    services: [
      { title: "Wedding Photography", description: "Timeless wedding memories with artistic flair" },
      { title: "Event Coverage", description: "Complete event documentation from setup to finale" },
      { title: "Product Photography", description: "Commercial shots that make products irresistible" },
      { title: "Portrait Sessions", description: "Professional portraits that capture personality" },
      { title: "Advertising Films", description: "Commercial videos that drive engagement" },
      { title: "YouTube & Social Content", description: "Content creation for digital platforms" },
    ],
    gallery: [
      { title: "Royal Wedding", category: "Wedding", image: "/elegant-wedding-photography-dark.jpg" },
      { title: "Corporate Gala", category: "Events", image: "/corporate-event-photography-dark.jpg" },
      { title: "Jewelry Collection", category: "Product", image: "/jewelry-product-photography-dark.jpg" },
      { title: "CEO Portrait", category: "Portrait", image: "/professional-portrait-dark.jpg" },
      { title: "Fashion Film", category: "Advertising", image: "/fashion-film-still-dark.jpg" },
      { title: "Tech Review", category: "YouTube", image: "/tech-review-thumbnail-dark.jpg" },
    ],
  },
  art: {
    title: "Art",
    tagline: "Where Imagination Meets Canvas",
    description:
      "Traditional and digital artistry that transforms spaces and creates lasting impressions through unique handcrafted pieces.",
    services: [
      { title: "Digital Painting", description: "Contemporary digital artwork for modern spaces" },
      { title: "Traditional Painting", description: "Handcrafted paintings with classical techniques" },
      { title: "Wall Murals", description: "Large-scale art installations that transform environments" },
      { title: "Sketching & Illustrations", description: "Detailed sketches for various applications" },
      { title: "Handmade Artwork", description: "Unique pieces crafted with care and precision" },
      { title: "Custom Commissions", description: "Personalized art tailored to your vision" },
    ],
    gallery: [
      { title: "Abstract Expressions", category: "Digital", image: "/abstract-digital-art-dark.jpg" },
      { title: "Landscape Oil", category: "Traditional", image: "/oil-painting-landscape-dark.jpg" },
      { title: "Corporate Mural", category: "Mural", image: "/corporate-wall-mural-dark.jpg" },
      { title: "Character Study", category: "Sketch", image: "/detailed-pencil-sketch-dark.jpg" },
    ],
  },
}

// --- UPDATED PROJECTS SECTION FOR 15 CLIENTS ---
export const projects = [
  { 
    id: 1, 
    title: "Foundation Academy", 
    category: "Design", 
    coverImage: "/graphic_design_brand_ad310d11.jpg", 
    photos: [
       "/https://www.dropbox.com/scl/fi/q7quisrbeyfv8iwm0dmqb/621411602_17894638944399589_3102267917110965732_n.webp?rlkey=2wlw1f15nechmr8m1mgr1ikcl&st=54lc70th&dl=0", 
       "/client1-photo2.jpg",
       "/client1-photo3.jpg"
    ],
    videos: [
       "/client1-video1.mp4"
    ]
  },
  { 
    id: 2, 
    title: "Client 2 Name", 
    category: "Photography", 
    coverImage: "/professional_wedding_3c6dac0e.jpg", 
    photos: ["/link-here.jpg", "/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 3, 
    title: "Client 3 Name", 
    category: "Art", 
    coverImage: "/abstract_modern_art__f2044bf0.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 4, 
    title: "Client 4 Name", 
    category: "Design", 
    coverImage: "/luxury_product_photo_319cae7d.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 5, 
    title: "Client 5 Name", 
    category: "Photography", 
    coverImage: "/corporate_event_phot_9b1b5c5a.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 6, 
    title: "Client 6 Name", 
    category: "Art", 
    coverImage: "/abstract_modern_art__739208b9.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 7, 
    title: "Client 7 Name", 
    category: "Design", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 8, 
    title: "Client 8 Name", 
    category: "Photography", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 9, 
    title: "Client 9 Name", 
    category: "Art", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 10, 
    title: "Client 10 Name", 
    category: "Design", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 11, 
    title: "Client 11 Name", 
    category: "Photography", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 12, 
    title: "Client 12 Name", 
    category: "Art", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 13, 
    title: "Client 13 Name", 
    category: "Design", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 14, 
    title: "Client 14 Name", 
    category: "Photography", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
  { 
    id: 15, 
    title: "Client 15 Name", 
    category: "Art", 
    coverImage: "/placeholder.jpg", 
    photos: ["/link-here.jpg"],
    videos: ["/video-link-here.mp4"]
  },
]

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Marketing Director, TechVista",
    content:
      "Sumirayan Design transformed our brand identity completely. Their creative approach and attention to detail exceeded all expectations. The campaign they designed increased our engagement by 300%.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Founder, EventMasters",
    content:
      "The photography team captured our corporate event beautifully. Every moment was preserved with artistic precision. We've been working with them for 3 years now.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Interior Designer",
    content:
      "The custom mural they created for our client's office is absolutely stunning. It became the centerpiece of the entire space. True artists with incredible vision.",
    avatar: "/placeholder-user.jpg",
  },
]

export const events = [
  {
    id: 1,
    title: "Creativity Conference 2025",
    date: "March 15, 2025",
    description: "Annual gathering of creative minds featuring workshops, talks, and networking opportunities.",
    status: "upcoming" as const,
    location: "Mumbai, India",
  },
  {
    id: 2,
    title: "Photography Masterclass",
    date: "February 28, 2025",
    description: "Intensive workshop on advanced photography techniques and post-processing.",
    status: "upcoming" as const,
    location: "Virtual Event",
  },
  {
    id: 3,
    title: "Art Exhibition: Visions",
    date: "January 10, 2025",
    description: "Showcase of our artists' latest works exploring themes of identity and culture.",
    status: "completed" as const,
    location: "Delhi Art Gallery",
  },
  {
    id: 4,
    title: "Brand Strategy Workshop",
    date: "December 5, 2024",
    description: "Interactive session on building memorable brand identities in the digital age.",
    status: "completed" as const,
    location: "Bangalore",
  },
]

export const articles = [
  {
    id: 1,
    title: "The Psychology of Color in Brand Design",
    excerpt: "Understanding how color choices influence consumer perception and brand recognition.",
    category: "Design",
    date: "January 20, 2025",
    readTime: "8 min read",
    image: "/graphic_design_brand_694fc295.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Mastering Natural Light Photography",
    excerpt: "Tips and techniques for capturing stunning photos using available light.",
    category: "Photography",
    date: "January 15, 2025",
    readTime: "6 min read",
    image: "/professional_wedding_72f58338.jpg",
  },
  {
    id: 3,
    title: "The Renaissance of Digital Art",
    excerpt: "How technology is reshaping the art world and creating new possibilities.",
    category: "Art History",
    date: "January 10, 2025",
    readTime: "10 min read",
    image: "/abstract_modern_art__739208b9.jpg",
  },
  {
    id: 4,
    title: "Building a Social Media Strategy",
    excerpt: "Essential steps for creating content that engages and converts.",
    category: "Marketing",
    date: "January 5, 2025",
    readTime: "7 min read",
    image: "/creative_team_workin_bdeb373e.jpg",
  },
]

export const jobs = [
  {
    id: 1,
    title: "Senior Video Editor",
    type: "Full-time",
    location: "Mumbai, India",
    description:
      "We're looking for an experienced video editor to join our post-production team. Expertise in Premiere Pro and After Effects required.",
  },
  {
    id: 2,
    title: "Graphic Designer",
    type: "Full-time",
    location: "Remote",
    description:
      "Creative graphic designer needed for branding and campaign projects. Strong portfolio in brand identity design preferred.",
  },
  {
    id: 3,
    title: "Wedding Photographer",
    type: "Contract",
    location: "Multiple Cities",
    description:
      "Experienced wedding photographer for our growing photography division. Must have own professional equipment.",
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    type: "Full-time",
    location: "Delhi, India",
    description: "Data-driven marketer to manage client campaigns across social and digital platforms.",
  },
  {
    id: 5,
    title: "Junior Artist",
    type: "Internship",
    location: "Mumbai, India",
    description: "Aspiring artist to assist on mural and illustration projects. Training provided.",
  },
]

export const stats = [
  { label: "Brands Served", value: "150+" },
  { label: "Projects Delivered", value: "500+" },
  { label: "Years of Excellence", value: "12+" },
  { label: "Team Members", value: "45+" },
]

export const processSteps = [
  {
    step: 1,
    title: "Discover",
    description: "We dive deep into understanding your brand, goals, and vision through comprehensive consultation.",
  },
  {
    step: 2,
    title: "Create",
    description: "Our creative team crafts unique concepts and strategies tailored to your specific needs.",
  },
  {
    step: 3,
    title: "Refine",
    description: "Through collaborative feedback, we polish every detail until perfection is achieved.",
  },
  {
    step: 4,
    title: "Deliver",
    description: "We deliver exceptional results on time, every time, with ongoing support.",
  },
]

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Design", href: "/design" },
  { name: "Photography", href: "/photography" },
  { name: "Art", href: "/art" },
  { name: "Learn", href: "/learn" },
  { name: "Events", href: "/events" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
]
