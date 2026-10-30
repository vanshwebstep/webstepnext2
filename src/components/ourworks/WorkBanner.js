"use client";
import React from 'react';
import QuoteForm from '../QuoteForm';
import Lists from '../Lists';
import AnimatedSection from '../AnimatedSection';

const STATS = [
  { value: "12+", label: "Years Experience" },
  { value: "120+", label: "Projects Delivered" },
  { value: "12+", label: "Technologies" },
  { value: "98%", label: "Client Satisfaction" },
];

const WorkBanner = () => {
  return (
    <section className="pt-[120px] md:pt-[160px] pb-12 sm:pb-[8.5rem] bg-white relative z-10 px-4 sm:px-6 overflow-hidden font-roboto">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-50 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-50 rounded-full blur-[80px] sm:blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <AnimatedSection delay={0.1} direction="up">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">

            {/* ── Left Content ── */}
            <div className="lg:w-3/5">
              <div className="mb-6 sm:mb-10">

                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl 
                  bg-white/50 backdrop-blur-xl border border-white/60 
                  text-[#FF1F8E] font-semibold text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.35em] uppercase 
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-4 sm:mb-6 
                  hover:scale-105 transition-all duration-300 cursor-default">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
                  </span>
                  Our Portfolio
                </div>

                {/* Heading */}
                <h1 className="relative text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] sm:leading-[0.9] mb-4 sm:mb-6">
                  <span className="block text-slate-900">
                    Crafting Digital
                  </span>
                  <span
                    className="relative inline-block"
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Masterpieces
                    <span className="absolute left-0 -bottom-2 w-full h-[6px] rounded-full 
                      bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 
                      blur-sm opacity-70 animate-pulse" />
                  </span>
                </h1>

                {/* Description — Webstep ke liye updated */}
                <p className="text-slate-500 text-sm sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                  With <span className="font-semibold text-slate-700">12+ years of excellence</span>,
                  Webstep Solutions has delivered 500+ world-class digital products — from blazing-fast
                  React & Next.js web apps to powerful Shopify stores, WordPress solutions, and
                  cutting-edge AI integrations. We build for performance, scale, and results.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {STATS.map(({ value, label }) => (
                    <div key={label} className="flex flex-col">
                      <span
                        className="text-xl sm:text-2xl font-black"
                        style={{
                          background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {value}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-slate-400">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider line */}
                <div className="relative w-20 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                  <div className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-pink-400 to-cyan-400" />
                </div>
              </div>

              <Lists />
            </div>

            {/* ── Right Form ── */}
            <div className="lg:w-2/5 w-full">
              <div className="relative p-[2px] rounded-3xl sm:rounded-[3rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_20px_60px_rgba(236,72,153,0.25)] mt-6 sm:mt-20">
                <div className="rounded-3xl sm:rounded-[3rem] backdrop-blur-xl bg-white/90 p-4 sm:p-10">
                  <div className="relative z-10">
                    <QuoteForm />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WorkBanner;