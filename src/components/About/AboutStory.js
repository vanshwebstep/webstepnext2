"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import AnimatedSection from '../AnimatedSection';
import { FaHistory, FaBullseye, FaLightbulb, FaAward } from 'react-icons/fa';

const AboutStory = () => {

  const PROCESS_STEPS = [
    {
      num: "01",
      title: "Discovery & Requirements",
      desc: "We start by understanding your business, your users, and your goals in depth — no guesswork, just clarity. This shapes everything that follows.",
      icon: "🔍",
      color: "#6366f1",
      accent: "#e0e7ff",
    },
    {
      num: "02",
      title: "Architecture & Tech Planning",
      desc: "We choose the right stack (React, Next.js, Laravel, WordPress, Shopify, or custom) and map out the full project architecture before writing a single line of code.",
      icon: "🗺️",
      color: "#8b5cf6",
      accent: "#ede9fe",
    },
    {
      num: "03",
      title: "Design & Prototype",
      desc: "Our designers create pixel-perfect mockups and interactive prototypes, reviewed and approved by you before development begins — so there are no surprises.",
      icon: "✏️",
      color: "#ec4899",
      accent: "#fce7f3",
    },
    {
      num: "04",
      title: "Development & Reviews",
      desc: "We build in focused sprints and share working demos regularly. You're involved at every stage — not just at the end. Clean code, tested thoroughly.",
      icon: "⚙️",
      color: "#f59e0b",
      accent: "#fef3c7",
    },
    {
      num: "05",
      title: "Launch & Ongoing Support",
      desc: "We handle deployment, go-live monitoring, and post-launch fixes. And we don't disappear after launch — ongoing support and maintenance is part of who we are.",
      icon: "🚀",
      color: "#10b981",
      accent: "#d1fae5",
    },
  ];

  const Reveal = ({ children, delay = 0, direction = "up", className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: direction === "up" ? 40 : direction === "down" ? -40 : 0, x: direction === "left" ? 40 : direction === "right" ? -40 : 0 },
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section id="process" className="bg-white py-12 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <Reveal className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl mb-4 sm:mb-5 border border-violet-100" style={{ background: "#ede9fe", color: "#6d28d9" }}>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase">How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            How We Work: From Idea to{" "}
            <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Live Product
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-lg mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed">
            Every Webstep project follows a clear, transparent process — so you always know what&apos;s happening, why, and what comes next.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, #E879F9, #A855F7, #38BDF8)" }} />

          <div className="space-y-4 sm:space-y-6">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1} direction="left">
                <div className="group flex gap-3 sm:gap-6 relative">
                  <div
                    className="relative z-10 flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-extrabold text-xs sm:text-[13px] border-2 shadow-md transition-all duration-300 group-hover:scale-110"
                    style={{ background: step.accent, borderColor: `${step.color}40`, color: step.color }}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 p-4 sm:p-6 rounded-2xl border border-slate-100 bg-white group-hover:border-purple-100 group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-400">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-lg sm:text-2xl">{step.icon}</span>
                      <h3 className="text-slate-900 font-extrabold text-base sm:text-xl">{step.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-[15px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.5} className="mt-10 sm:mt-16 text-center">
          <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-5">Ready to get started?</p>
          <Link
            href="/contactus"
            className="inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-xs sm:text-[15px] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            style={{ background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)", boxShadow: "0 16px 40px rgba(168,85,247,0.3)" }}
          >
            Start Your Project
          </Link>
        </Reveal>

      </div>
    </section>
  );
};

export default AboutStory;