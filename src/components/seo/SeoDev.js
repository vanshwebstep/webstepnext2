import React from 'react';
import ExpertsForm from '../ExpertsForm';
import AnimatedSection from '../AnimatedSection';

const SeoDev = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative z-10 px-6 overflow-hidden font-roboto">

      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <AnimatedSection delay={0.1} direction="up">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* ── LEFT CONTENT ── */}
            <div className="lg:w-3/5">
              <div className="mb-10">

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
                    Technical Excellence
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[0.95] text-slate-900 mb-4 tracking-tight">
                  White-Hat{" "}
                  <span
                    className="relative inline-block"
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    SEO
                    <span className="absolute left-0 -bottom-2 w-full h-[5px] rounded-full
                      bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                      blur-sm opacity-70 animate-pulse" />
                  </span>{" "}
                  Built for the Long Game
                </h2>

                {/* Divider */}
                <div className="relative w-20 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-8">
                  <div className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-pink-400 to-cyan-400" />
                </div>

                {/* Body text */}
                <div className="space-y-5 text-slate-500 text-lg leading-relaxed">
                  <p>
                    Search engines reward websites that are fast, authoritative, and genuinely useful.
                    Our SEO approach starts with a deep technical audit, then systematically closes
                    every gap between you and the top position.
                  </p>
                  <p>
                    From on-page optimization and structured data to content clusters and high-authority
                    link acquisition — we build a strategy that compounds, not just ranks.
                  </p>
                  <p>
                    Every month you receive transparent reports showing exactly what moved, what it
                    cost, and what{" "}
                    <span className="text-slate-900 font-semibold">return it generated for your business.</span>
                  </p>
                </div>

              </div>
            </div>

            {/* ── RIGHT FORM ── */}
            <div className="lg:w-2/5 w-full">
              <div
                className="relative p-[2px] rounded-[3rem]"
                style={{
                  background: "linear-gradient(135deg, #FF1F8E, #A855F7, #38BDF8)",
                  boxShadow: "0 20px 60px rgba(236,72,153,0.25)",
                }}
              >
                <div className="rounded-[3rem] backdrop-blur-xl bg-white/90 p-8 md:p-10">
                  <ExpertsForm />
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SeoDev;