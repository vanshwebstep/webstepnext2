import React from 'react';
import Image from 'next/image';
import AnimatedSection from '../AnimatedSection';
import Link from 'next/link';
import { assetImage } from "@/lib/assets";
const seo = assetImage("FM-FE-104-ImageBody-65.png");

const SeoBanner = () => {
  return (
    <section className="py-16 md:py-24 pt-40 bg-white relative z-10 px-6 overflow-hidden font-roboto">

      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="container pt-20 mx-auto relative z-10">
        <AnimatedSection delay={0.1} direction="up">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* ── LEFT CONTENT ── */}
            <div className="lg:w-3/5">
              <div className="mb-10 text-center lg:text-left">

                {/* Glass badge */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl
                  bg-white/50 backdrop-blur-xl border border-white/60
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-6
                  hover:scale-105 transition-all duration-300 cursor-default">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF1F8E]" />
                  </span>
                  <span
                    className="text-[10px] font-bold tracking-[0.35em] uppercase"
                    style={{
                      background: "linear-gradient(135deg, #FF1F8E 0%, #A855F7 50%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Rank Higher, Grow Faster
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-extrabold leading-[0.95] text-slate-900 mb-4 tracking-tight">
                  Result-Driven{" "}
                  <span
                    className="relative inline-block"
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    SEO Services
                    <span className="absolute left-0 -bottom-2 w-full h-[6px] rounded-full
                      bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                      blur-sm opacity-70 animate-pulse" />
                  </span>{" "}
                  That Scale
                </h1>

                {/* Divider */}
                <div className="relative w-20 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6 mx-auto lg:mx-0">
                  <div className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-pink-400 to-cyan-400" />
                </div>

                <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                  We grow your organic search presence with technical SEO, content strategy, and
                  authority building. Transparent reporting, proven methodologies, and{" "}
                  <span className="text-slate-900 font-semibold">rankings that compound over time.</span>
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link
                    href="/contactus"
                    className="px-8 py-4 rounded-2xl text-[11px] font-black capitalize tracking-[0.2em]
                      text-white hover:-translate-y-1 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #FF79C6 0%, #A855F7 50%)",
                      boxShadow: "0 6px 24px rgba(168,85,247,0.3)",
                    }}
                  >
                    Boost My Rankings
                  </Link>
                  
                </div>

              </div>
            </div>

            {/* ── RIGHT IMAGE ── */}
            <div className="lg:w-2/5 flex justify-center">
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.25), rgba(168,85,247,0.2), rgba(56,189,248,0.15))" }}
                />
                <div
                  className="relative p-[2px] rounded-[3rem]"
                  style={{
                    background: "linear-gradient(135deg, #FF1F8E, #A855F7, #38BDF8)",
                    boxShadow: "0 20px 60px rgba(236,72,153,0.2)",
                  }}
                >
                  <div className="rounded-[3rem] bg-white/90 backdrop-blur-xl p-8 transform group-hover:-translate-y-2 transition-all duration-500">
                    <Image src={seo} alt="SEO Services" className="w-full h-auto max-w-[300px]" />
                  </div>
                </div>
                <div
                  className="absolute -top-4 -right-4 w-10 h-10 rounded-full opacity-80"
                  style={{ background: "linear-gradient(135deg, #FF1F8E, #A855F7)" }}
                />
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-60"
                  style={{ background: "linear-gradient(135deg, #A855F7, #38BDF8)" }}
                />
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SeoBanner;