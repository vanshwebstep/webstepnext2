"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FaArrowRight, FaQuoteLeft, FaStar, FaExternalLinkAlt, FaArrowLeft, FaCheck,
  FaStethoscope, FaShoppingCart, FaCloud, FaGraduationCap, FaCreditCard, FaHeart,
  FaBuilding, FaBroadcastTower, FaSearch, FaMapMarkedAlt, FaPenNib, FaCogs, FaRocket,
  FaHospital, FaBoxOpen, FaCoins, FaLightbulb, FaExclamationTriangle
} from "react-icons/fa";
import { HiOutlineArrowUpRight, HiOutlineChevronDown, HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { fetchContent } from "@/lib/contentApi";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// DATA
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const STATS = [
  { num: "120+", label: "Projects Delivered", sub: "Across 15+ industries" },
  { num: "50+", label: "Happy Clients", sub: "From startups to enterprises" },
  { num: "12+", label: "Years Experience", sub: "Since 2012" },
  { num: "98%", label: "Client Satisfaction", sub: "Long-term partnerships" },
];
const CATEGORIES = ["All", "Healthcare", "E-Commerce", "SaaS", "Education", "Fintech", "Non-Profit", "Enterprise"];
  const DEFAULTADTYES =
  process.env.NEXT_PUBLIC_MAIN_BASE_URL || "https://webstepdev.com";
const CASE_STUDIES = [
  {
    id: "dr-treat",
    title: "Dr. Treat",
    tagline: "Redesigning patient care from the ground up",
    category: "Healthcare",
    tags: ["Healthcare", "SaaS"],
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    logo: FaHospital,
    client: "Dr. Treat Inc.",
    duration: "6 months",
    year: "2023",
    tech: ["React", "Node.js", "AWS", "Figma"],
    challenge: "A fragmented patient onboarding system causing 40% drop-offs before appointments were confirmed. Staff had to manually call patients to complete sign-ups, creating a bottleneck that cost 15 hours of admin time per week.",
    solution: "End-to-end UX redesign + custom booking engine with real-time slot management and automated reminders. We rebuilt the entire patient journey from scratch — from first click to confirmed appointment — with a mobile-first approach.",
    result: "72% reduction in drop-off rate. Appointment throughput grew 3× in 90 days. Admin hours saved per week went from 15 to under 2.",
    metrics: [
      { label: "Drop-off Reduced", val: "72%" },
      { label: "Booking Speed", val: "3×" },
      { label: "Patient NPS", val: "+58" },
    ],
    deliverables: ["Custom booking engine", "Patient mobile app", "Admin dashboard", "Automated SMS/Email reminders", "Real-time slot management"],
    testimonial: {
      quote: "I enjoy working with Karan from Webstep Solutions, he is fluent in English and has excellent developmental skills. Webstep Solutions provided the deliverables in a timely and professional manner. They know WordPress (as well as other platforms) and exceeded expectations.",
      author: "Bradley Braun",
      role: "Verified Client",
      initials: "BB",
      color: "#7C3AED",
    },
    featured: true,
    color: "#6366f1",
    accent: "#e0e7ff",
    lightText: "#4338ca",
    darkBg: "#4338ca",
  },
  {
    id: "shopvault",
    title: "ShopVault",
    tagline: "An e-commerce engine that scales with ambition",
    category: "E-Commerce",
    tags: ["E-Commerce", "Enterprise"],
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
    logo: FaShoppingCart,
    client: "ShopVault Ltd.",
    duration: "8 months",
    year: "2023",
    tech: ["Laravel", "React", "MySQL", "Stripe", "Redis"],
    challenge: "Legacy Magento store crashing under Black Friday traffic. $800K in lost sales in one weekend due to server timeouts, broken checkout flows, and a mobile experience from 2014.",
    solution: "Custom Laravel commerce engine with Redis caching, CDN integration, and a headless React storefront. We stress-tested for 10× expected peak traffic and built an auto-scaling infrastructure on AWS.",
    result: "$2M+ monthly GMV on launch. Zero downtime across 3 consecutive Black Fridays. Mobile conversion doubled.",
    metrics: [
      { label: "Monthly GMV", val: "$2M+" },
      { label: "Page Load", val: "0.8s" },
      { label: "Conversion Lift", val: "+44%" },
    ],
    deliverables: ["Headless React storefront", "Laravel commerce API", "Redis caching layer", "Stripe payment integration", "AWS auto-scaling setup"],
    testimonial: {
      quote: "Karan from Webstep Solutions saved the day for us! What began as some final finishes before launching to include membership account registration pages set up, adding icons and linking our social media accounts with the site, and some testing developed into a significant list of issues that Karan was able to discover and provide a various array of fixes including writing additional code, installing the appropriate plugins and a vast amount of troubleshooting and testing. Karan possesses an immense level of skills, when he says he will work, he does. When he says he will be finished, he meets the deadline. When he knows issues are critical, he stays the course until the issues are resolved. Like other business owners, we obviously have high expectations when hiring staff and engaging contractors. Karan exceeded our expectations. 10 stars!",
      author: "Magnus Stihl",
      role: "Business Owner",
      initials: "MS",
      color: "#059669",
    },
    featured: true,
    color: "#f59e0b",
    accent: "#fef3c7",
    lightText: "#b45309",
    darkBg: "#92400e",
  },
  {
    id: "eduforge",
    title: "EduForge LMS",
    tagline: "Learning infrastructure for the next generation",
    category: "Education",
    tags: ["Education", "SaaS"],
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80",
    logo: FaGraduationCap,
    client: "EduForge Group",
    duration: "10 months",
    year: "2024",
    tech: ["PHP", "React", "MySQL", "WebRTC", "AWS"],
    challenge: "120 institutions managing students on spreadsheets. No unified grading, no live class capability. Teachers were spending 30% of their time on admin instead of teaching.",
    solution: "Full-stack LMS with live WebRTC classrooms, automated grading, progress analytics, and mobile apps. Integrated with existing institution ERPs and built a self-serve onboarding flow.",
    result: "50,000+ students onboarded. 92% course completion rate vs 41% industry average. Teacher admin time cut by 65%.",
    metrics: [
      { label: "Students Served", val: "50K+" },
      { label: "Completion Rate", val: "92%" },
      { label: "Institutions", val: "120+" },
    ],
    deliverables: ["LMS web platform", "Live WebRTC classrooms", "Mobile student app", "Automated grading engine", "Analytics dashboard"],
    testimonial: {
      quote: "Karan did an excellent job in a timely manner. He added his own design concepts without being asked, which helped make the project even better. I highly recommend Karan and am already hiring him for a second frontend project.",
      author: "Nathanael Murphy",
      role: "Frontend Client",
      initials: "NM",
      color: "#DB2777",
    },
    featured: false,
    color: "#10b981",
    accent: "#d1fae5",
    lightText: "#047857",
    darkBg: "#064e3b",
  },
  {
    id: "retrievr",
    title: "Retrievr",
    tagline: "Asset tracking reimagined for the modern enterprise",
    category: "SaaS",
    tags: ["SaaS", "Enterprise"],
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80",
    logo: FaBoxOpen,
    client: "Retrievr Corp.",
    duration: "7 months",
    year: "2022",
    tech: ["Node.js", "Vue.js", "MongoDB", "AWS IoT"],
    challenge: "Warehouses losing $3M/year in misplaced assets. Manual barcode scans taking 8+ hours per audit. Zero real-time visibility into asset location or status.",
    solution: "IoT-integrated SaaS platform with real-time GPS tracking, automated audit trails, and mobile scanner app. Integrated with existing warehouse management systems via REST APIs.",
    result: "Asset loss reduced by 89%. Audit time cut from 8 hours to 22 minutes. ROI achieved in under 3 weeks.",
    metrics: [
      { label: "Asset Loss ↓", val: "89%" },
      { label: "Audit Time", val: "22min" },
      { label: "ROI in Y1", val: "6.4×" },
    ],
    deliverables: ["IoT SaaS platform", "Mobile scanner app", "Real-time GPS dashboard", "Automated audit trails", "WMS API integration"],
    testimonial: {
      quote: "Karan was excellent. He went above and beyond and can perform any task when it comes to website design.",
      author: "Syga Thomas",
      role: "Verified Client",
      initials: "ST",
      color: "#0891B2",
    },
    featured: false,
    color: "#8b5cf6",
    accent: "#ede9fe",
    lightText: "#6d28d9",
    darkBg: "#4c1d95",
  },
  {
    id: "fundpath",
    title: "FundPath",
    tagline: "Where fintech meets financial clarity",
    category: "Fintech",
    tags: ["Fintech", "SaaS"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    logo: FaCoins,
    client: "FundPath Financial",
    duration: "9 months",
    year: "2023",
    tech: ["Node.js", "React", "PostgreSQL", "Plaid API"],
    challenge: "Retail investors struggling to understand their portfolio performance. 70% of users churning in week 1 because the dashboard was overwhelming and jargon-heavy.",
    solution: "AI-powered investment dashboard with plain-English insights, automated rebalancing, and tax reports. Replaced financial jargon with contextual tooltips and performance narratives.",
    result: "Week-1 churn dropped from 70% to 12%. AUM on platform grew from $4M to $47M in 12 months.",
    metrics: [
      { label: "Churn ↓", val: "70%→12%" },
      { label: "AUM Growth", val: "10×" },
      { label: "DAU", val: "28K+" },
    ],
    deliverables: ["AI insights engine", "Investment dashboard", "Automated rebalancing", "Tax report generator", "Plaid bank integration"],
    testimonial: {
      quote: "The freelancer was very professional, well prepared and had a lot of patience with us.",
      author: "Amir Dagan",
      role: "Verified Client",
      initials: "AD",
      color: "#EA580C",
    },
    featured: false,
    color: "#f43f5e",
    accent: "#ffe4e6",
    lightText: "#be123c",
    darkBg: "#881337",
  },
  {
    id: "grace-mercy",
    title: "Grace Mercy Foundation",
    tagline: "Giving a non-profit the digital presence it deserves",
    category: "Non-Profit",
    tags: ["Non-Profit"],
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80",
    logo: FaHeart,
    client: "Grace Mercy Foundation",
    duration: "3 months",
    year: "2022",
    tech: ["Next.js", "Tailwind CSS", "Sanity CMS", "Stripe"],
    challenge: "A 20-year-old organisation with a website from 2009. Online donations were nearly zero. Staff had no way to update content without calling a developer.",
    solution: "Emotionally resonant website with donor journey optimisation, CMS for staff, and streamlined giving flow. Built a recurring donation system with impact storytelling baked in.",
    result: "Online donations grew 312% in 6 months. Monthly recurring donors up 5×. Staff now update content daily without any technical help.",
    metrics: [
      { label: "Donation Growth", val: "312%" },
      { label: "Recurring Donors", val: "5×" },
      { label: "Volunteer Sign-ups", val: "+180%" },
    ],
    deliverables: ["Website redesign", "Donor journey flow", "Sanity CMS setup", "Stripe donation integration", "Impact storytelling pages"],
    testimonial: {
      quote: "Wonderful work done!",
      author: "Ben Tee",
      role: "Verified Client",
      initials: "BT",
      color: "#7C3AED",
    },
    featured: false,
    color: "#ec4899",
    accent: "#fce7f3",
    lightText: "#be185d",
    darkBg: "#831843",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery & Audit", desc: "We deep-dive into your business, competitors, users, and tech stack. No assumptions — only evidence.", icon: FaSearch, color: "#6366f1", accent: "#e0e7ff" },
  { num: "02", title: "Strategy & Architecture", desc: "We define the roadmap, tech architecture, and success metrics before writing a single line of code.", icon: FaMapMarkedAlt, color: "#8b5cf6", accent: "#ede9fe" },
  { num: "03", title: "Design & Prototype", desc: "High-fidelity mockups and interactive prototypes, validated with real users before development begins.", icon: FaPenNib, color: "#ec4899", accent: "#fce7f3" },
  { num: "04", title: "Build & Iterate", desc: "Agile 2-week sprints. You see working software every fortnight — no black box development.", icon: FaCogs, color: "#f59e0b", accent: "#fef3c7" },
  { num: "05", title: "Launch & Scale", desc: "Careful staged rollout, performance monitoring, and post-launch optimisation built into every engagement.", icon: FaRocket, color: "#10b981", accent: "#d1fae5" },
];
const INDUSTRIES = [
  { name: "Healthcare", count: 42, icon: "🏥" },
  { name: "E-Commerce", count: 68, icon: "🛒" },
  { name: "SaaS", count: 95, icon: "☁️" },
  { name: "Education", count: 38, icon: "🎓" },
  { name: "Fintech", count: 55, icon: "💳" },
  { name: "Non-Profit", count: 29, icon: "❤️" },
  { name: "Enterprise", count: 71, icon: "🏢" },
  { name: "IoT / Hardware", count: 22, icon: "📡" },
];

// —————————————————————————————————————————————————————————————————————————————————————————————————
const normalizeList = (value, fallback = []) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
  }
  return fallback;
};

const normalizeMetrics = (value, fallback = []) => {
  const metrics = normalizeList(value, fallback);
  return metrics
    .map((metric) => {
      if (typeof metric === "string") {
        const [label, val] = metric.split(":").map((part) => part.trim());
        return { label: label || "Metric", val: val || "" };
      }
      return {
        label: metric.label || "Metric",
        val: metric.val || metric.value || "",
      };
    })
    .filter((metric) => metric.label && metric.val);
};

const normalizeCaseStudy = (study, index) => {
  const base = CASE_STUDIES[index % CASE_STUDIES.length];
  const testimonial = study.testimonial || {};

  return {
    ...base,
    ...study,
    id: study.id || study.slug || base.id,
    title: study.title || base.title,
    tagline: study.tagline || base.tagline,
    category: study.category || base.category,
    tags: normalizeList(study.tags, base.tags),
    img: study.img || study.image || base.img,
    logo: study.logo || base.logo,
    client: study.client || base.client,
    duration: study.duration || base.duration,
    year: String(study.year || base.year),
    tech: normalizeList(study.tech || study.technologies, base.tech),
    challenge: study.challenge || base.challenge,
    solution: study.solution || base.solution,
    result: study.result || base.result,
    metrics: normalizeMetrics(study.metrics, base.metrics),
    deliverables: normalizeList(study.deliverables, base.deliverables),
    testimonial: {
      quote: testimonial.quote || study.testimonial_quote || base.testimonial.quote,
      author: testimonial.author || study.testimonial_author || base.testimonial.author,
      role: testimonial.role || study.testimonial_role || base.testimonial.role,
      avatar: testimonial.avatar || study.testimonial_avatar || base.testimonial.avatar,
    },
    featured: Boolean(study.featured ?? base.featured),
    color: study.color || base.color,
    accent: study.accent || base.accent,
    lightText: study.lightText || study.light_text || base.lightText,
    darkBg: study.darkBg || study.dark_bg || base.darkBg,
  };
};

// ANIMATION HELPER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 40 : direction === "down" ? -40 : 0, x: direction === "left" ? 40 : direction === "right" ? -40 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CASE STUDY DETAIL PANEL (inline, no redirect)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CaseStudyDetail = ({ cs, onClose }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-stretch"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 280 }}
          ref={scrollRef}
          className="ml-auto w-full max-w-3xl h-full overflow-y-auto bg-white relative pt-20"
          style={{ boxShadow: "-20px 0 80px rgba(0,0,0,0.25)" }}
        >
          {/* Hero Image */}
          <div className="relative h-72 overflow-hidden">
            <img src={cs.img} alt={cs.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, transparent 30%, ${cs.darkBg}ee 100%)` }} />

            {/* Back button */}
            <button
              onClick={onClose}
              className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2.5 rounded-xl text-white
                text-[13px] font-bold border border-white/30 backdrop-blur-md transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <FaArrowLeft className="text-[11px]" />
              Back
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white
                border border-white/30 backdrop-blur-md transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <HiXMark className="text-xl" />
            </button>

            {/* Bottom badge */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white mb-3"
                    style={{ background: `${cs.color}cc`, border: "1px solid rgba(255,255,255,0.3)" }}>
                    {cs.category}
                  </span>
                  <h2 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight">{cs.title}</h2>
                  <p className="text-white/70 text-[14px] mt-1 italic">&ldquo;{cs.tagline}&rdquo;</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">{cs.year}</p>
                  <p className="text-white/80 text-[13px] font-semibold">{cs.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-10 space-y-10">

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {cs.metrics.map(m => (
                <div key={m.label} className="text-center p-5 rounded-2xl border"
                  style={{ background: cs.accent, borderColor: `${cs.color}30` }}>
                  <p className="text-3xl font-extrabold mb-1" style={{ color: cs.lightText }}>{m.val}</p>
                  <p className="text-slate-500 text-[11px] leading-tight">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Client info */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: cs.accent, color: cs.lightText }}>
                {typeof cs.logo === "function" ? <cs.logo /> : cs.logo}
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Client</p>
                <p className="text-slate-900 font-bold">{cs.client}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider">Duration</p>
                <p className="text-slate-700 font-semibold text-[14px]">{cs.duration}</p>
              </div>
            </div>

            {/* Challenge â†’ Solution â†’ Result */}
            {[
              { icon: "ðŸ”¥", label: "The Challenge", text: cs.challenge, bg: "#fff7ed", border: "#fed7aa", text_c: "#9a3412" },
              { icon: "ðŸ’¡", label: "Our Solution", text: cs.solution, bg: "#f0fdf4", border: "#bbf7d0", text_c: "#14532d" },
              { icon: "ðŸš€", label: "The Result", text: cs.result, bg: "#eff6ff", border: "#bfdbfe", text_c: "#1e3a8a" },
            ].map(({ icon, label, text, bg, border, text_c }) => (
              <div key={label} className="rounded-2xl p-6" style={{ background: bg, border: `1.5px solid ${border}` }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xl">{icon}</span>
                  <p className="font-bold text-[13px] uppercase tracking-wider" style={{ color: text_c }}>{label}</p>
                </div>
                <p className="text-slate-700 text-[15px] leading-relaxed">{text}</p>
              </div>
            ))}

            {/* Tech Stack */}
            <div>
              <p className="text-slate-500 text-[11px] uppercase tracking-[0.25em] font-bold mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {cs.tech.map(t => (
                  <span key={t} className="px-4 py-2 rounded-xl text-[13px] font-semibold border border-slate-200 text-slate-600 bg-white shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <p className="text-slate-500 text-[11px] uppercase tracking-[0.25em] font-bold mb-4">What We Delivered</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {cs.deliverables.map(d => (
                  <div key={d} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 bg-white">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: cs.accent }}>
                      <FaCheck className="text-[9px]" style={{ color: cs.lightText }} />
                    </div>
                    <span className="text-slate-700 text-[13px] font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="relative rounded-2xl p-8 overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${cs.darkBg}18, ${cs.color}12)`, border: `1.5px solid ${cs.color}25` }}>
              <FaQuoteLeft className="text-5xl mb-4 opacity-20" style={{ color: cs.color }} />
              <p className="text-slate-700 text-[17px] leading-relaxed italic mb-6 font-medium">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-black text-white text-sm flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${cs.testimonial.color || cs.color}, #a855f7)` }}>
                  {cs.testimonial.initials || cs.testimonial.author?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">{cs.testimonial.author}</p>
                  <p className="text-slate-400 text-[12px]">{cs.testimonial.role}</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-xs" />)}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-500 text-[14px] font-semibold hover:border-slate-300 transition-all"
              >
                <FaArrowLeft className="text-[11px]" />
                Back to all projects
              </button>

              <a
                href="/contactus"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-bold text-white text-[14px] transition-all duration-300 hover:scale-105 shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${cs.color}, ${cs.darkBg})`,
                  boxShadow: `0 8px 24px ${cs.color}40`,
                }}
              >
                Start a similar project
                <HiOutlineArrowUpRight />
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// HERO
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  return (
    <section className="relative pt-52 sm:pt-60 md:pt-64 pb-16 sm:pb-24 flex flex-col items-center justify-start overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 30%, #fdf4ff 60%, #eff6ff 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,121,249,0.15) 0%, transparent 60%)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(100,100,100,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>
      <motion.div style={{ y }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl mb-6 sm:mb-8 border border-white/60 bg-white/50 backdrop-blur-xl shadow-sm text-[9px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase"
          style={{ color: "#FF1F8E" }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FF1F8E" }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#FF1F8E" }} />
          </span>
          Case Studies &amp; Client Results
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] sm:leading-[0.95] text-slate-900 mb-4 sm:mb-6">
          Real projects.<br />
          <span className="relative inline-block"
            style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Real results.
            <span className="absolute left-0 -bottom-2 w-full h-[5px] rounded-full animate-pulse"
              style={{ background: "linear-gradient(90deg, #E879F9, #A855F7, #38BDF8)", filter: "blur(4px)", opacity: 0.6 }} />
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12">
          120+ projects. 50+ clients. Every case study here is a story of a real problem
          solved — with measurable, verified outcomes you can hold us to.        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <a href="#featured" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-xs sm:text-[15px] transition-all duration-300 hover:scale-105 whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)", boxShadow: "0 16px 40px rgba(168,85,247,0.35)" }}>
            <span>Explore Work</span> <HiOutlineArrowUpRight className="shrink-0" />
          </a>
          <a href="#process" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-slate-600 text-xs sm:text-[15px] border border-slate-200 hover:border-purple-300 hover:text-purple-600 bg-white/60 backdrop-blur-md transition-all duration-300 whitespace-nowrap">
            <span>Our Process</span>
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mt-8 sm:mt-12 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
          <HiOutlineChevronDown className="animate-bounce text-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STATS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const StatsTicker = () => (
  <section className="bg-white border-y border-slate-100 py-14">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold mb-1"
              style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {s.num}
            </p>
            <p className="text-slate-900 font-semibold text-[15px] mb-0.5">{s.label}</p>
            <p className="text-slate-400 text-[12px]">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedStudies = ({ caseStudies, onOpen }) => {
  const featured = caseStudies.filter(c => c.featured);
  return (
    <section id="featured" className="py-24 px-6"
      style={{ background: "linear-gradient(160deg, #f0fdf9 0%, #fdf4ff 60%, #eff6ff 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FF1F8E] uppercase mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF1F8E] shrink-0" />
            <span>FEATURED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            Headline{" "}
            <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Case Studies
            </span>
          </h2>
        </Reveal>
        <div className="space-y-10">
          {featured.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 0.15}>
              <div className="group relative rounded-3xl overflow-hidden border border-slate-100 bg-white
                shadow-[0_4px_24px_rgba(168,85,247,0.08)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.18)]
                hover:border-purple-100 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <img src={cs.img} alt={cs.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md border border-white/40 text-white shadow-sm"
                        style={{ background: `${cs.color}cc` }}>{cs.category}</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: cs.accent, color: cs.lightText }}>
                        {typeof cs.logo === "function" ? <cs.logo /> : cs.logo}
                      </div>
                      <div>
                        <p className="text-slate-400 text-[11px] tracking-wider uppercase">{cs.client}</p>
                        <h3 className="text-slate-900 text-xl sm:text-2xl font-extrabold">{cs.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-[15px] leading-relaxed mb-6 italic">&ldquo;{cs.tagline}&rdquo;</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-7 p-4 rounded-2xl border"
                      style={{ background: cs.accent, borderColor: `${cs.color}22` }}>
                      {cs.metrics.map(m => (
                        <div key={m.label} className="text-center">
                          <p className="text-xl sm:text-2xl font-extrabold" style={{ color: cs.lightText }}>{m.val}</p>
                          <p className="text-slate-500 text-[10px] sm:text-[11px] mt-0.5 leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {cs.tech.map(t => (
                        <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold border border-slate-200 text-slate-500 bg-slate-50">{t}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => onOpen(cs)}
                      className="group/btn inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl font-bold text-white text-xs sm:text-[14px]
                        transition-all duration-300 hover:gap-3 hover:scale-105 w-full sm:w-fit shadow-md whitespace-nowrap"
                      style={{ background: `linear-gradient(135deg, ${cs.color}, ${cs.color}cc)`, boxShadow: `0 8px 24px ${cs.color}30` }}>
                      <span>Read Full Case Study</span>
                      <FaArrowRight className="text-[12px] shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ALL CASE STUDIES GRID
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const AllStudies = ({ caseStudies, categories, onOpen }) => {
  const [active, setActive] = useState("All");

  useEffect(() => {
    if (!categories.includes(active)) setActive("All");
  }, [active, categories]);

  const filtered = active === "All" ? caseStudies : caseStudies.filter(c => c.tags?.includes(active));
  const counts = categories.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? caseStudies.length : caseStudies.filter(c => c.tags?.includes(cat)).length;
    return acc;
  }, {});

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FF1F8E] uppercase mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF1F8E] shrink-0" />
            <span>ALL PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            Browse By{" "}
            <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Industry
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide border transition-all duration-300
                  ${active === cat ? "text-white border-transparent scale-105 shadow-lg" : "bg-white text-slate-500 border-slate-200 hover:border-purple-200 hover:text-purple-600 hover:scale-105"}`}
                style={active === cat ? { background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)", boxShadow: "0 8px 20px rgba(168,85,247,0.3)" } : {}}>
                <span className={`w-1.5 h-1.5 rounded-full ${active === cat ? "bg-white/70" : "bg-purple-300"}`} />
                {cat}
                <span className={`min-w-[18px] text-center text-[9px] font-bold px-1.5 py-0.5 rounded-full ${active === cat ? "bg-white/25 text-white" : "bg-purple-100 text-purple-500"}`}>
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs, i) => (
            <Reveal key={`${active}-${cs.id}`} delay={i * 0.07}>
              <div
                onClick={() => onOpen(cs)}
                className="group relative rounded-[2rem] overflow-hidden border border-purple-100/60
                  bg-white/70 backdrop-blur-md shadow-[0_4px_24px_rgba(168,85,247,0.08)]
                  transition-all duration-500 flex flex-col h-full cursor-pointer
                  hover:-translate-y-3 hover:scale-[1.02]
                  hover:shadow-[0_28px_64px_rgba(168,85,247,0.2),0_4px_16px_rgba(236,72,153,0.1)]
                  hover:border-purple-200/80">
                <div className="relative h-52 overflow-hidden">
                    <img src={`${DEFAULTADTYES}/${cs.img}`} alt={cs.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4"><span className="text-xl">{cs.logo}</span></div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase text-white backdrop-blur-md border border-white/30"
                      style={{ background: `${cs.color}cc` }}>{cs.category}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white/60 text-[10px] uppercase tracking-wider">{cs.year} Â· {cs.duration}</p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    flex flex-col justify-end p-5"
                    style={{ background: "linear-gradient(to top, rgba(15,15,40,0.92) 0%, rgba(15,15,40,0.3) 60%, transparent 100%)" }}>
                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white/80 text-[13px] leading-relaxed mb-3 line-clamp-2">{cs.challenge}</p>
                      <div className="flex items-center justify-end">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ background: `linear-gradient(135deg, ${cs.color}, ${cs.color}bb)` }}>
                          <FaExternalLinkAlt size={11} color="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 bg-white/90 backdrop-blur-md border-t border-purple-50 flex flex-col flex-1">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: cs.lightText }}>{cs.category}</p>
                  <h3 className="text-slate-900 font-extrabold text-[17px] tracking-tight mb-2.5">{cs.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cs.metrics.map(m => (
                      <div key={m.label} className="px-3 py-1.5 rounded-xl text-center"
                        style={{ background: cs.accent, border: `1px solid ${cs.color}25` }}>
                        <p className="text-[13px] font-extrabold" style={{ color: cs.lightText }}>{m.val}</p>
                        <p className="text-slate-400 text-[9px]">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cs.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-slate-500 border border-slate-100 bg-slate-50">{t}</span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[13px] font-bold mt-auto transition-all duration-300 group/lnk" style={{ color: cs.color }}>
                    Read case study
                    <HiOutlineArrowUpRight className="group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5 transition-transform text-sm" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TESTIMONIALS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Testimonials = () => {
  const testimonials = [
    {
      author: "Bradley Braun",
      role: "Verified Client",
      quote: "I enjoy working with Karan from Webstep Solutions, he is fluent in English and has excellent developmental skills.",
      project: "WordPress & Dev",
      color: "#7C3AED",
      accent: "#ede9fe",
      lightText: "#5b21b6",
      initials: "BB",
    },
    {
      author: "Bradley Braun",
      role: "Verified Client",
      quote: "Webstep Solutions provided the deliverables in a timely and professional manner. They knows WordPress (as qwell as other platforms) and exceeded expectations.",
      project: "WordPress & Delivery",
      color: "#6366F1",
      accent: "#e0e7ff",
      lightText: "#4338ca",
      initials: "BB",
    },
    {
      author: "Magnus Stihl",
      role: "Business Owner",
      quote: "Karan from Webstep Solutions saved the day for us! What began as some final finishes before launching to include membership account registration pages set up, adding icons and linking our social media accounts with the site, and some testing developed into a significant list of issues that Karan was able to discover and provide a various array of fixes including writing additional code, installing the appropriate plugins and a vast amount of troubleshooting and testing. Karan possesses an immense level of skills, when he says he will work, he does. When he says he will be finished, he meets the deadline. When he knows issues are critical, he stays the course until the issues are resolved. Like other business owners, we obviously have high expectations when hiring staff and engaging contractors. Karan exceeded our expectations. 10 stars!",
      project: "Membership & Custom Dev",
      color: "#059669",
      accent: "#d1fae5",
      lightText: "#065f46",
      initials: "MS",
    },
    {
      author: "Syga Thomas",
      role: "Verified Client",
      quote: "Karan was excellent. He went above and beyond and can perform any task when it comes to website design.",
      project: "Website Design",
      color: "#0891B2",
      accent: "#e0f2fe",
      lightText: "#0369a1",
      initials: "ST",
    },
    {
      author: "Nathanael Murphy",
      role: "Frontend Client",
      quote: "Karan did an excellent job in a timely manner. He added his own design concepts without being asked, which helped make the project even better. I highly recommend Karan and am already hiring him for a second frontend project.",
      project: "UI/UX & Frontend",
      color: "#DB2777",
      accent: "#fce7f3",
      lightText: "#9d174d",
      initials: "NM",
    },
    {
      author: "Ben Tee",
      role: "Verified Client",
      quote: "Wonderful work done!",
      project: "Web Solutions",
      color: "#7C3AED",
      accent: "#ede9fe",
      lightText: "#5b21b6",
      initials: "BT",
    },
    {
      author: "Amir Dagan",
      role: "Verified Client",
      quote: "The freelancer was very professional, well prepared and had a lot of patience with us",
      project: "Web Development",
      color: "#EA580C",
      accent: "#ffedd5",
      lightText: "#9a3412",
      initials: "AD",
    },
  ];
  return (
    <section className="py-24 px-6"
      style={{ background: "linear-gradient(160deg, #f0fdf9 0%, #fdf4ff 60%, #eff6ff 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FF1F8E] uppercase mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF1F8E] shrink-0" />
            <span>CLIENT VOICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            What Our{" "}
            <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Clients Say
            </span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative p-6 rounded-2xl border border-slate-100 h-full flex flex-col bg-white
                shadow-[0_4px_24px_rgba(168,85,247,0.07)] hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)]
                hover:-translate-y-1 transition-all duration-400">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => <FaStar key={s} className="text-amber-400 text-[12px]" />)}
                </div>
                <FaQuoteLeft style={{ color: `${t.color}25` }} className="text-3xl mb-3" />
                <p className="text-slate-600 text-[14px] leading-relaxed flex-1 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-black text-white text-xs flex-shrink-0 shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${t.color || '#7C3AED'}, #a855f7)` }}>
                    {t.initials || t.author?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-[14px]">{t.author}</p>
                    <p className="text-slate-400 text-[11px]">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: t.accent, color: t.lightText }}>{t.project}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PROCESS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Process = () => (
  <section id="process" className="bg-white py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FF1F8E] uppercase mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-[#FF1F8E] shrink-0" />
          <span>HOW IT WORKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
          Our{" "}
          <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Process
          </span>
        </h2>
        <p className="text-slate-500 text-sm sm:text-lg mt-3 max-w-xl mx-auto leading-relaxed">
          Every engagement follows a battle-tested framework honed over 120+ projects and 12+ years.
        </p>
      </Reveal>
      <div className="relative">
        <div className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block"
          style={{ background: "linear-gradient(to bottom, #E879F9, #A855F7, #38BDF8)" }} />
        <div className="space-y-6">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1} direction="left">
              <div className="group flex flex-col sm:flex-row items-start gap-3 sm:gap-6 relative">
                <div className="relative z-10 flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                  font-extrabold text-xs sm:text-[13px] border-2 shadow-md transition-all duration-300 group-hover:scale-110"
                  style={{ background: step.accent, borderColor: `${step.color}40`, color: step.color }}>
                  {step.num}
                </div>
                <div className="flex-1 w-full p-5 sm:p-6 rounded-2xl border border-slate-100 bg-white
                  group-hover:border-purple-100 group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]
                  transition-all duration-400">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-slate-900 font-extrabold text-xl">{step.title}</h3>
                  </div>
                  <p className="text-slate-500 text-[15px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// INDUSTRIES
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Industries = () => (
  <section className="py-20 sm:py-24 px-4 sm:px-6 bg-slate-50/50">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-sm text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#FF1F8E] uppercase mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-[#FF1F8E] shrink-0" />
          <span>INDUSTRY EXPERTISE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
          Every Sector.{" "}
          <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Every Scale.
          </span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 0.07}>
            <div className="group p-6 sm:p-8 rounded-3xl border border-slate-100/80 text-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(168,85,247,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-default flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                {ind.icon}
              </span>
              <p className="text-slate-900 font-extrabold text-sm sm:text-base mb-1 tracking-tight">
                {ind.name}
              </p>
              <p className="text-purple-400 font-medium text-xs sm:text-sm">
                {ind.count}+ projects
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TRUST STRIP
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TrustStrip = () => {
  const logos = ["Dr. Treat", "Stillwell Hansen", "Retrievr", "Grace Mercy", "EduForge", "ShopVault", "FundPath", "LeafOS", "Clarix ERP", "NovaDash", "StudyCircle", "Pixel Academy"];
  return (
    <section className="bg-white py-14 border-y border-slate-100 overflow-hidden">
      <Reveal className="text-center mb-8">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-slate-600">Trusted by leading companies worldwide</p>
      </Reveal>
      <div className="flex gap-12 items-center" style={{ animation: "marquee 30s linear infinite", width: "max-content" }}>
        {[...logos, ...logos].map((name, i) => (
          <span key={i} className="text-slate-600 font-extrabold text-[15px] whitespace-nowrap tracking-wide">{name}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </section>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CTA BANNER
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CTABanner = () => (
  <section className="bg-white py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <Reveal>
        <div className="relative rounded-3xl p-6 sm:p-12 md:p-16 text-center overflow-hidden border border-purple-100
          shadow-[0_20px_80px_rgba(168,85,247,0.15)]"
          style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #eff6ff 50%, #f0fdf9 100%)" }}>
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,121,249,0.2) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl mb-6 border border-purple-200 shadow-sm"
              style={{ background: "white", color: "#A855F7" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#A855F7" }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#A855F7" }} />
              </span>
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase">Start Your Project</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Ready to build your<br />
              <span style={{ background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                success story?
              </span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
              Join 300+ companies who turned their biggest challenges into their biggest competitive advantages.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="/contactus"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-xs sm:text-[15px] transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)", boxShadow: "0 16px 48px rgba(168,85,247,0.3)" }}>
                <span>Book a Free Discovery Call</span> <HiOutlineArrowUpRight className="shrink-0" />
              </Link>
              <a href="#featured"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-slate-600 text-xs sm:text-[15px] border border-slate-200 hover:border-purple-300 hover:text-purple-600 bg-white transition-all duration-300 whitespace-nowrap">
                <span>See More Work</span>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {["No commitment required", "Response within 24hrs", "Free initial consultation"].map(s => (
                <span key={s} className="flex items-center gap-2 text-slate-400 text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// PAGE ASSEMBLY
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function CaseStudiesPage() {
  const [activeStudy, setActiveStudy] = useState(null);
  const [categories, setCategories] = useState(CATEGORIES);
  const [caseStudies, setCaseStudies] = useState(CASE_STUDIES);

  useEffect(() => {
    let mounted = true;

    fetchContent('case-studies', { categories: CATEGORIES, caseStudies: CASE_STUDIES }).then((data) => {
      if (!mounted) return;
      setCategories(data.categories?.length ? data.categories : CATEGORIES);
      setCaseStudies(data.caseStudies?.length ? data.caseStudies.map(normalizeCaseStudy) : CASE_STUDIES);
    });

    return () => { mounted = false; };
  }, []);

  const handleOpen = (cs) => setActiveStudy(cs);
  const handleClose = () => setActiveStudy(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        html, body { overflow-x: hidden; }
      `}</style>

      <main className="bg-white min-h-screen">
        <Hero />
        <StatsTicker />
        <FeaturedStudies caseStudies={caseStudies} onOpen={handleOpen} />
        <TrustStrip />
        <AllStudies caseStudies={caseStudies} categories={categories} onOpen={handleOpen} />
        <Testimonials caseStudies={caseStudies} />
        <Process />
        <Industries />
        <CTABanner />
      </main>

      {/* Inline Detail Panel */}
      <AnimatePresence>
        {activeStudy && (
          <CaseStudyDetail cs={activeStudy} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}