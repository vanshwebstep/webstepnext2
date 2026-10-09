"use client";
import React, { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import AnimatedSection from '../AnimatedSection';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from "next/link";
import { fetchContent } from '@/lib/contentApi';
import { assetImage } from "@/lib/assets";
const drTreatCase = assetImage("dr-treat-case.png");
const stillwellHansenWork = assetImage("Stillwell-Hansen-work.png");
const retrievrWork1 = assetImage("Retrievr-work1.png");
const graceMercyWork = assetImage("Grace-Mercy-work.png");

// ── Filter categories ──────────────────────────────────────────────────────────
const CATEGORIES = ["All", "UI & UX", "Shopify", "WordPress", "Front End Dev", "Development", "PHP", "Laravel", "Node.js", "AI"];

// ── Projects data — Webstep Solutions ─────────────────────────────────────────
const ALL_PROJECTS = [
    {
        img: drTreatCase,
        title: "Dr. Treat",
        category: "Healthcare / React.js",
        tags: ["UI & UX", "Development", "Front End Dev"],
        tech: ["React", "Node.js", "Tailwind"],
        desc: "Patient-centric healthcare platform with intuitive UX flows and real-time appointment scheduling.",
        year: "2023",
    },
    {
        img: stillwellHansenWork,
        title: "Stillwell Hansen",
        category: "Infrastructure / Next.js",
        tags: ["Development", "Node.js", "Front End Dev"],
        tech: ["Next.js", "Node.js", "MongoDB"],
        desc: "Large-scale infrastructure project portal with real-time progress tracking and team collaboration.",
        year: "2023",
    },
    {
        img: retrievrWork1,
        title: "Retrievr",
        category: "SaaS / Laravel",
        tags: ["Node.js", "Development", "Laravel", "PHP"],
        tech: ["Laravel", "Vue", "MySQL"],
        desc: "Smart asset-tracking SaaS used by 10,000+ businesses across North America.",
        year: "2022",
    },
    {
        img: graceMercyWork,
        title: "Grace Mercy",
        category: "Non-Profit / WordPress",
        tags: ["UI & UX", "WordPress", "Front End Dev"],
        tech: ["WordPress", "Tailwind"],
        desc: "Emotionally driven web presence for a non-profit — grew online donations by 3×.",
        year: "2022",
    },
];

// ── Tech color map ─────────────────────────────────────────────────────────────
const TECH_COLORS = {
    "React":      "bg-sky-100 text-sky-700",
    "Next.js":    "bg-slate-100 text-slate-700",
    "Vue":        "bg-emerald-100 text-emerald-700",
    "Node.js":    "bg-green-100 text-green-700",
    "PHP":        "bg-indigo-100 text-indigo-700",
    "Laravel":    "bg-red-100 text-red-700",
    "WordPress":  "bg-blue-100 text-blue-700",
    "Shopify":    "bg-lime-100 text-lime-700",
    "Tailwind":   "bg-cyan-100 text-cyan-700",
    "MongoDB":    "bg-green-100 text-green-800",
    "MySQL":      "bg-blue-100 text-blue-700",
    "AWS":        "bg-orange-100 text-orange-700",
    "Figma":      "bg-purple-100 text-purple-700",
    "AI":         "bg-pink-100 text-pink-700",
    "default":    "bg-gray-100 text-gray-600",
};

// ── Stats — Webstep ke real numbers ───────────────────────────────────────────
const STATS = [
    { num: "12+",  label: "Years Experience" },
    { num: "120+", label: "Projects Delivered" },
    { num: "50+", label: "Happy Clients" },
    { num: "98%",  label: "Client Satisfaction" },
    { num: "12+",  label: "Technologies" },
];

const normalizeList = (value, fallback = []) => {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch {
            return value.split(",").map((item) => item.trim()).filter(Boolean);
        }
    }
    return fallback;
};

const normalizeProject = (project, index) => ({
    img: project.img || project.image || ALL_PROJECTS[index % ALL_PROJECTS.length].img,
    title: project.title || `Project ${index + 1}`,
    category: project.category || "Development",
    tags: normalizeList(project.tags, ["Development"]),
    tech: normalizeList(project.tech || project.technologies, ["Web"]),
    desc: project.desc || project.description || "",
    year: String(project.year || new Date().getFullYear()),
});

// ── Filter Bar ─────────────────────────────────────────────────────────────────
const FilterBar = ({ activeFilter, setActiveFilter, categories, projects }) => {
    const counts = categories.reduce((acc, cat) => {
        acc[cat] = cat === "All"
            ? projects.length
            : projects.filter(p => p.tags?.includes(cat)).length;
        return acc;
    }, {});

    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-14">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`
                        group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full
                        text-[10px] sm:text-[12px] font-semibold tracking-wide border
                        transition-all duration-300 overflow-hidden
                        ${activeFilter === cat
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg shadow-purple-300/40 scale-105"
                            : "bg-white/70 backdrop-blur-md text-slate-500 border-purple-100 hover:border-purple-300 hover:text-purple-600 hover:scale-105 hover:shadow-md"
                        }
                    `}
                >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300
                        ${activeFilter === cat ? "bg-white/70" : "bg-purple-300 group-hover:bg-purple-500"}`}
                    />
                    {cat}
                    <span className={`
                        min-w-[16px] sm:min-w-[18px] text-center text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all duration-300
                        ${activeFilter === cat ? "bg-white/25 text-white" : "bg-purple-100 text-purple-500"}
                    `}>
                        {counts[cat]}
                    </span>
                </button>
            ))}
        </div>
    );
};

// ── Project Card ───────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => (
    <AnimatedSection delay={0.08 * (index + 1)} direction="up">
        <div className="group relative rounded-3xl sm:rounded-[2rem] overflow-hidden
            border border-purple-100/60
            bg-white/70 backdrop-blur-md
            shadow-[0_4px_24px_rgba(168,85,247,0.08)]
            transition-all duration-500 h-full
            hover:-translate-y-3 hover:scale-[1.02]
            hover:shadow-[0_28px_64px_rgba(168,85,247,0.22),0_4px_16px_rgba(236,72,153,0.12)]
            hover:border-purple-200/80">

            {/* Image */}
            <div className="overflow-hidden relative aspect-[4/3]">
                <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Year badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10
                    bg-white/90 backdrop-blur-md rounded-full
                    px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-widest uppercase shadow-sm">
                    {project.year}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0
                    bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    flex flex-col justify-end p-4 sm:p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-[#F0ABFC] font-bold text-[9px] sm:text-[10px] capitalize tracking-widest mb-1.5 block">
                            {project.category}
                        </span>
                        <h4 className="text-white text-base sm:text-xl font-black tracking-tight mb-1 sm:mb-2">
                            {project.title}
                        </h4>
                        <p className="text-white/70 text-xs sm:text-[13px] leading-relaxed mb-3 line-clamp-2">
                            {project.desc}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                                {project.tech.slice(0, 2).map((t) => (
                                    <span key={t} className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider
                                        bg-white/20 text-white/90 px-1.5 py-0.5 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 flex items-center justify-center
                                text-slate-900 shadow-lg flex-shrink-0
                                group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-purple-500
                                group-hover:text-white group-hover:rotate-12
                                transition-all duration-300">
                                <FaExternalLinkAlt size={11} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white/90 backdrop-blur-md border-t border-purple-50">
                <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-purple-500 mb-0.5 sm:mb-1">
                    {project.category}
                </p>
                <h4 className="text-slate-900 font-black text-sm sm:text-[16px] tracking-tight mb-2">
                    {project.title}
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {project.tech.map((t) => (
                        <span key={t} className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full ${TECH_COLORS[t] || TECH_COLORS.default}`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </AnimatedSection>
);

// ── Main Work component ────────────────────────────────────────────────────────
const WorkPortfolio = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [categories, setCategories] = useState(CATEGORIES);
    const [projects, setProjects] = useState(ALL_PROJECTS);

    useEffect(() => {
        let mounted = true;

        fetchContent('portfolio', { categories: CATEGORIES, projects: ALL_PROJECTS }).then((data) => {
            if (!mounted) return;
            const nextCategories = data.categories?.length ? data.categories : CATEGORIES;
            const nextProjects = data.projects?.length ? data.projects.map(normalizeProject) : ALL_PROJECTS;
            setCategories(nextCategories);
            setProjects(nextProjects);
            setActiveFilter((current) => nextCategories.includes(current) ? current : "All");
        });

        return () => { mounted = false; };
    }, []);

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.tags?.includes(activeFilter));

    return (
        <section
            className="py-12 sm:py-28 relative z-10 px-4 sm:px-6 font-roboto overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 30%, #f0fdfa 60%, #f7fffe 100%)",
            }}
        >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-50 rounded-full blur-[80px] sm:blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-50 rounded-full blur-[80px] sm:blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-50 rounded-full blur-[80px] sm:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto relative z-10">

                {/* ── Header ── */}
                <AnimatedSection delay={0.1} direction="up" className="text-center mb-10 sm:mb-16">

                    <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl
                        bg-white/50 backdrop-blur-xl border border-white/60
                        text-[#FF1F8E] font-semibold text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.35em] uppercase
                        shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-4 sm:mb-6
                        hover:scale-105 transition-all duration-300 cursor-default">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
                        </span>
                        Our Work &amp; Case Studies
                    </div>

                    <h2 className="relative text-3xl text-slate-900 sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] sm:leading-[0.9] mb-4 sm:mb-6">
                        <span className="block text-slate-900">Real projects, real results —</span>
                        <span
                            className="relative inline-block"
                            style={{
                                background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            12+ years
                            <span className="absolute left-0 -bottom-2 w-full h-[6px] rounded-full
                                bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                                blur-sm opacity-70 animate-pulse" />
                        </span>{" "}
                        of excellence
                    </h2>

                    {/* ── Updated description ── */}
                    <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 max-w-2xl mx-auto">
                        From React & Next.js web apps to WordPress, Shopify, Laravel, and AI-powered
                        solutions — <span className="text-slate-900 font-semibold">Webstep Solutions</span> has
                        delivered 120+ projects that drive real business growth across every major platform.
                    </p>

                    <div className="relative w-20 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mx-auto">
                        <div className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-pink-400 to-cyan-400" />
                    </div>
                </AnimatedSection>

                {/* ── Filter Bar ── */}
                <AnimatedSection delay={0.2} direction="up">
                    <FilterBar
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        categories={categories}
                        projects={projects}
                    />
                </AnimatedSection>

                {/* ── Project Grid ── */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={`${activeFilter}-${project.title}`}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 sm:py-24">
                        <p className="text-slate-400 font-semibold text-sm sm:text-lg">No projects in this category yet.</p>
                        <button
                            onClick={() => setActiveFilter("All")}
                            className="mt-4 text-purple-500 font-semibold text-xs sm:text-sm hover:text-purple-700 transition-colors"
                        >
                            ← View all projects
                        </button>
                    </div>
                )}

                {/* ── Stats Row — Webstep numbers ── */}
                <AnimatedSection delay={0.6} direction="up" className="mt-4 mb-10 sm:mb-14">
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="text-center min-w-[100px]">
                                <p
                                    className="text-2xl sm:text-4xl font-extrabold"
                                    style={{
                                        background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {stat.num}
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* ── CTA ── */}
                <AnimatedSection delay={0.7} direction="up" className="text-center">
                    <Link
                        href="/case-study"
                        className="group relative px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-white text-xs sm:text-base font-semibold overflow-hidden inline-block
                            bg-gradient-to-r from-pink-500 to-purple-500
                            shadow-lg hover:shadow-purple-500/40 hover:shadow-2xl
                            hover:scale-105 transition-all duration-300">
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 50%, #38BDF8 100%)" }} />
                        <span className="relative z-10">View More Case Studies →</span>
                    </Link>
                </AnimatedSection>

            </div>
        </section>
    );
};

export default WorkPortfolio;


