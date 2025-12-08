import { Project, ExperienceItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "BestFrame AI",
    role: "Founder & Full-stack Developer",
    time: "Ongoing",
    description: "AI-powered SaaS that automatically extracts the best moments from videos",
    tech: ["Nuxt", "Vue", "Supabase", "Python", "FastAPI", "Stripe"],
    image: "/images/bestframe2.png", // AI Video
    link: "https://bestframe.pro/"
  },
  {
    id: 2,
    title: "Interactive 3D Portfolio",
    role: "Creative Developer",
    time: "2 days",
    description: "Immersive 3D portfolio showcasing experimental design, visual storytelling and advanced motion to highlight personal branding.",
    tech: ["Vue", "Three.js", "GSAP"],
    image: "/images/3D.png", // Abstract 3D
    link: "https://adrien-3d.netlify.app/"
  },
  {
    id: 3,
    title: "Slym",
    role: "Web Integrator",
    time: "6 months",
    description: "Contribution to a community-driven platform enabling users to create hubs, manage groups and sell digital products.",
    tech: ["Vue", "Inertia.js", "Laravel", "Tailwind"],
    image: "/images/slym.png", // Dark Dashboard/Platform
    link: "https://slym.co/"
  },
  {
    id: 4,
    title: "Last Sailor",
    role: "Web Integrator",
    time: "4 days",
    description: "Integration of a modern and immersive landing page for a travel and maritime adventure project.",
    tech: ["Vue", "GSAP", "Swiper", "Tailwind"],
    image: "/images/last.png",
    link: "https://last-sailors.netlify.app/"
  },
  {
    id: 5,
    title: "Devium",
    role: "Integration",
    time: "1 week",
    description: "Design and integration of a dynamic showcase website for a digital agency with a premium visual approach.",
    tech: ["Vue", "GSAP", "Swiper", "Tailwind"],
    image: "/images/devium.png",
    link: "https://devium.netlify.app/"
  },
  {
    id: 6,
    title: "MyCater",
    role: "Fullstack Developer",
    time: "1 year",
    description: "Integration and optimisation of a catering platform website focused on clarity, performance and conversion.",
    tech: ["ForestAdmin", "Redis", "Playwright", "AdonisJS"],
    image: "/images/mycater.png",
    link: "https://mycater.fr/"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    year: "2023 - Present",
    title: "Freelance Web Developer",
    subtitle: "Global Nomad",
    type: 'work',
    description: "Building tailored SaaS products for international clients while traveling the world."
  },
  {
    id: 2,
    year: "2022 - 2023",
    title: "Master's Degree: Tech Lead",
    subtitle: "Specialization in Cybersecurity",
    type: 'education',
    description: "Advanced architectural patterns, secure coding practices, and team leadership methodologies."
  },
  {
    id: 3,
    year: "2021 - 2023",
    title: "Apprenticeship Developer",
    subtitle: "Full-Stack Engineer",
    type: 'work',
    description: "2 years of intensive hands-on experience building enterprise-grade applications in agile environments."
  },
  {
    id: 4,
    year: "2021",
    title: "Bachelor's Degree",
    subtitle: "Web Development",
    type: 'education',
    description: "Focus on modern frontend frameworks and backend integration."
  },
  {
    id: 5,
    year: "2019 - 2021",
    title: "DUT Computer Science",
    subtitle: "University Institute of Technology",
    type: 'education',
    description: "Strong foundation in algorithms, data structures, and software engineering principles."
  }
];

export const VISITED_COUNTRIES = [
  "Argentina", "Costa Rica", "Nicaragua", "Colombia", "USA", 
  "French Polynesia", "South Africa", "Spain", "Canary Islands", 
  "Morocco", "Portugal", "Italy", "UK", "Guadeloupe", "Jordan", "Mexico"
];

export const CLIENT_COUNTRIES = [
  "USA", "India", "Austria", "Sweden", "Croatia", "UK"
];