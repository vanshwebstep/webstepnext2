"use client";
import React from 'react';
import ContactForm from '../contactus/ContactForm';
import { FaMapMarkerAlt, FaEnvelope, FaMobile, FaClock, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion } from "framer-motion";

const contactItems = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Global HQ",
    detail: "E-45 Industrial Area Phase-8",
    subDetail: "Mohali, Punjab",
    accent: "bg-[#FF1F8E]/10 text-[#FF1F8E]",
    border: "group-hover:border-[#FF1F8E]/30",
  },
  {
    icon: <FaEnvelope />,
    title: "Contact Us",
    detail: "info@webstepsolutions.com",
    subDetail: "+91 79739-38927",
    accent: "bg-[#FF8E5E]/10 text-[#FF8E5E]",
    border: "group-hover:border-[#FF8E5E]/30",
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    detail: "Mon – Sat: 9:00 AM – 6:00 PM",
    subDetail: "Sun: Closed",
    accent: "bg-[#D400CC]/10 text-[#D400CC]",
    border: "group-hover:border-[#D400CC]/30",
  },
];

const socials = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/webstep-solutions/", label: "LinkedIn" },
];

const FormSection = () => {
  return (
    <section className="relative py-12 sm:py-32 bg-white overflow-hidden font-sans">

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[700px] h-[300px] sm:h-[700px] bg-[#FF1F8E]/5 rounded-full blur-[80px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#D400CC]/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-20">
       
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl
                        bg-white/50 backdrop-blur-xl border border-white/60
                        text-[#FF1F8E] font-semibold text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.35em] uppercase
                        shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-4 sm:mb-6
                        hover:scale-105 transition-all duration-300 cursor-default">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
                        </span>
                        Get In Touch
                    </div>

          <h1
                                className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-4"
                            >
                                Ready to Bring Your{' '}
                                <span style={{
                                    background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}>            Ideas to Life?
                                </span>
                            </h1>


          <p className="text-slate-500 text-xs sm:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Reach out to discuss your project, explore a partnership, or just say hello — we respond fast.
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 rounded-3xl sm:rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.07)] overflow-hidden bg-white">

          {/* ─── LEFT: Info panel ─── */}
          <div className="w-full lg:w-[42%] p-3 sm:p-8 md:p-16 flex flex-col justify-between">

            <div className="relative p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] backdrop-blur-xl bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-pink-700">

              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-3xl sm:rounded-[2.5rem] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(236,72,153,0.15), transparent 40%, rgba(168,85,247,0.15))",
                  maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  padding: "1px"
                }}
              />

              {/* ADDRESS */}
              <div className="flex items-start gap-4 sm:gap-5 mb-5 sm:mb-6 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative shrink-0">
                  <div className="absolute inset-0 bg-pink-500/20 blur-md rounded-2xl"></div>
                  <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center text-pink-600 shadow-md">
                    <FaMapMarkerAlt size={16} />
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-1 sm:mb-2">Our HQ</h4>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    E-45 Industrial Area Phase-8, Mohali, Punjab
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-200 mb-5 sm:mb-6" />

              {/* PHONE */}
              <div className="flex items-start gap-4 sm:gap-5 mb-5 sm:mb-6 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative shrink-0">
                  <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-2xl"></div>
                  <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center text-orange-600 shadow-md">
                    <FaMobile size={16} />
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-1 sm:mb-2">Call Us</h4>
                  <p className="text-slate-500 font-bold text-xs sm:text-sm">
                    +91 79739-38927
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-200 mb-5 sm:mb-6" />

              {/* EMAIL */}
              <div className="flex items-start gap-4 sm:gap-5 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative shrink-0">
                  <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-2xl"></div>
                  <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center text-blue-600 shadow-md">
                    <FaEnvelope size={16} />
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-1 sm:mb-2">Email</h4>
                  <p className="text-slate-500 text-xs sm:text-sm break-all sm:break-normal">
                    info@webstepsolutions.com
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative rounded-3xl sm:rounded-[28px] p-5 sm:p-10 mt-6 overflow-hidden cursor-pointer group"
              style={{
                background: "#0a0a0f",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              {/* Glow Orbs */}
              <div className="absolute -top-16 -left-10 w-56 h-56 bg-pink-500/30 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -right-12 w-60 h-60 bg-purple-500/20 blur-[120px] rounded-full" />

              <div className="relative z-10">
                <h3 className="text-white font-extrabold text-xl sm:text-[28px] leading-tight mb-3">
                  Ready for <br />
                  <span className="bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
                    global impact?
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-white/50 mb-5 sm:mb-6">
                  Join businesses scaling worldwide with our software.
                </p>
                <div className="flex gap-3 sm:gap-6 mb-6 sm:mb-7">
                  {[
                    { num: "120+", label: "Businesses" },
                    { num: "15+", label: "Countries" },
                    { num: "98%", label: "Uptime" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex gap-3 sm:gap-6">
                      <div>
                        <div
                          className="text-white font-extrabold text-base sm:text-[22px] leading-none tracking-tight"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {stat.num}
                        </div>
                        <div
                          className="text-[9px] sm:text-[11px] mt-1 tracking-wide"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          {stat.label}
                        </div>
                      </div>
                      {i < 2 && (
                        <div
                          className="self-stretch"
                          style={{
                            width: "0.5px",
                            background: "rgba(255,255,255,0.1)",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white text-xs sm:text-sm font-bold">
                      Start scaling today
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/40">
                      No setup fees
                    </div>
                  </div>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-pink-500/20 border border-pink-400 text-xs sm:text-base">
                    ➜
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ─── RIGHT: Form panel ─── */}
          <div className="w-full lg:w-[58%] p-3 sm:p-8 md:p-16">

            {/* Form header */}
            <div className="relative p-[2px] rounded-3xl sm:rounded-[3rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_20px_60px_rgba(236,72,153,0.25)]">
              <div className="rounded-3xl sm:rounded-[3rem] backdrop-blur-xl bg-white/90 p-4 sm:p-10">
                <div className="mb-6 sm:mb-10">
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
                    <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Send us a Message
                    </span>
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-2">
                    We’ll get back to you within one business day.
                  </p>
                </div>

                {/* Form */}
                <ContactForm light={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
