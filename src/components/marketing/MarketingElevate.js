import React from 'react';
import Image from 'next/image';
import AnimatedSection from '../AnimatedSection';
import { FaBullhorn, FaChartLine, FaAd } from 'react-icons/fa';
import Link from 'next/link';
import { assetImage } from "@/lib/assets";
const marketing = assetImage("software.png");

const MarketingElevate = () => {
  return (
    <section className="py-16 md:py-24 pt-40 bg-white relative z-10 px-6 overflow-hidden font-roboto">

      {/* Dot grid — brand pink */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#FF1F8E 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
      />

      <div className="container mx-auto relative z-10">

        {/* Gradient border card */}
        <div
          className="relative p-[2px] rounded-[3rem]"
          style={{
            background: "linear-gradient(135deg, #FF1F8E, #A855F7, #38BDF8)",
            boxShadow: "0 20px 60px rgba(236,72,153,0.2)",
          }}
        >
          <div className="rounded-[3rem] bg-white/95 backdrop-blur-xl p-12 md:p-20 relative overflow-hidden">

            {/* Inner glows */}
            <div
              className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
              style={{ background: "rgba(255,240,247,0.8)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
              style={{ background: "rgba(245,243,255,0.8)" }}
            />

            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">

              {/* ── IMAGE ── */}
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative group">
                  <div
                    className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.3), rgba(168,85,247,0.2))" }}
                  />
                  <div
                    className="relative p-[2px] rounded-3xl"
                    style={{ background: "linear-gradient(135deg, rgba(255,31,142,0.4), rgba(168,85,247,0.4), rgba(56,189,248,0.4))" }}
                  >
                    <div className="bg-white p-6 rounded-3xl shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                      <Image src={marketing} alt="Marketing Experts" className="w-full h-auto max-w-[200px]" />
                    </div>
                  </div>
                  <div
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full opacity-80"
                    style={{ background: "linear-gradient(135deg, #FF1F8E, #A855F7)" }}
                  />
                  <div
                    className="absolute -bottom-3 -left-3 w-5 h-5 rounded-full opacity-60"
                    style={{ background: "linear-gradient(135deg, #A855F7, #38BDF8)" }}
                  />
                </div>
              </div>

              {/* ── CONTENT ── */}
              <div className="lg:w-2/3">
                <AnimatedSection delay={0.1} direction="right">
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
                        Performance Marketing
                      </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-[0.95]">
                      Hire Expert{" "}
                      <span
                        className="relative inline-block"
                        style={{
                          background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Marketing Strategists
                        <span className="absolute left-0 -bottom-2 w-full h-[5px] rounded-full
                          bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                          blur-sm opacity-70 animate-pulse" />
                      </span>
                    </h2>

                    {/* Divider */}
                    <div className="relative w-20 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
                      <div className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-pink-400 to-cyan-400" />
                    </div>

                    <p className="text-slate-600 text-lg leading-relaxed">
                      Our marketing team blends creativity with analytics to build campaigns that
                      consistently outperform benchmarks and grow your revenue predictably.
                    </p>
                  </div>

                  {/* Feature pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 mb-12 gap-4">
                    {[
                      { icon: <FaBullhorn />, label: "Paid Ads" },
                      { icon: <FaChartLine />, label: "Analytics" },
                      { icon: <FaAd />, label: "ROI Focused" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: "rgba(255,255,255,0.7)",
                          borderColor: "rgba(255,31,142,0.15)",
                          boxShadow: "0 4px 16px rgba(168,85,247,0.08)",
                        }}
                      >
                        <div
                          className="text-xl"
                          style={{
                            background: "linear-gradient(135deg, #FF1F8E, #A855F7)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {item.icon}
                        </div>
                        <span className="font-bold text-slate-800 text-xs capitalize tracking-wider">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/customize-package"
                    className="mt-12 px-10 py-5 rounded-2xl text-[11px] font-black capitalize
                      tracking-[0.25em] text-white shadow-lg hover:-translate-y-1
                      hover:shadow-purple-500/40 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #FF79C6 0%, #A855F7 50%)",
                      boxShadow: "0 6px 24px rgba(168,85,247,0.3)",
                    }}
                  >
                    Launch My Campaign
                  </Link>

                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingElevate;