"use client";
import React, { useRef } from "react";
import AnimatedSection from "../AnimatedSection";
import { FiCode, FiUsers, FiAward, FiZap } from "react-icons/fi";
import { motion, useInView } from "framer-motion";

const values = [
  {
    icon: FiCode,
    number: "01",
    title: "Code That Lasts",
    desc: "We write clean, maintainable, well-documented code — so your product doesn't become a liability six months after launch.",
    accent: "#FF1F8E",
    glow: "rgba(255,31,142,0.25)",
    gradient: "linear-gradient(135deg, #FF1F8E 0%, #FF6B6B 100%)",
    bgGradient: "linear-gradient(135deg, rgba(255,31,142,0.06) 0%, rgba(255,107,107,0.03) 100%)",
    tag: "QUALITY",
  },
  {
    icon: FiUsers,
    number: "02",
    title: "Client-First Always",
    desc: "We treat every project like it's our own business. Your goals, your timelines, your success — that's what drives every decision we make.",
    accent: "#A855F7",
    glow: "rgba(168,85,247,0.25)",
    gradient: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)",
    bgGradient: "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(99,102,241,0.03) 100%)",
    tag: "PEOPLE",
  },
  {
    icon: FiAward,
    number: "03",
    title: "Right Tech, Right Fit",
    desc: "We don't push a single stack. We choose React, Next.js, Vue, Laravel, WordPress, Shopify, or AI — based on what actually suits your project.",
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.25)",
    gradient: "linear-gradient(135deg, #38BDF8 0%, #06B6D4 100%)",
    bgGradient: "linear-gradient(135deg, rgba(56,189,248,0.06) 0%, rgba(6,182,212,0.03) 100%)",
    tag: "EXPERTISE",
  },
  {
    icon: FiZap,
    number: "04",
    title: "Deliver on Time",
    desc: "98% of our projects ship on schedule. We plan carefully, communicate clearly, and flag issues early — no surprise delays, no excuses.",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.25)",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
    bgGradient: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(239,68,68,0.03) 100%)",
    tag: "RELIABILITY",
  },
];

const ValueCard = ({ val, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = val.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div
        className="relative h-full rounded-3xl border border-slate-200/80 overflow-hidden transition-all duration-500 cursor-default hover:border-transparent hover:-translate-y-2"
        style={{ background: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
      >
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `0 0 0 1.5px ${val.accent}, 0 20px 60px ${val.glow}, 0 4px 20px ${val.glow}` }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{ background: val.bgGradient }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: val.gradient }}
        />

        <div className="relative z-10 p-5 sm:p-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <span
              className="font-black text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border"
              style={{ color: val.accent, borderColor: `${val.accent}30`, background: `${val.accent}10` }}
            >
              {val.tag}
            </span>
            <span
              className="font-black text-4xl sm:text-5xl leading-none select-none transition-all duration-300 group-hover:scale-110"
              style={{ background: val.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.15 }}
            >
              {val.number}
            </span>
          </div>

          <div
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ background: val.gradient, boxShadow: `0 8px 24px ${val.glow}` }}
          >
            <Icon size={20} color="#fff" strokeWidth={2.5} />
          </div>

          <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight leading-tight">{val.title}</h4>

          <div
            className="w-8 sm:w-10 h-[2.5px] rounded-full mb-3 sm:mb-4 transition-all duration-500 group-hover:w-16"
            style={{ background: val.gradient }}
          />

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{val.desc}</p>
        </div>

        <div
          className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-[0.06] transition-all duration-500 pointer-events-none"
          style={{ background: val.gradient }}
        />
      </div>
    </motion.div>
  );
};

const AboutValues = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-slate-50 px-4 sm:px-6" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');`}</style>

      <div className="container mx-auto max-w-6xl">
        <AnimatedSection delay={0} direction="up" className="text-center mb-10 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl mb-6 sm:mb-8 border border-white/60 bg-white/70 backdrop-blur-xl shadow-sm text-[9px] sm:text-[11px] font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase"
            style={{ color: "#FF1F8E" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FF1F8E" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#FF1F8E" }} />
            </span>
            What We Stand For
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] sm:leading-[0.88] text-slate-900 mb-4 sm:mb-6"
          >
            Who We Are: The{" "}
            <span
              className="relative inline-block"
              style={{ background: "linear-gradient(135deg, #FF1F8E 0%, #A855F7 50%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Principles
              <motion.span
                className="absolute left-0 -bottom-2 w-full h-[4px] rounded-full"
                style={{ background: "linear-gradient(90deg, #FF1F8E, #A855F7, #38BDF8)", filter: "blur(3px)", opacity: 0.5 }}
                animate={{ scaleX: [0.7, 1, 0.7], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>{" "}
            <br className="hidden md:block" />
            We Build By
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-400 text-xs sm:text-base max-w-xl mx-auto font-medium"
          >
            Four commitments that guide every project, every client, every line of code at Webstep Solutions.
          </motion.p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, index) => (
            <ValueCard key={index} val={val} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px max-w-xs mx-auto rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #FF1F8E, #A855F7, #38BDF8, transparent)" }}
        />
      </div>
    </section>
  );
};

export default AboutValues;