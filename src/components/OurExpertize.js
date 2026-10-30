"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple, FaAndroid } from "react-icons/fa";
import { FiMonitor, FiShoppingCart, FiCpu, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

const EXPERTISE = [
  {
    id: "01",
    title: "Custom Web Development",
    tagline: "Next-Gen Scalability",
    description:
      "Engineering lightning-fast, responsive, and secure web applications using React and Next.js. Tailored perfectly for disruptive startups and scaling enterprise infrastructures.",
    accent: "#22D3EE",
    accentRgb: "34,211,238",
    features: ["React & Next.js Ecosystem", "API-First Architecture", "Cloud Native (AWS/Vercel)"],
    icon: <FiMonitor size={20} />,
  },
  {
    id: "02",
    title: "iOS Engineering",
    tagline: "Premium Mobile Craft",
    description:
      "Crafting intuitive, high-performance native iOS applications built with Swift and SwiftUI to ensure seamless performance and elegant user journeys.",
    accent: "#34D399",
    accentRgb: "52,211,153",
    features: ["Swift & SwiftUI", "App Store Deployment", "Secure Apple Core Integrations"],
    icon: <FaApple size={20} />,
  },
  {
    id: "03",
    title: "Android Applications",
    tagline: "Robust Global Reach",
    description:
      "Building versatile, adaptive, and highly secure Android apps using Kotlin to capture and retain massive target audiences across millions of devices.",
    accent: "#60A5FA",
    accentRgb: "96,165,250",
    features: ["Kotlin & Jetpack Compose", "Material 3 Ecosystem", "Play Store Optimization"],
    icon: <FaAndroid size={20} />,
  },
  {
    id: "04",
    title: "E-Commerce Architectures",
    tagline: "High-Conversion Retail",
    description:
      "Designing custom e-commerce infrastructure with lightning-fast checkouts, flexible product models, and secure enterprise payment gateway synchronizations.",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
    features: ["Headless Commerce Layouts", "Optimized Checkout UX", "Advanced Sales Analytics"],
    icon: <FiShoppingCart size={20} />,
  },
  {
    id: "05",
    title: "Technical Consultancy",
    tagline: "Future-Proof Strategy",
    description:
      "Providing comprehensive system architecture reviews, code audits, and strategic digital roadmaps to safely guide businesses through modernization workflows.",
    accent: "#FB923C",
    accentRgb: "251,146,60",
    features: ["Infrastructure Auditing", "Database Optimization", "Scalability Roadmaps"],
    icon: <FiCpu size={20} />,
  },
  {
    id: "06",
    title: "Performance & SEO Growth",
    tagline: "Data-Driven Results",
    description:
      "Deploying precise Core Web Vitals optimization, advanced technical SEO tactics, and high-converting marketing strategies to put your digital assets on top.",
    accent: "#F472B6",
    accentRgb: "244,114,182",
    features: ["Core Web Vitals Tuning", "Technical SEO Audits", "Conversion Rate Optimization"],
    icon: <FiTrendingUp size={20} />,
  },
];

function ExpertiseRow({ service, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group h-full"
      style={{ cursor: "default" }}
    >
      {/* Left accent bar */}
      <motion.div
        animate={{ height: hovered ? "100%" : "40%", opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-0 top-0 w-[3px] rounded-full z-10"
        style={{
          background: `linear-gradient(180deg, ${service.accent}, transparent)`,
          transformOrigin: "top",
        }}
      />

      {/* Row */}
      <div
        className="relative flex flex-col justify-between h-full p-5 sm:p-7 sm:pl-8 rounded-2xl overflow-hidden transition-all duration-500 gap-4"
        style={{
          background: hovered
            ? `linear-gradient(120deg, rgba(${service.accentRgb},0.1) 0%, rgba(10,14,26,0.95) 100%)`
            : "rgba(255,255,255,0.025)",
          border: `1px solid rgba(${service.accentRgb}, ${hovered ? 0.3 : 0.08})`,
        }}
      >
        {/* Glow blob */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute -right-12 -top-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(${service.accentRgb},0.18) 0%, transparent 70%)`,
                filter: "blur(20px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Top Header Row (Icon + ID + Tagline) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <motion.div
              animate={{
                background: hovered
                  ? `linear-gradient(135deg, rgba(${service.accentRgb},0.25), rgba(${service.accentRgb},0.08))`
                  : `rgba(${service.accentRgb},0.08)`,
                boxShadow: hovered
                  ? `0 0 20px rgba(${service.accentRgb},0.3)`
                  : "none",
              }}
              transition={{ duration: 0.4 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ border: `1px solid rgba(${service.accentRgb},0.25)`, color: service.accent }}
            >
              {service.icon}
            </motion.div>

            <div className="flex items-center gap-2">
              <span
                className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ color: `rgba(${service.accentRgb},0.5)` }}
              >
                {service.id}
              </span>
              <span
                className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-md"
                style={{ color: service.accent, background: `rgba(${service.accentRgb},0.1)` }}
              >
                {service.tagline}
              </span>
            </div>
          </div>

          <h3
            className="text-lg sm:text-xl font-black tracking-tight mb-2 transition-colors duration-300"
            style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.88)" }}
          >
            {service.title}
          </h3>

          <p
            className="text-xs sm:text-sm leading-relaxed mb-4"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            {service.description}
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {service.features.map((f, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 + i * 0.05 + 0.2 }}
              className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `rgba(${service.accentRgb},0.1)`,
                border: `1px solid rgba(${service.accentRgb},0.2)`,
                color: service.accent,
              }}
            >
              {f}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const OurExpertize = () => {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{
        background:
          "linear-gradient(160deg, #020617 0%, #0a0f2c 30%, #0c1b3a 60%, #1e3a8a 100%)"
      }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-15%] right-[-8%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-8%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-10 mb-10 sm:mb-16 md:mb-20">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-10 shadow-sm">
              <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]"></span>
              </span>
              Our Capabilities
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.02] sm:leading-[0.9] tracking-[-0.03em]"
            >
              <span className="block" style={{ color: "rgba(255,255,255,0.9)" }}>
                Powering Your
              </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Digital Success
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:max-w-xs"
          >
            <p
              className="text-sm sm:text-base leading-relaxed mb-6"
              style={{ color: "rgba(255, 255, 255, 0.86)" }}
            >
              We design and deliver custom software frameworks configured specifically to grow your audience and protect core operations.
            </p>
            <div className="flex gap-4 sm:gap-8">
              {[["120+", "Solutions"], ["12Y+", "Combined"], ["98%", "Satisfaction"]].map(
                ([val, label]) => (
                  <div key={label}>
                    <div
                      className="text-xl sm:text-2xl font-black"
                      style={{ color: "#22D3EE" }}
                    >
                      {val}
                    </div>
                    <div
                      className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase"
                      style={{ color: "rgba(255, 255, 255, 0.86)" }}
                    >
                      {label}
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mb-8 sm:mb-12 origin-left"
          style={{
            background:
              "linear-gradient(90deg, #22D3EE, #60A5FA, transparent)",
          }}
        />

        {/* ── Sequential 2-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {EXPERTISE.map((s, i) => (
            <ExpertiseRow key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-12 sm:mt-16 md:mt-20 flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 sm:pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs sm:text-sm font-medium text-center lg:text-left max-w-lg"
            style={{ color: "rgba(255, 255, 255, 0.86)" }}
          >
            Ready to transform your digital blueprint into optimized deployment?
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/contactus"
              className="w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-3 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-white text-center whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #22D3EE, #60A5FA)",
                boxShadow:
                  "0 0 40px rgba(34,211,238,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <span className="tracking-wide">Get a Quote</span>
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </motion.svg>
            </Link>

            <Link
              href="/works"
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-colors duration-300 py-1 whitespace-nowrap shrink-0"
              style={{ color: "rgba(255, 255, 255, 0.86)" }}
            >
              View portfolio
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurExpertize;