"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from '../AnimatedSection';
import { FaArrowRight, FaQuoteLeft, FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { HiOutlineArrowUpRight, HiOutlineChevronDown } from "react-icons/hi2";

const AboutHero = () => {
  const STATS = [
    { num: "120+", label: "Projects Delivered", sub: "Across 15+ industries" },
    { num: "50+", label: "Happy Clients",      sub: "Startups to enterprises" },
    { num: "12+",  label: "Years Experience",   sub: "Since 2012" },
    { num: "98%",  label: "On-Time Delivery",   sub: "Consistent track record" },
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

  const StatsTicker = () => (
    <section className="bg-white border-y border-slate-100 py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1"
                style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.num}
              </p>
              <p className="text-slate-900 font-semibold text-xs sm:text-[15px] mb-0.5">{s.label}</p>
              <p className="text-slate-400 text-[10px] sm:text-[12px]">{s.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <section className="relative w-full pt-[100px] md:pt-[120px] xl:pt-[180px] pb-12 sm:pb-20 overflow-hidden bg-slate-50 font-roboto">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[350px] sm:w-[800px] h-[350px] sm:h-[800px] bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-pink-500/5 to-transparent rounded-full blur-[60px] sm:blur-[80px] translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto max-w-5xl relative z-10 px-4 sm:px-6">
          <AnimatedSection delay={0.1} direction="up">
            <div className="text-center flex flex-col items-center">

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl mt-4 sm:mt-8 mb-4 border border-white/60 bg-white/50 backdrop-blur-xl shadow-sm text-[9px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                style={{ color: "#FF1F8E" }}
              >
                <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#FF1F8E" }} />
                  <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5" style={{ background: "#FF1F8E" }} />
                </span>
                About Webstep Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight leading-[1.08] sm:leading-[0.95] text-slate-900 mb-4 sm:mb-6"
              >
                About Webstep Solutions
                <br />
                <span className="relative inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-2"
                  style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  We Build the Web You Imagine
                  <span className="absolute left-0 -bottom-2 w-full h-[5px] rounded-full animate-pulse"
                    style={{ background: "linear-gradient(90deg, #E879F9, #A855F7, #38BDF8)", filter: "blur(4px)", opacity: 0.6 }} />
                </span>
              </motion.h1>

              <p className="text-sm sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
                Webstep Solutions is a dedicated web development agency — building websites, apps, and AI-powered products for startups, businesses, and enterprises across the globe. From React to WordPress, Shopify to Laravel, we turn ideas into live products.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
              >
                <a href="#process"
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-xs sm:text-[15px] transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)", boxShadow: "0 16px 40px rgba(168,85,247,0.35)" }}>
                  How We Work
                  <HiOutlineArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <Link href="/customize-package"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-slate-600 text-xs sm:text-[15px] border border-slate-200 hover:border-purple-300 hover:text-purple-600 bg-white/60 backdrop-blur-md transition-all duration-300">
                  Start a Project
                </Link>
              </motion.div>

            </div>
          </AnimatedSection>
        </div>
      </section>
      <StatsTicker />
    </>
  );
};

export default AboutHero;