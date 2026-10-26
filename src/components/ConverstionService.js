"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    id: "01",
    title: "React & Next.js",
    slug: "reactjs",          // ← slug for dynamic route
    tagline: "Modern Web Applications",
    description:
      "Blazing-fast, SEO-friendly web apps built with React and Next.js. Server-side rendering, dynamic routing, and scalable architecture — tailored for startups to enterprises.",
    accent: "#E879F9",
    accentRgb: "232,121,249",
    gradientFrom: "#E879F9",
    gradientTo: "#A855F7",
    features: ["Server-Side Rendering", "SEO Optimized", "High Performance"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "WordPress Solutions",
    slug: "wordpress",         // ← slug for dynamic route
    tagline: "CMS & Custom Development",
    description:
      "Custom WordPress websites, themes, and plugins built to your exact needs. Whether it's a business site, blog, or complex CMS — we make WordPress work for you.",
    accent: "#38BDF8",
    accentRgb: "56,189,248",
    gradientFrom: "#38BDF8",
    gradientTo: "#818CF8",
    features: ["Custom Themes", "Plugin Development", "WooCommerce Ready"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "AI Chatbots & Integration",
    slug: "ai-chatbots",    // ← slug for dynamic route
    tagline: "Intelligent Automation",
    description:
      "Smart AI chatbots and seamless API integrations that automate workflows, enhance user experiences, and give your business a competitive edge in the AI era.",
    accent: "#34D399",
    accentRgb: "52,211,153",
    gradientFrom: "#34D399",
    gradientTo: "#06B6D4",
    features: ["Custom AI Chatbots", "API Integration", "Workflow Automation"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" /><path d="M12 12L2.1 9.5" />
      </svg>
    ),
  },
];

function TiltCard({ service, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
      className="relative group cursor-default"
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-px rounded-3xl sm:rounded-[2.5rem] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${service.accentRgb},0.35) 0%, transparent 70%)`,
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute inset-0 rounded-3xl sm:rounded-[2.5rem] pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, rgba(${service.accentRgb},0.4), transparent 50%, rgba(${service.accentRgb},0.15))`,
          opacity: hovered ? 1 : 0.2,
          padding: "1px",
        }}
      />
      <div
        className="relative z-10 rounded-3xl sm:rounded-[2.5rem] overflow-hidden h-full"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: `1px solid rgba(${service.accentRgb}, ${hovered ? 0.4 : 0.12})`,
          backdropFilter: "blur(20px)",
          transition: "border-color 0.4s ease",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(${service.accentRgb},0.9) 50%, transparent 100%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.4s ease",
          }}
        />
        <div className="relative p-6 sm:p-8 md:p-9 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between mb-6 sm:mb-8">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `linear-gradient(135deg, rgba(${service.accentRgb}, 0.2), rgba(${service.accentRgb}, 0.05))`,
                border: `1px solid rgba(${service.accentRgb}, 0.3)`,
                color: service.accent,
              }}
            >
              {service.icon}
            </motion.div>
            <span className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: `rgba(${service.accentRgb}, 0.5)` }}>
              {service.id}
            </span>
          </div>

          <p className="text-[10.5px] sm:text-[12px] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3" style={{ color: service.accent }}>
            {service.tagline}
          </p>

          <h3
            className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 leading-tight tracking-tight"
            style={{
              background: `linear-gradient(135deg, #ffffff 30%, ${service.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6 sm:mb-8 flex-1">
            {service.description}
          </p>

          <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
            {service.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.18 + i * 0.06 + 0.3 }}
                className="flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `rgba(${service.accentRgb}, 0.15)` }}>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4.2 7.5L8.5 2.5" stroke={service.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[12px] text-white tracking-wide font-medium">{feat}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-px mb-5 sm:mb-7" style={{ background: `linear-gradient(90deg, transparent, rgba(${service.accentRgb}, 0.3), transparent)` }} />

          {/* ✅ Dynamic slug link — opens the correct service detail page */}
          <Link
            href={`/services/${service.slug}`}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] w-fit transition-opacity duration-200 hover:opacity-100"
            style={{ color: `rgba(${service.accentRgb}, 0.7)` }}
          >
            Explore Service
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

const ConversionService = () => {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{ background: "linear-gradient(160deg, #020617 0%, #0a0f2c 30%, #0c1b3a 60%, #1e3a8a 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white backdrop-blur-md border border-white/60 tracking-[0.18em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-10 shadow-sm">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]"></span>
            </span>
            <p className="text-[#FF1F8E] font-bold text-[9px] sm:text-[10px]">What We Build</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-8 mb-4 sm:mb-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.02] sm:leading-[0.95] tracking-[-0.03em]">
              <span className="block text-white/90">Full-Stack</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Digital Services
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed px-2"
          >
            From sleek frontends to powerful backends and AI-driven features — we cover every layer of your digital product.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-10 h-px w-28 sm:w-40 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #E879F9, #38BDF8, transparent)" }}
          />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 sm:gap-6">
          {SERVICES.map((service, i) => (
            <TiltCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 sm:mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <p className="text-white/80 text-xs sm:text-sm tracking-wide text-center">
            Ready to build something great?
          </p>
          <Link
            href="/customize-package"
            className="w-full sm:w-auto text-center relative group flex items-center justify-center gap-3 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #E879F9, #A855F7)",
              boxShadow: "0 0 40px rgba(232,121,249,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <span className="relative z-10 tracking-wide">Get a Free Quote</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="relative z-10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.span>
          </Link>
          <Link href="/services" className="flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors duration-300 tracking-wide">
            All Services
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionService;