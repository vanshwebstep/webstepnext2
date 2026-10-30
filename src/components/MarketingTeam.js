"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { FiInstagram, FiLinkedin, FiTwitter, FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { assetImage } from "@/lib/assets";

const riyaArchitect = assetImage("riya_architect.png");
const amanArchitect = assetImage("aman_architect.png");
const nehaArchitect = assetImage("riya_architect.png");
const vikramArchitect = assetImage("aman_architect.png");
const priyaArchitect = assetImage("riya_architect.png");
const rohanArchitect = assetImage("aman_architect.png");

const team = [
  {
    id: 1, name: "Riya Sharma", role: "Founder & Product Strategist", image: riyaArchitect,
    bio: "Engineers high-performance web applications, translating complex startup ideas into seamless, high-converting digital products.",
    expertise: ["React & Next.js", "Product Architecture"], accent: "#E8A33D", index: "01",
  },
  {
    id: 2, name: "Aman Gupta", role: "Head of Engineering", image: amanArchitect,
    bio: "Leads our development division — every web app, mobile app, and API optimized for speed, security, and global scale.",
    expertise: ["Full-Stack Dev", "Cloud Infra"], accent: "#3E8E7E", index: "02",
  },
  {
    id: 3, name: "Neha Verma", role: "Creative Director", image: nehaArchitect,
    bio: "Shapes brand identity and visual language across every client touchpoint — from pitch deck to pixel-perfect UI.",
    expertise: ["Brand Systems", "Motion Design"], accent: "#D96C6C", index: "03",
  },
  {
    id: 4, name: "Vikram Singh", role: "DevOps & Infrastructure Lead", image: vikramArchitect,
    bio: "Keeps every deployment fast and every server calm — CI/CD pipelines, uptime, and infra security are his daily grind.",
    expertise: ["CI/CD", "AWS & Render"], accent: "#6C7BD9", index: "04",
  },
  {
    id: 5, name: "Priya Nair", role: "QA & Testing Lead", image: priyaArchitect,
    bio: "Catches what everyone else misses — automated test suites, regression checks, and zero-tolerance for shipped bugs.",
    expertise: ["Automation Testing", "QA Strategy"], accent: "#4FA5D9", index: "05",
  },
  {
    id: 6, name: "Rohan Malhotra", role: "Client Success Manager", image: rohanArchitect,
    bio: "The bridge between our team and yours — translates business goals into technical roadmaps clients actually understand.",
    expertise: ["Account Strategy", "Client Ops"], accent: "#8E6CD9", index: "06",
  },
];

const socials = [
  { icon: <FiLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/company/webstep-solutions/" },
];

const TeamCard = ({ member }) => {
  return (
    <div className="group relative shrink-0 w-[280px] sm:w-[300px] rounded-2xl overflow-hidden bg-[#12151C] aspect-[3/4] snap-start">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700 ease-out"
      />

      <div className="absolute top-5 left-5 z-10">
        <span
          className="text-[11px] font-mono font-bold tracking-widest px-2 py-1 rounded-md"
          style={{ color: member.accent, background: "rgba(0,0,0,0.4)" }}
        >
          {member.index}
        </span>
      </div>

      <div
        className="absolute top-0 right-0 w-14 h-14 transition-transform duration-500 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, transparent 50%, ${member.accent} 50.5%)` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2"
          style={{ color: member.accent }}
        >
          {member.role}
        </p>
        <h3 className="text-white text-2xl italic font-serif tracking-tight mb-3 leading-none">
          {member.name}
        </h3>

        <div className="overflow-hidden max-h-0 group-hover:max-h-[160px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <p className="text-white/70 text-[13px] leading-relaxed mb-4 pt-1">
            {member.bio}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.expertise.map((exp, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white/80 border border-white/20"
              >
                {exp}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 text-xs hover:text-white hover:border-white/60 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white z-10 opacity-100 group-hover:opacity-0 transition-all duration-300">
        <FiArrowUpRight size={16} />
      </div>
    </div>
  );
};

const MarketingTeam = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#FAF9F6] overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-slate-400 mb-5">
              <span className="w-6 h-px bg-slate-400" />
              Webstep Core — Staff Directory
            </div>
            <h2 className="text-5xl md:text-6xl font-serif italic text-[#12151C] tracking-tight leading-[1.05]">
              Meet the Team
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-[#12151C] hover:text-white hover:border-[#12151C] transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-[#12151C] hover:text-white hover:border-[#12151C] transition-colors"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingTeam;