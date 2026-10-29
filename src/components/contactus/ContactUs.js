"use client";
import React from 'react'
import ContactForm from './ContactForm'
import { FaMobile, FaMapMarkerAlt, FaGlobe, FaEnvelope } from 'react-icons/fa'
import AnimatedSection from '../AnimatedSection';
import { motion } from "framer-motion";

const ContactUs = () => {
    return (
        <section className="bg-white font-roboto">

            {/* Hero Banner Section */}
            <div className="relative pt-[120px] lg:pt-[140px] pb-12 lg:py-28 overflow-hidden bg-white">

                {/* Subtle Pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#ec4899 0.5px, transparent 0.5px)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* Soft Gradient Glow */}
                <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-pink-400/20 rounded-full blur-[80px] sm:blur-[120px] translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto relative z-10 pt-2 sm:pt-10 px-4 sm:px-6">
                    <AnimatedSection delay={0.1} direction="up">
                        <div className="text-center max-w-3xl mx-auto">

                            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-10 shadow-sm">
                                <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]"></span>
                                </span>
                                Get In Touch
                            </div>

                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[0.98] mb-4"
                            >
                                Contact{" "}
                                <span style={{
                                    background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}>
                                    Webstep Solutions
                                </span>
                            </h1>


                            <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed mb-6">
                                Have a groundbreaking idea? We&apos;re here to turn it into reality. Reach out and let&apos;s start building the future together.
                            </p>

                        </div>
                    </AnimatedSection>
                </div>
            </div>
            <div className="container mx-auto relative z-10 px-3 sm:px-6 -mt-8 lg:-mt-24 pb-12 sm:pb-20">

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">

                    {/* LEFT COLUMN */}
                    <div className="w-full xl:col-span-4 lg:col-span-5 space-y-6">

                        <AnimatedSection delay={0.2} direction="left">

                            {/* GLASS CARD */}
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

                            {/* PREMIUM CTA CARD */}
                            <motion.div
                                whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 120 }}
                                className="relative rounded-3xl sm:rounded-[28px] p-6 sm:p-10 mt-6 overflow-hidden cursor-pointer group"
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

                        </AnimatedSection>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full xl:col-span-8 lg:col-span-7">

                        <AnimatedSection delay={0.3} direction="right">
                            <div className="relative p-[2px] rounded-3xl sm:rounded-[3rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_20px_60px_rgba(236,72,153,0.25)]">
                                <div className="rounded-3xl sm:rounded-[3rem] backdrop-blur-xl bg-white p-5 sm:p-10">
                                    <div className="mb-6 sm:mb-10">
                                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-[1.1]">
                                            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                                Request a Project Quote
                                            </span>
                                        </h2>
                                        <p className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-2">
                                            We’ll get back to you within one business day.
                                        </p>
                                    </div>

                                    <ContactForm />
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                </div>

                {/* MAP SECTION */}
                <div className="mt-8 rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 h-[280px] sm:h-[450px] relative group">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54891.386069539025!2d76.65618091838071!3d30.698388701971332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee906da6f81f%3A0x512998f16ce508d8!2sSahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1712668532890!5m2!1sen!2sin"
                        className="w-full h-full border-0 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                    />

                    {/* LOCATION BADGE */}
                    <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 p-3 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl z-20 flex items-center gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white text-xs sm:text-base">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <span className="block font-bold text-[11px] sm:text-xs text-slate-900">
                                Visit Our Studio
                            </span>
                            <span className="text-[10px] sm:text-xs text-slate-500">
                                Phase 8, Mohali
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ContactUs
