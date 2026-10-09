"use client";
import React from "react";
import Image from "next/image";
import AnimatedSection from "../AnimatedSection";
import { FaStar, FaShieldAlt, FaAward, FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { assetImage } from "@/lib/assets";
const googleReview = assetImage("review-icon1.png");
const clutchReview = assetImage("review-icon3.png");
const upcityReview = assetImage("review-icon2.png");
const yelpReview = assetImage("review-icon4.png");


const BlogReview = () => {
    const reviews = [
        { src: googleReview, alt: "Google", label: "Google" },
        { src: clutchReview, alt: "Clutch", label: "Clutch" },
        { src: upcityReview, alt: "UpCity", label: "UpCity" },
        { src: yelpReview, alt: "Yelp", label: "Yelp" },
    ];

    return (
        <section className="hidden relative py-12 sm:py-20 md:py-28 bg-white overflow-hidden">

            {/* 🔥 PREMIUM BACKGROUND */}
            <div className="absolute inset-0">
                <div className="absolute top-[-20%] left-[20%] w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-[#f4f3fa] blur-[100px] sm:blur-[140px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-violet-500/20 blur-[100px] sm:blur-[140px] rounded-full" />

                {/* radial spotlight */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40"></div>
            </div>

            {/* FLOATING ICONS */}
            <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-20 left-[8%] text-pink-300/40 hidden lg:block"
            >
                <FaAward size={70} />
            </motion.div>

            <motion.div
                animate={{ y: [0, 25, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute bottom-20 right-[8%] text-violet-300/40 hidden lg:block"
            >
                <FaShieldAlt size={60} />
                
            </motion.div>

            <div className="container mx-auto px-3 sm:px-6 relative z-10">

                {/* 🔥 GLASS MAIN CARD */}
                <div className="relative rounded-3xl sm:rounded-[3rem] p-5 sm:p-10 md:p-16 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-hidden">

                    {/* gradient border */}
                    <div className="absolute inset-0 rounded-3xl sm:rounded-[3rem] pointer-events-none"
                        style={{
                            background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(168,85,247,0.25), rgba(56,189,248,0.25))",
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            padding: "1px"
                        }}
                    />

                    {/* HEADER */}
                    <AnimatedSection direction="up" className="text-center mb-8 sm:mb-16">

                       
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl 
        bg-white/60 backdrop-blur-xl border border-white/40 
        text-[#FF1F8E] font-semibold text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-6 shadow-lg">

                            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-70"></span>
                                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]"></span>
                            </span>

                            Trusted Globally
                        </div>

                        {/* STARS */}
                        <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                >
                                    <FaStar className="text-orange-400 drop-shadow-lg text-lg sm:text-2xl" />
                                </motion.div>
                            ))}
                        </div>

                        {/* TITLE */}
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto">
                            Top-Rated{" "}
                            <span className="bg-gradient-to-r from-pink-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                                Digital Agency
                            </span>
                        </h2>

                        {/* SUBTEXT */}
                        <p className="mt-3 sm:mt-6 text-slate-500 text-xs sm:text-lg">
                            4.9 average rating from 50+ verified client reviews
                        </p>

                    </AnimatedSection>

                    {/* 🔥 LOGOS GRID */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                        {reviews.map((item, index) => (
                            <AnimatedSection key={index} delay={index * 0.1} direction="up">

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="group relative"
                                >

                                    {/* glow */}
                                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-500 to-violet-500 blur-2xl opacity-0 group-hover:opacity-20 transition duration-500"></div>

                                    <div className="relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-md flex flex-col items-center justify-center">

                                        <div className="h-8 sm:h-12 w-full relative mb-2 sm:mb-4">
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-contain grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition duration-500"
                                            />
                                        </div>

                                        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 group-hover:text-pink-500 font-bold">
                                            {item.label}
                                        </span>

                                    </div>
                                </motion.div>

                            </AnimatedSection>
                        ))}
                    </div>
                </div>

                {/* 🔥 PREMIUM STATS BAR */}
                <AnimatedSection delay={0.4} className="flex justify-center mt-8 sm:mt-14">
                    <div className="relative px-6 sm:px-10 py-3.5 sm:py-5 rounded-2xl bg-slate-900 text-white flex gap-6 sm:gap-10 shadow-2xl overflow-hidden">

                        {/* glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-xl opacity-40"></div>

                        <div className="relative text-center">
                            <p className="text-lg sm:text-2xl font-black">98%</p>
                            <p className="text-[9px] sm:text-xs text-slate-400 tracking-wider sm:tracking-widest">Satisfaction</p>
                        </div>

                        <div className="relative text-center">
                            <p className="text-lg sm:text-2xl font-black text-pink-400">12+</p>
                            <p className="text-[9px] sm:text-xs text-slate-400 tracking-wider sm:tracking-widest">Years</p>
                        </div>

                        <div className="relative text-center">
                            <p className="text-lg sm:text-2xl font-black text-orange-400">24/7</p>
                            <p className="text-[9px] sm:text-xs text-slate-400 tracking-wider sm:tracking-widest">Support</p>
                        </div>

                    </div>
                </AnimatedSection>

            </div>
        </section>
    );
};

export default BlogReview;