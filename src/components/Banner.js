"use client";
import React, { useEffect, useRef, useState } from "react";
import { Code, Terminal, Cpu, Cloud, Smartphone, Layers, Rocket, Zap } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { assetImage } from "@/lib/assets";
const herobanner = assetImage("banner.png");

const SERVICES = [
  {
    id: "01",
    num: 120,
    suffix: '+',
    label: 'Projects Delivered',
    accent: "#E879F9",
    accentRgb: "232,121,249",
    gradientFrom: "#E879F9",
    gradientTo: "#A855F7",
  },
  {
    id: "02",
    num: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    accent: "#38BDF8",
    accentRgb: "56,189,248",
    gradientFrom: "#38BDF8",
    gradientTo: "#818CF8",
  },
  {
    id: "03",
    num: 12,
    suffix: '+',
    label: 'Years Experience',
    accent: "#34D399",
    accentRgb: "52,211,153",
    gradientFrom: "#34D399",
    gradientTo: "#06B6D4",
  },
  {
    id: "04",
    num: 15,
    suffix: '+',
    label: 'Countries Served',
    accent: "#F59E0B",
    accentRgb: "245,158,11",
    gradientFrom: "#F59E0B",
    gradientTo: "#FBBF24",
  }
];

function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(end);
  useEffect(() => {
    let start = 0;
    const steps = duration / 16;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
}

function TiltCard({ service, index }) {

  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const count = useCounter(service.num);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group"
    >
      <div className="bg-white rounded-2xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_30px_100px_rgba(255,31,142,0.2)]">
        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-1.5 sm:mb-3">
          {count}
          <span className="text-pink-500">{service.suffix}</span>
        </div>
        <p className="text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-[0.3em] uppercase text-gray-500 font-semibold leading-tight">
          {service.label}
        </p>
        <div
          className="mt-3 sm:mt-6 h-[3px] w-8 sm:w-10 rounded-full transition-all duration-500 group-hover:w-20"
          style={{ background: `linear-gradient(90deg, ${service.gradientFrom}, ${service.gradientTo})` }}
        />
      </div>
    </motion.div>
  );
}

const Banner = () => {
  const tickerItems = [
    'React.js Development', 'Next.js Solutions', 'WordPress Experts',
    'Shopify Apps & Themes', 'AI Chatbots', 'Laravel & PHP',
    'Node.js Backend', 'Vue.js Development', 'AI Integration',
  ];

  const [activeBtn, setActiveBtn] = useState('start');
  const doubled = [...tickerItems, ...tickerItems];

  const floatingIcons = [
    { Icon: Code, top: '15%', left: '8%', color: '#FF1F8E', size: 32 },
    { Icon: Terminal, top: '45%', left: '12%', color: '#D400CC', size: 24 },
    { Icon: Cpu, top: '70%', left: '10%', color: '#FF1F8E', size: 28 },
    { Icon: Zap, top: '25%', left: '20%', color: '#D400CC', size: 20 },
    { Icon: Cloud, top: '20%', right: '10%', color: '#D400CC', size: 36 },
    { Icon: Smartphone, top: '50%', right: '14%', color: '#FF1F8E', size: 30 },
    { Icon: Layers, top: '75%', right: '12%', color: '#D400CC', size: 34 },
    { Icon: Rocket, top: '35%', right: '22%', color: '#FF1F8E', size: 22 },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden font-roboto pt-28 sm:pt-32 pb-16 sm:pb-20">

      <div className="absolute inset-0 -z-20">
        <Image src={herobanner} alt="" aria-hidden="true" fill priority className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[800px] h-[350px] sm:h-[800px] bg-gradient-to-br from-[#FF1F8E]/20 to-transparent rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] sm:w-[800px] h-[350px] sm:h-[800px] bg-gradient-to-tl from-[#FF1F8E]/20 to-transparent rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:60px_60px]" />
      </div>

      <div className="hidden lg:block">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, y: [0, -25, 0], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: idx * 0.3 }}
            className="absolute backdrop-blur-xl rounded-2xl p-3 border border-white/10"
            style={{
              top: item.top, left: item.left, right: item.right,
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 0 20px rgba(99,102,241,0.2)",
            }}
          >
            <item.Icon size={item.size} color={item.color} strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-20 relative z-10 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6 shadow-sm max-w-[95%] sm:max-w-none">
          <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]"></span>
          </span>
          <span className="truncate">Turning Ideas Into Digital Reality</span>
        </div>

        {/* Tagline */}
        <p
          className="text-xs sm:text-sm font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase mb-3"
          style={{
            background: "linear-gradient(135deg, #E879F9 0%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Build Better. Grow Faster.
        </p>

        {/* Headline H1 with keywords */}
        <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-black text-white tracking-tight leading-[1.08] sm:leading-[0.98] mb-5 sm:mb-8 max-w-5xl">
          Web Development Company for{" "}
          <span style={{
            background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Agencies and Growing Businesses
          </span>
        </motion.h1>

        {/* Subheadline */}
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-medium px-2">
          Webstep Solutions builds high-performance websites and apps — from React & Next.js to WordPress, Shopify, and AI-powered solutions. Your vision, our expertise.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12 sm:mb-20 w-full sm:w-auto px-4">
          <Link
            href="/customize-package"
            onClick={() => setActiveBtn('start')}
            className={`w-full sm:w-auto relative px-7 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden group text-center
              ${activeBtn === 'start' ? 'bg-[#FF1F8E] text-white scale-105 shadow-[0_10px_30px_rgba(255,31,142,0.4)]' : 'bg-white/60 text-slate-900 hover:text-white'}`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF1F8E] to-[#FF1F8E]/70 opacity-0 group-hover:opacity-100 transition duration-500"></span>
            <span className="relative z-10">Start Your Project</span>
          </Link>

          <Link
            href="/case-study"
            onClick={() => setActiveBtn('case')}
            className={`w-full sm:w-auto relative px-7 py-4 sm:px-10 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden group text-center
              ${activeBtn === 'case' ? 'bg-[#FF1F8E] text-white scale-105 shadow-[0_10px_30px_rgba(255,31,142,0.4)]' : 'bg-white/60 text-slate-900 hover:text-white'}`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF1F8E] to-[#FF1F8E]/70 opacity-0 group-hover:opacity-100 transition duration-500"></span>
            <span className="relative z-10">View Our Work</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="w-full flex justify-center py-8 sm:py-16 md:py-20 px-2 sm:px-6 relative">
          <div className="absolute w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-pink-500/20 blur-[80px] sm:blur-[120px] rounded-full top-0 left-1/2 -translate-x-1/2" />
          <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {SERVICES.map((service, i) => (
              <TiltCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <div className="absolute left-0 top-0 h-full w-12 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-12 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        <div className="relative bg-gradient-to-r from-white/70 via-white/60 to-white/70 backdrop-blur-2xl border-t border-white/30 py-3.5 sm:py-7 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,31,142,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,115,0,0.15),transparent_40%)]"></div>
          <div className="flex w-max animate-ticker items-center relative">
            {doubled.map((item, i) => (
              <div key={i} className="flex items-center group relative">
                <span className="text-[10px] sm:text-[12px] font-extrabold tracking-[0.25em] sm:tracking-[0.45em] uppercase text-slate-700 whitespace-nowrap px-5 sm:px-12 transition-all duration-300 group-hover:text-[#FF1F8E] group-hover:scale-[1.05]">
                  {item}
                </span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF1F8E]/50 group-hover:scale-150 group-hover:shadow-[0_0_8px_#FF1F8E] transition-all duration-300" />
                  <div className="w-1 h-1 rounded-full bg-slate-300 opacity-60" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1F8E] to-transparent group-hover:w-1/2 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Banner;