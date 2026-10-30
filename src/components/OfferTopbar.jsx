"use client";
import React from "react";
import Link from "next/link";
import {
  FaLinkedinIn, FaEnvelope, FaPhoneAlt
} from "react-icons/fa";

const offers = [
  { badge: "Sale",  badgeBg: "#f43f8e",  text: <>Get <strong style={{color:"#f9a8d4"}}>20% OFF</strong> on all Web Development packages — this week only</> },
  { badge: "Free",  badgeBg: "#10b981",  text: <><strong style={{color:"#6ee7b7"}}>Free UI/UX Consultation</strong> with every Full Stack project</> },
  { badge: "Hot",   badgeBg: "#f97316",  text: <>WordPress website starting at <strong style={{color:"#fdba74"}}>₹9,999</strong> only — limited slots!</> },
  { badge: "New",   badgeBg: "#0ea5e9",  text: <>Launch with our <strong style={{color:"#7dd3fc"}}>Startup Bundle</strong> — website + logo + SEO</> },
  { badge: "Sale",  badgeBg: "#a855f7",  text: <><strong style={{color:"#d8b4fe"}}>30% OFF</strong> Shopify store setup — offer ending soon</> },
  { badge: "Free",  badgeBg: "#10b981",  text: <><strong style={{color:"#6ee7b7"}}>3 months free support</strong> with every custom web app</> },
  { badge: "New",   badgeBg: "#0ea5e9",  text: <>AI Chatbot integration starting at <strong style={{color:"#7dd3fc"}}>₹14,999</strong> — book now</> },
];

const socialLinks = [
  { icon: <FaLinkedinIn size={11} />, href: "https://www.linkedin.com/company/webstep-solutions/", hoverColor: "#0077b5", label: "LinkedIn" },
];

const SEP = <span style={{ color: "#4b5563", fontSize: "9px", padding: "0 6px" }}>✦</span>;

export default function OfferTopbar() {
  const doubled = [...offers, ...offers];

  return (
    <div
      className="fixed top-0 left-0 w-full z-[10001] py-1"
      style={{
        background: "linear-gradient(160deg, #110217 0%, #200a2c 30%, #1e0c3a 60%, #1c0a1f 100%)",
        boxShadow: "0 1px 12px rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 flex items-center justify-between h-[36px] sm:h-[40px] gap-2 sm:gap-4">

        {/* ── LEFT: Email + Socials ── */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 min-w-0">
          <a
            href="mailto:info@webstepsolutions.com"
            className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-semibold text-[#f472b6] hover:text-[#f9a8d4] transition-colors text-ellipsis overflow-hidden whitespace-nowrap"
          >
            <FaEnvelope className="text-[10px] sm:text-[11px] shrink-0 text-[#f472b6]" />
            <span className="truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
              info@webstepsolutions.com
            </span>
          </a>

          <div className="hidden md:block w-[1px] h-4 bg-[#2d2d35]" />

          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-md flex items-center justify-center text-[#9ca3af] bg-[#1c1c24] border border-[#2d2d35] transition-all text-[10px] sm:text-[11px] hover:text-[#0077b5] hover:border-[#0077b5]/60 hover:-translate-y-0.5"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="hidden lg:block w-[1px] h-4 bg-[#2d2d35]" />
        </div>

        {/* ── CENTER: Scrolling Offers Ticker (Single clean announcements) ── */}
        <div className="hidden items-center overflow-hidden flex-1 mx-4 max-w-[700px] select-none pointer-events-auto">
          <div className="ws-ticker-wrap flex items-center gap-6">
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-[11px] text-slate-300 shrink-0">
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: item.badgeBg }}
                >
                  {item.badge}
                </span>
                <span>{item.text}</span>
                {SEP}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Direct Phone & Deals Link (NO DUPLICATE 'Get a Quote') ── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="tel:+917973938927"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-bold text-slate-300 hover:text-[#f472b6] transition-colors whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <FaPhoneAlt className="text-[9px] text-[#f472b6]" />
            <span>+91 79739-38927</span>
          </a>

          <Link
            href="/packages"
            className="inline-flex items-center bg-gradient-to-r from-[#f43f8e] to-[#a855f7] text-white text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg shadow-[0_2px_14px_rgba(244,63,142,0.4)] hover:shadow-[0_4px_20px_rgba(244,63,142,0.6)] hover:scale-105 transition-all whitespace-nowrap"
          >
            Explore Deals <span className="ml-1">→</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes ws-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ws-ticker-wrap {
          display: flex;
          width: max-content;
          animation: ws-ticker 36s linear infinite;
        }
        .ws-ticker-wrap:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
