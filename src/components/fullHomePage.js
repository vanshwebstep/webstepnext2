"use client";

/*
  ══════════════════════════════════════════════════════════════
  UNIFIED HOMEPAGE — WebStep Solutions
  Design System:
    
    Pink   : #FF1F8E  (brand primary, logo color)
    Accents: violet #7C3AED | cyan #22D3EE | emerald #10B981 |
             amber #F59E0B | rose #F43F5E — per section
    Dark bg sections: #050810
    Light bg sections: #F8FAFC / #FFFFFF / #f0fdf9
  ══════════════════════════════════════════════════════════════
*/

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { FaStar, FaQuoteRight, FaApple, FaAndroid, FaSearch, FaPenNib, FaCode, FaRocket, FaCog, FaChartLine, FaLaravel, FaNodeJs, FaPhp, FaWordpress, FaMapMarkerAlt, FaEnvelope, FaClock, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiMonitor, FiShoppingCart, FiCpu, FiTrendingUp, FiSmartphone, FiLayout, FiServer, FiCheckCircle, FiArrowRight, FiBriefcase, FiStar, FiGlobe, FiArrowLeft, FiTarget, FiUsers, FiCode, FiShield, FiArrowUpRight } from "react-icons/fi";
import { Code, Terminal, Cpu, Cloud, Smartphone, Layers, Rocket, Zap } from "lucide-react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES + FONT IMPORT
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
    
  
    
    
    /* Ticker */
    @keyframes ws-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    .ws-ticker-track { animation: ws-ticker 45s linear infinite; }
    .ws-ticker-track:hover { animation-play-state: paused; }
    
    /* Gradient heading */
    @keyframes ws-grad { 0%{background-position:0%} 100%{background-position:200%} }
    .ws-grad-text {
      background: linear-gradient(135deg, #FF1F8E 0%, #FF6EC4 50%, #FF1F8E 100%);
      background-size: 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ws-grad 6s linear infinite;
    }
    .ws-violet-text {
      background: linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Stat card hover */
    .ws-stat-card:hover { transform: translateY(-4px) scale(1.03); }
    
    /* Fade-in on scroll */
    .ws-fade { opacity:0; transform:translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .ws-fade.ws-vis { opacity:1; transform:translateY(0); }
    
    /* Button hover */
    .ws-btn-primary:hover { background: linear-gradient(135deg,#D4006A,#FF1F8E) !important; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,31,142,0.35) !important; }
    .ws-btn-dark:hover { background: #FF1F8E !important; }
    
    /* Review dot */
    .ws-dot { transition: all 0.25s; }
    .ws-navbtn:hover { background: #FF1F8E !important; color: #fff !important; border-color: #FF1F8E !important; }
    
    /* Tilt card preserve-3d */
    .ws-tilt { transform-style: preserve-3d; }
    
    /* Service row */
    .ws-srow:hover .ws-srow-title { letter-spacing: -0.01em; }
    
    /* Expertise left bar */
    .ws-exp-bar { transition: height 0.4s ease; }
    
    /* Stat card anim */
    .ws-stat2:hover .ws-stat2-bar { transform: scaleX(1); }
    .ws-stat2-bar { transition: transform 0.35s ease; }
    .ws-stat2:hover .ws-stat2-num { color: var(--ws-num-color, #7C3AED); }
    
    /* Info icon hover */
    .ws-info-item:hover .ws-info-icon { transform: scale(1.1) rotate(-3deg); }
  `}</style>
);

/* ─────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────── */
const PingDot = ({ color = "#FF1F8E" }) => (
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color }} />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: color }} />
  </span>
);

const SectionBadge = ({ text, color = "#FF1F8E", colorRgb = "255,31,142", dark = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
    style={{
      border: `1px solid rgba(${colorRgb},${dark ? 0.3 : 0.25})`,
      background: `rgba(${colorRgb},${dark ? 0.08 : 0.07})`,
    }}
  >
    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
    <span className="text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color }}>
      {text}
    </span>
  </motion.div>
);

const GradHeading = ({ children, className = "" }) => (
  <span
    className={`ws-violet-text ${className}`}
    style={{
      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </span>
);

/* ══════════════════════════════════════════════
   1. BANNER
══════════════════════════════════════════════ */
const ticker = ["Enterprise Software", "Full Stack Development", "UI/UX Excellence", "Mobile Innovations", "Cloud Solutions", "Digital Transformation"];
const floatingIcons = [
  { Icon: Code, top: "15%", left: "8%", color: "#FF1F8E", size: 32 },
  { Icon: Terminal, top: "45%", left: "12%", color: "#7C3AED", size: 24 },
  { Icon: Cpu, top: "70%", left: "10%", color: "#FF1F8E", size: 28 },
  { Icon: Zap, top: "25%", left: "20%", color: "#22D3EE", size: 20 },
  { Icon: Cloud, top: "20%", right: "10%", color: "#7C3AED", size: 36 },
  { Icon: Smartphone, top: "50%", right: "14%", color: "#FF1F8E", size: 30 },
  { Icon: Layers, top: "75%", right: "12%", color: "#22D3EE", size: 34 },
  { Icon: Rocket, top: "35%", right: "22%", color: "#10B981", size: 22 },
];
const bannerStats = [
  { num: "120", suffix: "+", label: "Projects Delivered" },
  { num: "99", suffix: "%", label: "Client Satisfaction" },
  { num: "12", suffix: "+", label: "Years Experience" },
  { num: "150", suffix: "+", label: "Team Experts" },
];

const Banner = () => {
  const doubled = [...ticker, ...ticker];
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-20" style={{ background: "#F8FAFC" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, rgba(255,31,142,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Floating icons */}
      <div className="hidden lg:block">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22, y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: idx * 0.3 }}
            className="absolute"
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <item.Icon size={item.size} color={item.color} strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl mb-10" style={{ background: "rgba(255,31,142,0.07)", border: "1px solid rgba(255,31,142,0.25)", backdropFilter: "blur(10px)" }}>
          <PingDot />
          <span className="font-bold text-[10px] tracking-[0.3em] uppercase" style={{ color: "#FF1F8E" }}>Engineering the Future</span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-slate-900"
        >
          Crafting <br />
          <span className="ws-grad-text">Digital Legacy</span>
        </motion.h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
          A high-performance technology partner for industry leaders. We build scalable software architectures that redefine user experience and drive growth.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-20">
          <button
            className="ws-btn-primary px-10 py-4 rounded-2xl font-bold text-[11px] tracking-[0.2em] uppercase text-white transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#FF1F8E,#D4006A)", boxShadow: "0 8px 24px rgba(255,31,142,0.3)", }}
          >
            Start Your Project
          </button>
          <button
            className="px-10 py-4 rounded-2xl font-bold text-[11px] tracking-[0.2em] uppercase text-slate-700 transition-all duration-300 hover:text-[#FF1F8E]"
            style={{ background: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,31,142,0.25)" }}
          >
            View Case Studies
          </button>
        </div>

        {/* Stats */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-5">
          {bannerStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="ws-stat-card relative rounded-[28px] p-8 transition-all duration-400 cursor-default overflow-hidden"
              style={{ background: "rgba(255,255,255,0.55)", border: "1.5px solid rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
            >
              <span className="text-4xl md:text-5xl font-black text-slate-900 block mb-1" >
                {s.num}<span style={{ color: "#FF1F8E" }}>{s.suffix}</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #F8FAFC, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #F8FAFC, transparent)" }} />
        <div className="relative py-6" style={{ background: "rgba(255,255,255,0.75)", borderTop: "1px solid rgba(255,31,142,0.1)", backdropFilter: "blur(20px)" }}>
          <div className="flex w-max ws-ticker-track items-center">
            {[...doubled, ...doubled].map((item, i) => (
              <div key={i} className="flex items-center group">
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-slate-600 whitespace-nowrap px-10 group-hover:text-[#FF1F8E] transition-colors" >{item}</span>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,31,142,0.4)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   2. CONVERSION SERVICES (dark bg, tilt cards)
══════════════════════════════════════════════ */
const CONV_SERVICES = [
  {
    id: "01", title: "PSD to HTML", tagline: "Pixel-perfect conversion",
    description: "W3C validated, semantic HTML from layered PSD files. Structured for performance, built for longevity.",
    accent: "#E879F9", accentRgb: "232,121,249",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
  },
  {
    id: "02", title: "Sketch to HTML", tagline: "Prototype to production",
    description: "Clean, commented code that brings Sketch prototypes to life with cross-browser precision and modern CSS.",
    accent: "#38BDF8", accentRgb: "56,189,248",
    features: ["Cross-browser", "Modern CSS", "Interactive UI"],
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>),
  },
  {
    id: "03", title: "Email Templates", tagline: "Inbox-first engineering",
    description: "High-conversion templates rendering flawlessly across Gmail, Outlook, Apple Mail — on every device.",
    accent: "#34D399", accentRgb: "52,211,153",
    features: ["Mobile-First", "Dark Mode", "Clean Code"],
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
  },
];

function TiltCard({ service, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-12deg", "12deg"]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
      className="ws-tilt relative group cursor-default"
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute -inset-px rounded-[2.5rem] pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${service.accentRgb},0.35), transparent 70%)`, filter: "blur(1px)" }}
      />
      <div
        className="relative z-10 rounded-[2.5rem] overflow-hidden h-full"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: `1px solid rgba(${service.accentRgb}, ${hovered ? 0.4 : 0.12})`,
          backdropFilter: "blur(20px)",
          transition: "border-color 0.4s",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${service.accentRgb},0.9), transparent)`, opacity: hovered ? 1 : 0.35, transition: "opacity 0.4s" }} />
        <div className="relative p-9 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-start justify-between mb-8">
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, rgba(${service.accentRgb},0.2), rgba(${service.accentRgb},0.05))`, border: `1px solid rgba(${service.accentRgb},0.3)`, color: service.accent }}
            >
              {service.icon}
            </motion.div>
            <span className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: `rgba(${service.accentRgb},0.5)` }}>{service.id}</span>
          </div>
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3" style={{ color: service.accent }}>{service.tagline}</p>
          <h3 className="text-3xl font-black mb-4 leading-tight" style={{  background: `linear-gradient(135deg, #fff 30%, ${service.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{service.title}</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-8 flex-1">{service.description}</p>
          <div className="space-y-3 mb-8">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `rgba(${service.accentRgb},0.15)` }}>
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.2 7.5L8.5 2.5" stroke={service.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[12px] text-white/80 tracking-wide font-medium">{f}</span>
              </div>
            ))}
          </div>
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, rgba(${service.accentRgb},0.3), transparent)` }} />
          <motion.button whileHover={{ x: 4 }} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: service.accent }}>
            Explore Service
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

const ConversionService = () => (
  <section className="relative overflow-hidden py-32" style={{ background: "linear-gradient(135deg, #050810 0%, #0a0a18 40%, #080d18 100%)" }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(232,121,249,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
    </div>
    <div className="container mx-auto px-6 relative z-10 max-w-7xl">
      <div className="flex flex-col items-center text-center mb-24">
        <SectionBadge text="Conversion Experts" color="#E879F9" colorRgb="232,121,249" dark />
        <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-6xl md:text-[5rem] font-black leading-[0.95] tracking-tight mt-2 mb-6" >
          <span className="block text-white/90">Premium</span>
          <GradHeading>Markup Services</GradHeading>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
          We transform your designs into high-performance, pixel-perfect code that scales across the digital landscape.
        </motion.p>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-10 h-px w-40 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #E879F9, #38BDF8, transparent)" }} />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {CONV_SERVICES.map((s, i) => <TiltCard key={s.id} service={s} index={i} />)}
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-5">
        <p className="text-white/60 text-sm">Ready to bring your design to life?</p>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,#FF1F8E,#D4006A)", boxShadow: "0 0 40px rgba(255,31,142,0.3)" }}
        >
          Get a Quote
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </motion.button>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   3. SMART SERVICES (white bg, row cards)
══════════════════════════════════════════════ */
const SMART_SERVICES = [
  { id: "01", title: "PSD to HTML", subTitle: "Premium Conversion", description: "High-performance, SEO-friendly HTML markups from your layered PSD files with pixel-perfect precision.", tags: ["Semantic HTML", "W3C Validated", "SEO Ready"], accent: "#E879F9", accentRgb: "232,121,249", accentLight: "#FAE8FF", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>) },
  { id: "02", title: "Sketch to HTML", subTitle: "Modern Workflow", description: "W3C validated fast-loading HTML markups crafted from your Sketch designs with cross-browser precision.", tags: ["Cross-browser", "Modern CSS", "Responsive"], accent: "#38BDF8", accentRgb: "56,189,248", accentLight: "#E0F2FE", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>) },
  { id: "03", title: "Email Templates", subTitle: "Responsive Campaigns", description: "Responsive email conversions ensuring great readability across Gmail, Outlook, and Apple Mail.", tags: ["Mobile-First", "Dark Mode", "Multi-client"], accent: "#10B981", accentRgb: "16,185,129", accentLight: "#D1FAE5", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>) },
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
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="ws-srow group relative mb-5"
    >
      <div
        className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 py-10 px-6 rounded-2xl border transition-all duration-500"
        style={{
          borderColor: hovered ? `rgba(${service.accentRgb},0.4)` : "#e5e7eb",
          background: hovered ? `linear-gradient(135deg, rgba(${service.accentRgb},0.06), transparent 60%)` : "#fff",
          boxShadow: hovered ? `0 10px 40px -10px rgba(${service.accentRgb},0.2)` : "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <motion.div animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.35 }} className="absolute left-0 top-0 bottom-0 w-0.5 origin-top rounded-full" style={{ background: `linear-gradient(180deg, ${service.accent}, transparent)` }} />
        <div className="flex items-center gap-5 lg:w-40 shrink-0 pl-4">
          <motion.div animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.3 }} className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: hovered ? service.accent : service.accentLight, color: hovered ? "#fff" : service.accent, transition: "background 0.35s, color 0.35s" }}>
            {service.icon}
          </motion.div>
          <span className="font-black text-4xl tracking-tight select-none" style={{ color: hovered ? service.accent : "#d1d5db", transition: "color 0.3s" }}>{service.id}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] px-3 py-1 rounded-full" style={{ color: service.accent, background: `rgba(${service.accentRgb},0.12)` }}>{service.subTitle}</span>
            <div className="h-px flex-1 opacity-30" style={{ background: service.accent }} />
          </div>
          <h3 className="ws-srow-title text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight transition-all duration-300" style={{  color: "#0f172a" }}>{service.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed max-w-lg">{service.description}</p>
          <div className="mt-4 h-[2px] w-10 group-hover:w-20 transition-all duration-300" style={{ background: service.accent }} />
        </div>
        <div className="hidden lg:flex flex-col gap-2 shrink-0 w-44">
          {service.tags.map((t, i) => (
            <span key={t} className="text-[11px] font-semibold px-3 py-1.5 rounded-full text-center tracking-wide transition-all duration-300" style={{ background: hovered ? service.accentLight : "#f8fafc", color: hovered ? service.accent : "#64748b", border: `1px solid ${hovered ? `rgba(${service.accentRgb},0.4)` : "#e2e8f0"}`, transform: hovered ? "translateY(-2px)" : "translateY(0)" }}>{t}</span>
          ))}
        </div>
        <div className="pl-4 lg:pl-0 shrink-0">
          <motion.button animate={{ background: hovered ? service.accent : "#fff", color: hovered ? "#fff" : service.accent }} whileHover={{ scale: 1.12, rotate: 6 }} className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300" style={{ borderColor: `rgba(${service.accentRgb},0.5)`, boxShadow: hovered ? `0 10px 30px -5px rgba(${service.accentRgb},0.4)` : "0 2px 6px rgba(0,0,0,0.05)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

const SmartServices = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  return (
    <section className="relative bg-white overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-[-5%] right-[-8%] w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none" style={{ background: "radial-gradient(circle, #FF1F8E 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div ref={headingRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
              <SectionBadge text="Core Capabilities" color="#FF1F8E" colorRgb="255,31,142" />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900" >
              Smart<br /><GradHeading>Services</GradHeading>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={headingInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }} className="lg:max-w-xs">
            <p className="text-slate-500 text-base leading-relaxed mb-8">A high-performance workflow engineered to transform ambitious concepts into digital leaders.</p>
            <div className="flex gap-8">
              {[["500+", "Projects"], ["98%", "Accuracy"], ["5★", "Rated"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black text-slate-900 leading-none" >{num}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ scaleX: 0 }} animate={headingInView ? { scaleX: 1 } : {}} transition={{ duration: 0.9, delay: 0.35 }} className="h-px w-full mb-8 origin-left" style={{ background: "linear-gradient(90deg, #FF1F8E, #7C3AED, #38BDF8, transparent)" }} />
        <div>{SMART_SERVICES.map((s, i) => <ServiceRow key={s.id} service={s} index={i} />)}</div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-slate-100">
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">Every project is handled with dedicated engineers — no templates, no shortcuts.</p>
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.04 }} className="flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#FF1F8E,#D4006A)", boxShadow: "0 4px 20px rgba(255,31,142,0.25)" }}>
              Order Now <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </motion.button>
            <motion.button whileHover={{ x: 3 }} className="text-sm text-slate-400 hover:text-[#FF1F8E] flex items-center gap-2 transition-colors font-medium">
              See all services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════
   4. EXPERTISE (dark bg, 2-col list)
══════════════════════════════════════════════ */
const EXPERTISE = [
  { id:"01", title:"Web App Development", tagline:"Full-stack excellence", description:"High-performance scalable web ecosystems using cutting-edge stacks.", accent:"#22D3EE", accentRgb:"34,211,238", features:["React & Next.js","API-first Architecture","Cloud Native"], icon:<FiMonitor size={20}/> },
  { id:"02", title:"iOS Solutions", tagline:"Native Apple craft", description:"Native Apple experiences crafted for performance and user delight.", accent:"#10B981", accentRgb:"16,185,129", features:["Swift & SwiftUI","App Store Ready","Offline First"], icon:<FaApple size={20}/> },
  { id:"03", title:"Android Apps", tagline:"Global mobile reach", description:"Dynamic Android development with pixel-perfect fluid interfaces.", accent:"#60A5FA", accentRgb:"96,165,250", features:["Kotlin Compose","Material You","Play Store"], icon:<FaAndroid size={20}/> },
  { id:"04", title:"E-Commerce", tagline:"Revenue-first design", description:"High-conversion retail platforms for seamless growth and journeys.", accent:"#A78BFA", accentRgb:"167,139,250", features:["Headless Commerce","Checkout UX","Growth Analytics"], icon:<FiShoppingCart size={20}/> },
  { id:"05", title:"Tech Consultancy", tagline:"Future-proof strategy", description:"Strategic technology roadmaps to future-proof your digital presence.", accent:"#FB923C", accentRgb:"251,146,60", features:["Architecture Review","Tech Audit","Scaling Plans"], icon:<FiCpu size={20}/> },
  { id:"06", title:"Digital Marketing", tagline:"Data-driven growth", description:"Data-driven strategies that convert audiences into loyal clients.", accent:"#F472B6", accentRgb:"244,114,182", features:["SEO & SEM","Content Strategy","CRO"], icon:<FiTrendingUp size={20}/> },
];

function ExpertiseRow({ service, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default mb-3"
    >
      <motion.div animate={{ height: hovered ? "100%" : "40%", opacity: hovered ? 1 : 0.4 }} transition={{ duration: 0.4 }} className="absolute left-0 top-0 w-[3px] rounded-full" style={{ background: `linear-gradient(180deg, ${service.accent}, transparent)`, transformOrigin: "top" }} />
      <div className="relative flex items-start gap-5 pl-7 pr-5 py-7 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: hovered ? `linear-gradient(120deg, rgba(${service.accentRgb},0.1), rgba(10,14,26,0.95))` : "rgba(255,255,255,0.025)", border: `1px solid rgba(${service.accentRgb},${hovered ? 0.3 : 0.08})` }}>
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -right-12 -top-12 w-48 h-48 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(${service.accentRgb},0.18), transparent 70%)`, filter: "blur(20px)" }} />
          )}
        </AnimatePresence>
        <div className="shrink-0 mt-1">
          <motion.div animate={{ background: hovered ? `linear-gradient(135deg, rgba(${service.accentRgb},0.25), rgba(${service.accentRgb},0.08))` : `rgba(${service.accentRgb},0.08)`, boxShadow: hovered ? `0 0 20px rgba(${service.accentRgb},0.3)` : "none" }} className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ border: `1px solid rgba(${service.accentRgb},0.25)`, color: service.accent }}>{service.icon}</motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: `rgba(${service.accentRgb},0.5)` }}>{service.id}</span>
            <div className="h-px max-w-[36px] flex-1" style={{ background: `rgba(${service.accentRgb},0.2)` }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: service.accent }}>{service.tagline}</span>
          </div>
          <h3 className="text-xl font-black tracking-tight mb-2" style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.85)" }}>{service.title}</h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>{service.description}</p>
          <div className="flex flex-wrap gap-2">
            {service.features.map((f, i) => (
              <span key={i} className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: `rgba(${service.accentRgb},0.1)`, border: `1px solid rgba(${service.accentRgb},0.2)`, color: service.accent }}>{f}</span>
            ))}
          </div>
        </div>
        <motion.div animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }} className="shrink-0 self-center" style={{ color: service.accent }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

const OurExpertise = () => (
  <section className="relative overflow-hidden py-32" style={{ background: "linear-gradient(135deg, #05080f 0%, #080c18 40%, #060b14 100%)" }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-15%] right-[-8%] w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,31,142,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-[-10%] left-[-8%] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,31,142,0.04) 1px,transparent 1px),linear-gradient(90deg, rgba(255,31,142,0.04) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
    </div>
    <div className="container mx-auto px-6 relative z-10 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
        <div>
          <SectionBadge text="Our Expertise" color="#FF1F8E" colorRgb="255,31,142" dark />
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-6xl md:text-[5rem] font-black leading-[0.9] tracking-tight" >
            <span className="block text-white/90">Powering Your</span>
            <GradHeading>Digital Success</GradHeading>
          </motion.h2>
        </div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="lg:max-w-xs">
          <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Elite technical stacks to build products that redefine market standards and outlast competition.</p>
          <div className="flex gap-8">
            {[["120+","Projects"],["12+","Years"],["98%","Satisfaction"]].map(([v,l]) => (
              <div key={l}><div className="text-2xl font-black" style={{ color:"#FF1F8E" }}>{v}</div><div className="text-[11px] font-semibold tracking-widest uppercase" style={{ color:"rgba(255,255,255,0.35)" }}>{l}</div></div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-px mb-12 origin-left" style={{ background: "linear-gradient(90deg, #FF1F8E, #7C3AED, #38BDF8, transparent)" }} />
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-0">
        <div>{EXPERTISE.slice(0,3).map((s,i) => <ExpertiseRow key={s.id} service={s} index={i}/>)}</div>
        <div>{EXPERTISE.slice(3,6).map((s,i) => <ExpertiseRow key={s.id} service={s} index={i+3}/>)}</div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm font-medium" style={{ color:"rgba(255,255,255,0.4)" }}>Ready to transform your digital vision into reality?</p>
        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale:1.04 }} className="flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold text-white" style={{ background:"linear-gradient(135deg,#FF1F8E,#D4006A)", boxShadow:"0 0 40px rgba(255,31,142,0.25)" }}>
            Get a Quote <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.button>
          <motion.button whileHover={{ x:3 }} className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color:"rgba(255,255,255,0.5)" }}>View portfolio <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></motion.button>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   5. PROCESS (light green bg, 6 cards)
══════════════════════════════════════════════ */
const STEPS = [
  { id:"01", title:"Discovery", subtitle:"Insight & Strategy", description:"Understanding the underlying concept and target audience to build a solid foundation.", icon:<FaSearch/>, accent:"#059669", accentRgb:"5,150,105", light:"#D1FAE5" },
  { id:"02", title:"Design", subtitle:"UI/UX Architecture", description:"Creating wireframes and refining them based on feedback for an intuitive experience.", icon:<FaPenNib/>, accent:"#0891B2", accentRgb:"8,145,178", light:"#CFFAFE" },
  { id:"03", title:"Build", subtitle:"Development Phase", description:"Developing robust functionality using cutting-edge technologies and best practices.", icon:<FaCode/>, accent:"#7C3AED", accentRgb:"124,58,237", light:"#EDE9FE" },
  { id:"04", title:"Launch", subtitle:"Quality Assurance", description:"Rigorously testing every layer for a bulletproof and confident launch.", icon:<FaRocket/>, accent:"#FF1F8E", accentRgb:"255,31,142", light:"#FCE7F3" },
  { id:"05", title:"Maintain", subtitle:"Ongoing Support", description:"Adding new functionalities and providing proactive support for end-users.", icon:<FaCog/>, accent:"#D97706", accentRgb:"217,119,6", light:"#FEF3C7" },
  { id:"06", title:"Optimize", subtitle:"Growth & Scaling", description:"Analyzing performance metrics and optimizing every layer for continuous growth.", icon:<FaChartLine/>, accent:"#0F766E", accentRgb:"15,118,110", light:"#CCFBF1" },
];

function StepCard({ step, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:44 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ delay:index*0.09, duration:0.65 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative group cursor-default"
    >
      <div className="relative overflow-hidden rounded-[2rem] h-full flex flex-col transition-all duration-500" style={{ background:hovered?"#fff":"rgba(255,255,255,0.72)", border:`1.5px solid rgba(${step.accentRgb},${hovered?0.35:0.12})`, boxShadow:hovered?`0 20px 60px rgba(${step.accentRgb},0.14),0 4px 20px rgba(0,0,0,0.06)`:"0 2px 16px rgba(0,0,0,0.04)", backdropFilter:"blur(16px)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500" style={{ background:`linear-gradient(90deg,transparent,rgba(${step.accentRgb},0.9),transparent)`, opacity:hovered?1:0.2 }} />
        <span className="absolute bottom-4 right-6 text-[6.5rem] font-black leading-none select-none pointer-events-none" style={{ color:`rgba(${step.accentRgb},${hovered?0.07:0.04})` }}>{step.id}</span>
        <AnimatePresence>
          {hovered && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none" style={{ background:`radial-gradient(circle,rgba(${step.accentRgb},0.1),transparent 70%)`, filter:"blur(16px)" }}/>}
        </AnimatePresence>
        <div className="relative z-10 p-8 flex flex-col h-full">
          <div className="flex items-start justify-between mb-7">
            <motion.div animate={{ scale:hovered?1.08:1 }} className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl" style={{ background:hovered?`linear-gradient(135deg,${step.light},rgba(${step.accentRgb},0.15))`:step.light, color:step.accent, border:`1.5px solid rgba(${step.accentRgb},0.2)`, boxShadow:hovered?`0 4px 20px rgba(${step.accentRgb},0.25)`:"none", transition:"all 0.4s" }}>{step.icon}</motion.div>
            <span className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color:`rgba(${step.accentRgb},${hovered?0.7:0.35})` }}>{step.id}</span>
          </div>
          <p className="text-[11px] font-black tracking-[0.25em] uppercase mb-2" style={{ color:step.accent }}>{step.subtitle}</p>
          <h3 className="text-[1.6rem] font-black tracking-tight mb-3" style={{  color:"#0f172a" }}>{step.title}</h3>
          <p className="text-sm leading-relaxed flex-1 mb-7" style={{ color:"#64748b" }}>{step.description}</p>
          <div className="h-px mb-5 transition-opacity duration-300" style={{ background:`linear-gradient(90deg,transparent,rgba(${step.accentRgb},0.3),transparent)`, opacity:hovered?1:0.4 }} />
          <motion.div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em]" style={{ color:step.accent }} whileHover={{ x:4 }}>
            Learn More
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const Process = () => (
  <section className="relative overflow-hidden py-32" style={{ background:"linear-gradient(160deg,#f0fdf9 0%,#ecfdf5 30%,#f0fdfa 60%,#f7fffe 100%)" }}>
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundImage:"radial-gradient(rgba(5,150,105,0.16) 1px,transparent 1px)", backgroundSize:"30px 30px", opacity:0.5 }} />
      <div className="absolute top-[-12%] right-[-6%] w-[650px] h-[650px] rounded-full" style={{ background:"radial-gradient(circle,rgba(255,31,142,0.08) 0%,transparent 65%)", filter:"blur(80px)" }} />
    </div>
    <div className="container mx-auto px-6 relative z-10 max-w-7xl">
      <div className="flex flex-col items-center text-center mb-20">
        <SectionBadge text="Workflow Excellence" color="#059669" colorRgb="5,150,105" />
        <motion.h2 initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }} className="text-6xl md:text-[5rem] font-black leading-[0.92] tracking-tight mb-6" >
          <span style={{ color:"#0f172a" }}>A High-Performance</span><br />
          <GradHeading>Development Process</GradHeading>
        </motion.h2>
        <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }} className="text-lg max-w-xl mx-auto leading-relaxed font-medium" style={{ color:"#64748b" }}>
          Our systematic 6-step approach ensures every project is delivered with bulletproof stability.
        </motion.p>
        <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ delay:0.5, duration:0.9 }} className="mt-8 h-[3px] w-36 rounded-full origin-left" style={{ background:"linear-gradient(90deg,#FF1F8E,#7C3AED,#38BDF8)" }} />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {STEPS.map((s,i) => <StepCard key={s.id} step={s} index={i}/>)}
      </div>
      <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.5 }} className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-5">
        <p className="text-sm font-semibold" style={{ color:"#94a3b8" }}>Ready to begin your project?</p>
        <motion.button whileHover={{ scale:1.04 }} className="flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold text-white" style={{ background:"linear-gradient(135deg,#FF1F8E,#D4006A)", boxShadow:"0 0 40px rgba(255,31,142,0.25)" }}>
          Start a Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </motion.button>
        <motion.button whileHover={{ x:3 }} className="flex items-center gap-2 text-sm font-bold" style={{ color:"#FF1F8E" }}>
          View our work <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </motion.button>
      </motion.div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   6. BENTO SERVICES (white bg)
══════════════════════════════════════════════ */
const BENTO = [
  { id:"01", icon:<FiSmartphone/>, title:"Mobile App Dev", fullTitle:"Mobile App Development", description:"Native & cross-platform apps that engage and delight users.", href:"/mobileApp", tag:"Mobile", span:"b1", accent:"#7C3AED", accentBg:"#F5F3FF", accentBorder:"#DDD6FE" },
  { id:"02", icon:<FiLayout/>, title:"UI/UX Designing", fullTitle:"UI/UX Designing", description:"Interfaces that blend aesthetic beauty with functional clarity.", href:"/uiux", tag:"Design", span:"b2", accent:"#0891B2", accentBg:"#ECFEFF", accentBorder:"#A5F3FC" },
  { id:"03", icon:<FiServer/>, title:"Full Stack Dev", fullTitle:"Full Stack Development", description:"Scalable backends & dynamic frontends for modern web apps.", href:"/fullstack", tag:"Web", span:"b3", accent:"#059669", accentBg:"#ECFDF5", accentBorder:"#A7F3D0" },
  { id:"04", icon:<FiCheckCircle/>, title:"Software Testing", fullTitle:"Software Testing", description:"Bug-free, flawlessly performing products across all platforms.", href:"/softwaretesting", tag:"QA", span:"b4", accent:"#DC2626", accentBg:"#FEF2F2", accentBorder:"#FECACA" },
  { id:"05", icon:<FaLaravel/>, title:"Laravel Development", fullTitle:"Laravel Development", description:"Secure, feature-rich apps built with the powerful Laravel framework.", href:"/laravel", tag:"Backend", span:"b5", accent:"#EA580C", accentBg:"#FFF7ED", accentBorder:"#FED7AA" },
  { id:"06", icon:<FaNodeJs/>, title:"Node.js Dev", fullTitle:"Node.js Development", description:"High-performance, real-time event-driven applications.", href:"/nodejs", tag:"Backend", span:"b6", accent:"#16A34A", accentBg:"#F0FDF4", accentBorder:"#BBF7D0" },
  { id:"07", icon:<FaPhp/>, title:"PHP Development", fullTitle:"PHP Development", description:"Custom PHP solutions for your unique business goals.", href:"/php", tag:"Backend", span:"b7", accent:"#7C3AED", accentBg:"#F5F3FF", accentBorder:"#DDD6FE" },
  { id:"08", icon:<FaWordpress/>, title:"WordPress Site", fullTitle:"WordPress Website", description:"Flexible, easy-to-manage WordPress sites.", href:"/wordpress", tag:"CMS", span:"b8", accent:"#0369A1", accentBg:"#F0F9FF", accentBorder:"#BAE6FD" },
];
const bentoSpan = { b1:{gridColumn:"span 2"}, b2:{gridColumn:"span 2"}, b3:{gridColumn:"span 2"}, b4:{gridColumn:"span 3"}, b5:{gridColumn:"span 3"}, b6:{gridColumn:"span 2"}, b7:{gridColumn:"span 2"}, b8:{gridColumn:"span 2"} };

function BentoBox({ service }) {
  const [hovered, setHovered] = useState(false);
  const isWide = service.span === "b4" || service.span === "b5";
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      style={{ ...bentoSpan[service.span], borderRadius:20, padding:"1.5rem", border:`1.5px solid ${hovered?service.accentBorder:"#f1f5f9"}`, background:hovered?service.accentBg:"#fff", position:"relative", overflow:"hidden", transition:"all 0.25s", cursor:"pointer", boxShadow:hovered?`0 8px 30px ${service.accent}20`:"none", height:"100%", display:"flex", flexDirection:"column" }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:service.accent, opacity:hovered?1:0, transition:"opacity 0.2s" }} />
      <span style={{ position:"absolute", bottom:-8, right:10, fontSize:"4.5rem", fontWeight:900, color:service.accent, opacity:0.06, lineHeight:1, pointerEvents:"none" }}>{service.id}</span>
      <div style={{ width:42, height:42, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:"1rem", background:hovered?"#fff":service.accentBg, color:service.accent, border:`1.5px solid ${service.accentBorder}`, transition:"background 0.2s", flexShrink:0 }}>{service.icon}</div>
      <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:service.accent, marginBottom:4 }}>{service.tag}</p>
      <h3 style={{ fontSize:isWide?"1.15rem":"1rem", fontWeight:700, color:"#0f172a", marginBottom:6, letterSpacing:"-0.01em", lineHeight:1.2 }}>{isWide?service.fullTitle:service.title}</h3>
      <p style={{ fontSize:12, color:"#94a3b8", lineHeight:1.6, fontWeight:500, marginBottom:"0.8rem", flex:1 }}>{service.description}</p>
      <div style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:service.accent }}>
        Discover <FiArrowRight size={11} style={{ transform:hovered?"translateX(3px)":"translateX(0)", transition:"transform 0.2s" }}/>
      </div>
    </div>
  );
}

const BentoServices = () => (
  <section style={{ background:"#fff", padding:"5rem 1.5rem", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:"5%", left:"50%", transform:"translateX(-50%)", width:700, height:350, background:"radial-gradient(ellipse,rgba(255,31,142,0.06) 0%,transparent 70%)", pointerEvents:"none" }}/>
    <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
      <div style={{ textAlign:"center", marginBottom:"3rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:"1rem" }}>
          <div style={{ width:36, height:2, background:"#FF1F8E" }}/>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase", color:"#FF1F8E" }}>Service Spectrum</span>
          <div style={{ width:36, height:2, background:"#FF1F8E" }}/>
        </div>
        <h2 style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:900, color:"#0f172a", letterSpacing:"-0.03em", lineHeight:1, margin:0 }}>
          Powerful{" "}
          <span style={{ background:"linear-gradient(135deg,#E879F9 0%,#A855F7 40%,#38BDF8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Services</span>
        </h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:"2.5rem" }}>
        {BENTO.map(s => <BentoBox key={s.id} service={s}/>)}
      </div>
      <div style={{ textAlign:"center" }}>
        <button className="ws-btn-dark" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"14px 36px", background:"#0f172a", color:"#fff", border:"none", borderRadius:100, fontWeight:700, fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", transition:"background 0.2s" }}>
          Explore All Services <FiArrowRight size={14}/>
        </button>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   7. TESTIMONIALS
══════════════════════════════════════════════ */
const REVIEWS = [
  { id:0, initials:"AD", name:"Amir Dagan", role:"Verified Client", content:"The freelancer was very professional, well prepared and had a lot of patience with us", tag:"Web Development", accent:"#0891B2", accentLight:"#e0f2fe", accentText:"#0369a1", avatarFrom:"#0891B2", avatarTo:"#38bdf8" },
  { id:1, initials:"BB", name:"Bradley Braun", role:"Verified Client", content:"Webstep Solutions provided the deliverables in a timely and professional manner. They knows WordPress (as qwell as other platforms) and exceeded expectations.", tag:"WordPress & Delivery", accent:"#6366F1", accentLight:"#e0e7ff", accentText:"#4338ca", avatarFrom:"#6366F1", avatarTo:"#818cf8" },
  { id:2, initials:"MS", name:"Magnus Stihl", role:"Business Owner", content:"Karan from Webstep Solutions saved the day for us! What began as some final finishes before launching to include membership account registration pages set up, adding icons and linking our social media accounts with the site, and some testing developed into a significant list of issues that Karan was able to discover and provide a various array of fixes including writing additional code, installing the appropriate plugins and a vast amount of troubleshooting and testing. Karan possesses an immense level of skills, when he says he will work, he does. When he says he will be finished, he meets the deadline. When he knows issues are critical, he stays the course until the issues are resolved. Like other business owners, we obviously have high expectations when hiring staff and engaging contractors. Karan exceeded our expectations. 10 stars!", tag:"Membership & Custom Dev", accent:"#FF1F8E", accentLight:"#FCE7F3", accentText:"#9D0059", avatarFrom:"#FF1F8E", avatarTo:"#FF6EC4" },
  { id:3, initials:"ST", name:"Syga Thomas", role:"Verified Client", content:"Karan was excellent. He went above and beyond and can perform any task when it comes to website design.", tag:"Website Design", accent:"#EA580C", accentLight:"#ffedd5", accentText:"#9a3412", avatarFrom:"#EA580C", avatarTo:"#fb923c" },
  { id:4, initials:"NM", name:"Nathanael Murphy", role:"Frontend Client", content:"Karan did an excellent job in a timely manner. He added his own design concepts without being asked, which helped make the project even better. I highly recommend Karan and am already hiring him for a second frontend project.", tag:"UI/UX & Frontend", accent:"#059669", accentLight:"#d1fae5", accentText:"#065f46", avatarFrom:"#059669", avatarTo:"#34d399" },
  { id:5, initials:"BT", name:"Ben Tee", role:"Verified Client", content:"Wonderful work done!", tag:"Web Solutions", accent:"#7C3AED", accentLight:"#ede9fe", accentText:"#5b21b6", avatarFrom:"#7C3AED", avatarTo:"#a855f7" },
];
const TSTATS = [
  { icon:<FiBriefcase/>, num:"120+", label:"Projects Delivered", bg:"#ede9fe", color:"#7C3AED" },
  { icon:<FiStar/>, num:"4.9/5", label:"Avg Rating", bg:"#FCE7F3", color:"#FF1F8E" },
  { icon:<FiCheckCircle/>, num:"✓", label:"Google Certified", bg:"#d1fae5", color:"#059669" },
  { icon:<FiGlobe/>, num:"40+", label:"Countries", bg:"#ffedd5", color:"#EA580C" },
];

const Testimonials = () => {
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);
  const total = REVIEWS.length;
  const goTo = (i) => setCur((i + total) % total);
  useEffect(() => { timerRef.current = setInterval(() => setCur(c => (c+1)%total), 4000); return () => clearInterval(timerRef.current); }, []);
  const r = REVIEWS[cur];

  return (
    <section style={{ background:"#f4f3fa", padding:"5rem 1.5rem" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1.5px solid #e0ddf5", borderRadius:100, padding:"6px 16px", marginBottom:"1rem" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#FF1F8E" }}/>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", color:"#FF1F8E" }}>Success Stories</span>
          </div>
          <h2 style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:900, color:"#18142e", letterSpacing:"-0.03em", lineHeight:1, margin:0 }}>
            Global Client{" "}
            <span style={{ background:"linear-gradient(135deg,#E879F9 0%,#A855F7 40%,#38BDF8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Success</span>
          </h2>
          <p style={{ fontSize:18, color:"#8b87a8", marginTop:"0.6rem", fontWeight:500 }}>Hear directly from teams we've partnered with.</p>
        </div>

        <div style={{ borderRadius:20, border:"1.5px solid #eceaf5", background:"#f4f3fa", overflow:"hidden" }}
          onMouseEnter={() => clearInterval(timerRef.current)}
          onMouseLeave={() => { timerRef.current = setInterval(() => setCur(c => (c+1)%total), 4000); }}
        >
          <div style={{ display:"grid", gridTemplateColumns:"70px 1fr auto", alignItems:"center", gap:"1.4rem", padding:"1.8rem", background:`linear-gradient(180deg,${r.accentLight},#FFF)`, position:"relative", transition:"background 0.3s" }}>
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:4, background:`linear-gradient(180deg,${r.avatarFrom},${r.avatarTo})`, borderRadius:"4px 0 0 4px" }}/>
            <div style={{ width:50, height:50, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:900, color:"#fff", background:`linear-gradient(135deg,${r.avatarFrom},${r.avatarTo})` }}>{r.initials}</div>
            <div>
              <p style={{ fontSize:14, color:"#3d3660", lineHeight:1.65, fontWeight:500, fontStyle:"italic", marginBottom:8 }}>"{r.content}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:"#18142e" }}>{r.name}</span>
                <span style={{ fontSize:11, color:"#c4c0d8" }}>·</span>
                <span style={{ fontSize:11, fontWeight:600, color:"#8b87a8" }}>{r.role}</span>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
              <div style={{ display:"flex", gap:2 }}>{[...Array(5)].map((_,i) => <FaStar key={i} size={12} color={r.accent}/>)}</div>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", padding:"3px 10px", borderRadius:100, background:r.accentLight, color:r.accentText }}>{r.tag}</span>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.85rem 1.4rem", borderTop:"1.5px solid #eceaf5", background:"#fff" }}>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              {REVIEWS.map((_,i) => (
                <button key={i} className="ws-dot" onClick={() => goTo(i)} style={{ width:i===cur?"22px":"7px", height:7, borderRadius:i===cur?4:"50%", background:i===cur?"#FF1F8E":"#e0ddf5", border:"none", cursor:"pointer", padding:0 }}/>
              ))}
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:"#8b87a8", letterSpacing:"0.1em" }}>{String(cur+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
            <div style={{ display:"flex", gap:8 }}>
              {[{ fn:()=>goTo(cur-1), icon:<FiArrowLeft size={15}/> },{ fn:()=>goTo(cur+1), icon:<FiArrowRight size={15}/> }].map((b,i) => (
                <button key={i} className="ws-navbtn" onClick={b.fn} style={{ width:34, height:34, borderRadius:10, border:"1.5px solid #e0ddf5", background:"#fff", color:"#FF1F8E", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>{b.icon}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop:"1.2rem", background:"#fff", border:"1.5px solid #eceaf5", borderRadius:20, padding:"1.2rem 1.6rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
          {TSTATS.map((s,i) => (
            <React.Fragment key={i}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:38, height:38, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, background:s.bg, color:s.color, flexShrink:0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize:"1.1rem", fontWeight:900, color:"#18142e", lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#8b87a8", marginTop:1 }}>{s.label}</div>
                </div>
              </div>
              {i < TSTATS.length-1 && <div style={{ width:1, height:32, background:"#eceaf5", flexShrink:0 }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};



/* ══════════════════════════════════════════════
   9. CONTACT FORM (white bg)
══════════════════════════════════════════════ */
const INFO_ITEMS = [
  { icon:<FaMapMarkerAlt/>, title:"Global HQ", detail:"E-45 Industrial Area Phase-8", subDetail:"Mohali, Punjab", accent:"#FF1F8E", accentRgb:"255,31,142" },
  { icon:<FaEnvelope/>, title:"Contact Us", detail:"info@webstepsolutions.com", subDetail:"+91 79739-38927", accent:"#0891B2", accentRgb:"8,145,178" },
  { icon:<FaClock/>, title:"Working Hours", detail:"Mon – Sat: 9:00 AM – 6:00 PM", subDetail:"Sun: Closed", accent:"#F59E0B", accentRgb:"245,158,11" },
];
const CSOCIALS = [{ icon:<FaLinkedinIn/>, label:"LinkedIn", href:"https://linkedin.com", hoverColor:"#0077b5" },{ icon:<FaInstagram/>, label:"Instagram", href:"https://instagram.com", hoverColor:"#e1306c" },{ icon:<FaTwitter/>, label:"Twitter", href:"https://twitter.com", hoverColor:"#1da1f2" }];

const ContactSection = () => (
  <section className="py-20 md:py-24 relative z-10 px-6 overflow-hidden bg-white">
    <div className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none" style={{ background:"rgba(255,31,142,0.05)" }}/>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background:"rgba(34,211,238,0.05)" }}/>
    <div className="container mx-auto relative z-10">
      <div className="flex flex-col items-center text-center mb-20">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-slate-200"/>
          <span className="text-[10px] font-black tracking-[0.38em] uppercase text-slate-400" >Get In Touch</span>
          <span className="w-10 h-px bg-slate-200"/>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6" >
          Ready to Bring Your{" "}
          <GradHeading>Ideas to Life?</GradHeading>
        </h2>
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">We're here to help you navigate the digital landscape. Reach out to discuss your project!</p>
      </div>

      <div className="flex flex-col lg:flex-row rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
        {/* Left */}
        <div className="w-full lg:w-[42%] p-0 md:p-16 flex flex-col justify-center gap-10 bg-white border-b lg:border-b-0 lg:border-r border-slate-100">
          {INFO_ITEMS.map((item,i) => (
            <div key={i} className="ws-info-item flex gap-5 items-start group cursor-default">
              <div className="ws-info-icon flex-shrink-0 transition-all duration-500 rounded-2xl border border-slate-100 bg-white flex items-center justify-center text-lg" style={{ width:52, height:52, color:item.accent }}>
                {item.icon}
              </div>
              <div className="pt-0.5">
                <h4 className="font-black text-slate-900 text-xl mb-1" style={{  transition:"color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.color=item.accent}
                  onMouseLeave={e=>e.currentTarget.style.color=""}
                >{item.title}</h4>
                <p className="text-slate-500 text-base font-medium leading-snug">{item.detail}</p>
                <p className="text-slate-400 text-sm font-medium leading-snug">{item.subDetail}</p>
              </div>
            </div>
          ))}
          <div className="pt-8 border-t border-slate-100">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-5" >Social Connectivity</p>
            <div className="flex gap-3">
              {CSOCIALS.map((s,i) => (
                <a key={i} href={s.href} aria-label={s.label} className="w-11 h-11 rounded-xl border border-slate-100 bg-white flex items-center justify-center text-slate-400 text-sm transition-all duration-300 shadow-sm hover:scale-110 hover:-translate-y-0.5"
                  onMouseEnter={e=>{e.currentTarget.style.color=s.hoverColor;e.currentTarget.style.borderColor=s.hoverColor;}}
                  onMouseLeave={e=>{e.currentTarget.style.color="";e.currentTarget.style.borderColor="";}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full lg:w-[58%] p-0 md:p-16 flex flex-col" style={{ background:"#f8fafc" }}>
          <div className="mb-10">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2" >Initiate Inquiry</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">Complete the form and our specialists will engage with you shortly.</p>
          </div>
          <div className="flex-grow space-y-5">
            {[["Full Name","text","Your full name"],["Email Address","email","your@email.com"],["Phone Number","tel","+91 00000 00000"]].map(([label,type,placeholder]) => (
              <div key={label}>
                <label className="block text-sm font-semibold text-slate-600 mb-2" >{label}</label>
                <input type={type} placeholder={placeholder} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm outline-none transition-all duration-200 focus:border-[#FF1F8E] focus:ring-2 focus:ring-[rgba(255,31,142,0.15)]" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2" >Message</label>
              <textarea placeholder="Tell us about your project..." rows={4} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm outline-none transition-all duration-200 focus:border-[#FF1F8E] focus:ring-2 focus:ring-[rgba(255,31,142,0.15)] resize-none" />
            </div>
            <motion.button
              whileHover={{ scale:1.02, boxShadow:"0 12px 36px rgba(255,31,142,0.3)" }}
              whileTap={{ scale:0.98 }}
              className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all"
              style={{ background:"linear-gradient(135deg,#FF1F8E,#D4006A)" }}
            >
              Send Message →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════════
   MAIN HOMEPAGE EXPORT
══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div className="ws-root">
      <GlobalStyles />
      <Banner />
      <ConversionService />
      <SmartServices />
      <OurExpertise />
      <Process />
      <BentoServices />
      <Testimonials />
      <ContactSection />
    </div>
  );
}