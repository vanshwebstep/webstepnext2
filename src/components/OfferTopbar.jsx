"use client";
import Link from "next/link";
import {
  FaFacebookF, FaInstagram, FaLinkedinIn,
  FaTwitter, FaEnvelope,
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
  // { icon: <FaFacebookF size={11} />, href: "https://facebook.com", hoverColor: "#1877f2", label: "Facebook" },
  // { icon: <FaInstagram size={11} />, href: "https://instagram.com", hoverColor: "#e1306c", label: "Instagram" },
  { icon: <FaLinkedinIn size={11} />, href: "https://www.linkedin.com/company/webstep-solutions/", hoverColor: "#0077b5", label: "LinkedIn" },
  { icon: <FaTwitter size={11} />,   href: "#", hoverColor: "#1da1f2", label: "Twitter" },
];

const SEP = <span style={{ color: "#4b5563", fontSize: "9px", padding: "0 4px" }}>✦</span>;

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
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 flex items-center justify-between h-[36px] sm:h-[40px] gap-2 sm:gap-4">

        {/* ── LEFT: Email + Socials ── */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 min-w-0">

          {/* Email */}
          <a
            href="mailto:support@webstepsolutions.com"
            className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-semibold text-[#f472b6] hover:text-[#f9a8d4] transition-colors text-ellipsis overflow-hidden whitespace-nowrap"
          >
            <FaEnvelope className="text-[10px] sm:text-[11px] shrink-0 text-[#f472b6]" />
            <span className="truncate max-w-[160px] xs:max-w-[210px] sm:max-w-none">
              support@webstepsolutions.com
            </span>
          </a>

          {/* Divider (Tablet / Desktop) */}
          <div className="hidden md:block w-[1px] h-4 bg-[#2d2d35]" />

          {/* Social Icons (Tablet / Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="w-5 h-5 sm:w-[23px] sm:h-[23px] rounded-md flex items-center justify-center text-[#6b7280] bg-[#1c1c24] border border-[#2d2d35] transition-all text-[10px] sm:text-[11px]"
                onMouseEnter={e => {
                  e.currentTarget.style.color = s.hoverColor;
                  e.currentTarget.style.borderColor = s.hoverColor + "60";
                  e.currentTarget.style.background = s.hoverColor + "18";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "#6b7280";
                  e.currentTarget.style.borderColor = "#2d2d35";
                  e.currentTarget.style.background = "#1c1c24";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-4 bg-[#2d2d35]" />
        </div>

       
        {/* ── RIGHT: CTA ── */}
        <div className="shrink-0">
          <Link
            href="/customize-package"
            className="inline-flex items-center bg-gradient-to-r from-[#f43f8e] to-[#a855f7] text-white text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-md sm:rounded-lg shadow-[0_2px_16px_rgba(244,63,142,0.4)] hover:shadow-[0_4px_22px_rgba(244,63,142,0.55)] hover:scale-105 transition-all whitespace-nowrap"
          >
            Grab Deal <span className="ml-1">→</span>
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
          animation: ws-ticker 38s linear infinite;
        }
        .ws-ticker-wrap:hover { animation-play-state: paused; }
        @keyframes ws-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}