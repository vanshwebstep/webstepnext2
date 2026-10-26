"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from 'next/link';

const SERVICES = [
  {
    id: "01",
    title: "React.js & Next.js",
    slug: "reactjs",
    subTitle: "Frontend Excellence",
    description:
      "Dynamic, blazing-fast web applications built with React.js and Next.js. We deliver server-side rendering, optimized performance, and pixel-perfect UIs that delight users across every device.",
    tags: ["SSR / SSG", "Component-Based", "SEO Ready"],
    accent: "#E879F9",
    accentLight: "#FAE8FF",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Vue.js Development",
    slug: "web-development",
    subTitle: "Progressive Frameworks",
    description:
      "Elegant, maintainable frontend applications with Vue.js. Perfect for interactive dashboards, SPAs, and feature-rich interfaces that need to scale with your business.",
    tags: ["Vue 3 / Nuxt", "Reactive UI", "Scalable"],
    accent: "#38BDF8",
    accentLight: "#E0F2FE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Node.js & PHP / Laravel",
    slug: "laravel",
    subTitle: "Robust Backend Systems",
    description:
      "Secure, high-performance backend solutions using Node.js, PHP, and Laravel. REST APIs, database architecture, authentication, and server logic built to handle real-world scale.",
    tags: ["REST APIs", "Laravel MVC", "Secure & Fast"],
    accent: "#34D399",
    accentLight: "#D1FAE5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "WordPress & WooCommerce",
    slug: "wordpress",
    subTitle: "CMS Powerhouse",
    description:
      "Custom WordPress websites, hand-crafted themes, and powerful plugins tailored to your brand. From simple blogs to full WooCommerce stores — we build WordPress right.",
    tags: ["Custom Themes", "Plugin Dev", "WooCommerce"],
    accent: "#F59E0B",
    accentLight: "#FEF3C7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    id: "05",
    title: "Shopify Themes & Apps",
    slug: "shopify",
    subTitle: "eCommerce Solutions",
    description:
      "Custom Shopify storefronts and private apps built to convert. We create high-performing themes and Shopify apps that give your online store a unique edge and seamless shopping experience.",
    tags: ["Custom Themes", "Shopify Apps", "High Conversion"],
    accent: "#A78BFA",
    accentLight: "#EDE9FE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    id: "06",
    title: "AI Chatbots & Integration",
    slug: "ai-chatbots",
    subTitle: "Intelligent Automation",
    description:
      "Custom AI chatbots and smart API integrations that automate support, qualify leads, and supercharge your workflows. We bring the power of AI into your product — practically and effectively.",
    tags: ["AI Chatbots", "API Integration", "Automation"],
    accent: "#F472B6",
    accentLight: "#FCE7F3",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

function ServiceRow({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative mb-4 sm:mb-6"
    >
      <div
        className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 lg:gap-12 py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 rounded-2xl border transition-all duration-500 backdrop-blur-sm"
        style={{
          borderColor: hovered ? service.accent + "40" : "#e5e7eb",
          background: hovered ? `linear-gradient(135deg, ${service.accent}08, transparent 60%)` : "#ffffff",
          boxShadow: hovered ? `0 10px 40px -10px ${service.accent}25` : "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <motion.div
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-full"
          style={{ background: `linear-gradient(180deg, ${service.accent}, transparent)` }}
        />

        {/* Number + Icon */}
        <div className="flex items-center gap-3 sm:gap-4 md:w-32 lg:w-40 shrink-0 justify-between w-full md:w-auto">
          <div className="flex items-center gap-3 sm:gap-5">
            <motion.div
              animate={{
                background: hovered ? `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)` : service.accentLight,
                color: hovered ? "#fff" : service.accent,
                scale: hovered ? 1.12 : 1,
                rotate: hovered ? 3 : 0,
              }}
              transition={{ duration: 0.35 }}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
            >
              {service.icon}
            </motion.div>
            <span
              className="font-black text-2xl sm:text-4xl tracking-tight leading-none select-none transition-all duration-300"
              style={{ color: hovered ? service.accent : "#cbd5e1", letterSpacing: "-0.03em" }}
            >
              {service.id}
            </span>
          </div>

          {/* Mobile CTA Arrow */}
          <div className="block md:hidden shrink-0">
            <Link href={`/services/${service.slug}`}>
              <motion.span
                animate={{ background: hovered ? service.accent : "#ffffff", color: hovered ? "#fff" : service.accent }}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: service.accent + "50",
                  boxShadow: hovered ? `0 10px 30px -5px ${service.accent}40` : "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 group transition-all duration-300">
          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
            <span
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full"
              style={{ color: service.accent, backgroundColor: `${service.accent}20` }}
            >
              {service.subTitle}
            </span>
            <div className="h-[1px] flex-1 opacity-30" style={{ backgroundColor: service.accent }} />
          </div>

          <h3
            className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-3 leading-tight tracking-tight transition-all duration-300 group-hover:translate-x-1"
            style={{
              background: hovered ? `linear-gradient(90deg, ${service.accent}, #0f172a)` : "none",
              WebkitBackgroundClip: hovered ? "text" : "initial",
              WebkitTextFillColor: hovered ? "transparent" : "#0f172a",
            }}
          >
            {service.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg transition-colors duration-300 group-hover:text-slate-800">
            {service.description}
          </p>

          <div className="mt-3 sm:mt-4 h-[2px] w-8 sm:w-10 transition-all duration-300 group-hover:w-20" style={{ backgroundColor: service.accent }} />
        </div>

        {/* Tags */}
        <div className="hidden md:flex flex-wrap lg:flex-col gap-1.5 sm:gap-2 shrink-0 md:w-32 lg:w-44">
          {service.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + i * 0.07 + 0.3 }}
              className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-center tracking-wide transition-all duration-300 backdrop-blur-sm whitespace-nowrap"
              style={{
                background: hovered ? service.accentLight : "#f8fafc",
                color: hovered ? service.accent : "#64748b",
                border: `1px solid ${hovered ? service.accent + "40" : "#e2e8f0"}`,
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Desktop / Tablet CTA Arrow */}
        <div className="hidden md:block shrink-0">
          <Link href={`/services/${service.slug}`}>
            <motion.span
              animate={{ background: hovered ? service.accent : "#ffffff", color: hovered ? "#fff" : service.accent }}
              whileHover={{ scale: 1.12, rotate: 6 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center border transition-all duration-300"
              style={{
                borderColor: service.accent + "50",
                boxShadow: hovered ? `0 10px 30px -5px ${service.accent}40` : "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

const Services = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section className="relative bg-white overflow-hidden py-16 sm:py-24 md:py-36">
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(5,5,8,0.04) 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-[-5%] right-[-8%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #E879F9 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[-5%] left-[-8%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">

        {/* Header */}
        <div ref={headingRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-10 sm:mb-16 md:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E879F9]" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-slate-400">Our Services</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] sm:leading-[0.95] tracking-[-0.03em] text-slate-900"
            >
              What We
              <br />
              <span style={{
                background: "linear-gradient(135deg, #E879F9 0%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Deliver
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:max-w-xs"
          >
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              From frontend interfaces to backend APIs and AI-powered features — Webstep Solutions covers every layer of modern web development.
            </p>
            <div className="flex gap-4 sm:gap-8">
              {[["120+", "Projects"], ["98%", "Satisfaction"], ["12+", "Technologies"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">{num}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-1 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-full mb-0 origin-left"
          style={{ background: "linear-gradient(90deg, #E879F9, #38BDF8, #34D399, #F59E0B, transparent)" }}
        />

        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 sm:pt-10 border-t border-slate-100"
        >
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed">
            Every project is built from scratch by dedicated developers — no templates, no shortcuts, no compromises.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/customize-package"
              className="flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all duration-300 text-center"
              style={{ background: "linear-gradient(135deg, #E879F9, #A855F7)", boxShadow: "0 4px 20px rgba(232,121,249,0.2)" }}
            >
              Start a Project
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/services" className="text-xs sm:text-sm text-slate-400 hover:text-slate-700 flex items-center justify-center gap-2 transition-colors duration-300 font-medium py-1">
              View All Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;