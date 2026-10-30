"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Users,
  Briefcase,
  Globe2,
  Headphones,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import { assetImage } from "@/lib/assets";

const upwork = assetImage("upworkBig.png");
const yelp = assetImage("yelp.png");
const google = assetImage("google.png");
const upcity = assetImage("upcity.png");
const clutch = assetImage("clutch.png");

const trustStats = [
  { icon: Users, num: "12+", label: "Years of Experience" },
  { icon: Briefcase, num: "120+", label: "Successful Projects" },
  { icon: Globe2, num: "15+", label: "Countries Served" },
  { icon: ShieldCheck, num: "98%", label: "Client Satisfaction" },
  { icon: Headphones, num: "24/7", label: "Support & Communication" },
];

function StarRow({ color = "text-amber-400", size = "h-4 w-4" }) {
  return (
    <div className={`flex justify-center gap-0.5 ${color}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={size}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.79L10 14.9l-5.21 2.61 1-5.79-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

/** Reveals children with a fade/rise once they scroll into view. */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Counts a numeric prefix up from 0 once visible */
function CountUp({ value, duration = 1200 }) {
  const ref = useRef(null);
  const match = value ? String(value).match(/^([0-9.]+)(.*)$/) : null;
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (target * eased).toFixed(decimals);
            setDisplay(current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [duration, target, suffix, decimals, started]);

  return <span ref={ref}>{target === null ? value : display}</span>;
}

export default function TrustReviewsPage() {
  return (
    <main className="bg-slate-50/50 py-8 sm:py-12 md:py-20 px-3 sm:px-6 lg:px-8 text-slate-950 font-sans">
      {/* Outer Card Wrapper matching Left Image Frame */}
      <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-[32px] border border-slate-200/80 bg-white p-4 sm:p-6 md:p-12 shadow-sm text-center">
        {/* Eyebrow badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-pink-50 border border-pink-200/80 text-[#FF1F8E] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-4 sm:mb-5 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FF1F8E]" />
            <span>TRUST &amp; REVIEWS</span>
          </div>
        </Reveal>

        {/* Main Title & Subtitle */}
        <Reveal delay={80}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
            Trusted by Clients.{" "}
            <span className="bg-gradient-to-r from-[#FF1F8E] via-[#D400CC] to-[#8B5CF6] bg-clip-text text-transparent">
              Proven by Results.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-slate-500 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-normal mb-8 sm:mb-10 leading-relaxed px-2">
            We&apos;re proud to be recognized on leading platforms for delivering high-quality
            solutions and exceptional service.
          </p>
        </Reveal>

        {/* 5 Cards Grid (Responsive Grid on mobile/tablet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch max-w-6xl mx-auto mb-8 sm:mb-10">
          {/* Google Card */}
          <Reveal className="w-full" delay={200}>
            <a href="https://www.google.com/search?q=Webstep+Solutions+Mohali+reviews" target="_blank" rel="noopener noreferrer" className="block h-full">
            <article className="group h-full flex flex-col justify-center items-center relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 gap-4 sm:gap-6">
              <div className="flex flex-col items-center w-full">
                <div className="h-10 flex items-center justify-center mb-2">
                  <Image
                    src={google}
                    alt="Google"
                    width={110}
                    height={36}
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center gap-1.5 mb-2 sm:mb-3">
                  <span className="text-xs font-semibold text-slate-500">Reviews</span>
                  <StarRow color="text-amber-400" size="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-500 mt-1 sm:mt-3">
                <div className="text-2xl sm:text-3xl font-medium text-slate-900 mb-1">
                  4.9/5
                </div>
                From 50+ Reviews
              </div>
            </article>
            </a>
          </Reveal>

          {/* Clutch Card */}
          <Reveal className="w-full" delay={280}>
            <a href="https://clutch.co/profile/webstep-solutions" target="_blank" rel="noopener noreferrer" className="block h-full">
            <article className="group h-full flex flex-col justify-center items-center relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 gap-4 sm:gap-6">
              <div className="flex flex-col items-center w-full">
                <div className="h-10 text-center mb-1">
                  <Image
                    src={clutch}
                    alt="Clutch"
                    width={110}
                    height={36}
                    className="h-7 sm:h-8 w-auto object-contain mx-auto"
                  />
                  <span className="text-[9px] sm:text-[10px] font-bold mt-2 tracking-wider text-slate-400 uppercase block mb-0.5">
                    REVIEWED ON
                  </span>
                </div>
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-500 mt-1 sm:mt-3">
                <div className="mb-2 sm:mb-3">
                  <StarRow color="text-red-500" size="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-slate-900 mb-1">
                  4.9/5
                </div>
                50+ Client Reviews
              </div>
            </article>
            </a>
          </Reveal>

          {/* UpCity Card */}
          <Reveal className="w-full" delay={360}>
            <a href="https://upcity.com/profiles/webstep-solutions" target="_blank" rel="noopener noreferrer" className="block h-full">
            <article className="group h-full flex flex-col justify-center items-center relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 gap-4 sm:gap-6">
              <div className="flex flex-col items-center w-full">
                <div className="h-10 flex items-center justify-center mb-2">
                  <Image
                    src={upcity}
                    alt="UpCity"
                    width={110}
                    height={36}
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-500 mt-1 sm:mt-3">
                <div className="mb-2 sm:mb-3">
                  <StarRow color="text-[#FF7A00]" size="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-slate-900 mb-1">
                  4.9/5
                </div>
                Top Rated Agency
              </div>
            </article>
            </a>
          </Reveal>

          {/* Yelp Card */}
          <Reveal className="w-full" delay={440}>
            <a href="https://www.yelp.com/biz/webstep-solutions" target="_blank" rel="noopener noreferrer" className="block h-full">
            <article className="group h-full flex flex-col justify-center items-center relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 gap-4 sm:gap-6">
              <div className="flex flex-col items-center w-full">
                <div className="h-10 flex items-center justify-center mb-2">
                  <Image
                    src={yelp}
                    alt="Yelp"
                    width={110}
                    height={36}
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="text-xs md:text-sm font-medium text-slate-500 mt-1 sm:mt-3">
                <div className="mb-2 sm:mb-3">
                  <StarRow color="text-red-600" size="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-medium text-slate-900 mb-1">
                  5.0/5
                </div>
                5-Star Business
              </div>
            </article>
            </a>
          </Reveal>

          {/* Upwork - Featured Card */}
          <Reveal className="w-full sm:col-span-2 lg:col-span-1" delay={520}>
            <article className="group relative h-full flex flex-col justify-between items-center rounded-2xl border-2 border-[#FF1F8E] bg-white p-5 sm:p-6 pt-7 text-center shadow-[0_10px_30px_rgba(255,31,142,0.15)] hover:shadow-xl transition-all duration-300 overflow-hidden z-10">
              {/* Top Rated Plus Ribbon Badge */}
              <div className="absolute top-0 right-0 bg-[#FF1F8E] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">
                TOP RATED PLUS
              </div>

              <div className="flex flex-col items-center w-full">
                {/* Upwork logo */}
                <div className="h-9 flex items-center justify-center mb-1.5 mt-1">
                  <Image
                    src={upwork}
                    alt="Upwork"
                    width={120}
                    height={32}
                    className="h-6 sm:h-7 w-auto object-contain"
                  />
                </div>

                {/* Blue Verified Badge */}
                <div className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
                  <span>TOP RATED PLUS</span>
                </div>

                {/* Blue Stars */}
                <div className="mb-2">
                  <StarRow color="text-blue-500" size="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>

                {/* Stats */}
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1">
                  100% Job Success
                </div>
                <div className="space-y-0.5 text-[11px] sm:text-xs font-medium text-slate-500 mb-2">
                  <p>22,000+ Hours Worked</p>
                  <p>120+ Projects Completed</p>
                </div>

                <div className="text-xs sm:text-sm font-extrabold text-blue-600 mb-2">
                  4.9+/5 Rating
                </div>
              </div>

              <a
                href="https://www.upwork.com/agencies/webstep/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 text-xs md:text-sm font-bold text-[#FF1F8E] hover:underline transition-colors pt-2 border-t border-pink-100/60 w-full"
              >
                <span>View Our Upwork Profile</span>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </article>
          </Reveal>
        </div>

        {/* Bottom Stats bar */}
        <Reveal delay={600}>
          <div className="mt-8 sm:mt-10 max-w-6xl mx-auto rounded-2xl border border-pink-100/80 p-4 sm:p-5 md:p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 xl:gap-0 items-center">
              {trustStats.map(({ icon: Icon, num, label }, i) => (
                <div
                  key={label}
                  className={`relative flex items-center justify-center px-2 py-2 ${
                    i === trustStats.length - 1 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    {/* Pink Outline Icon */}
                    <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-[#FF1F8E] shrink-0" strokeWidth={1.5} />

                    {/* Number on line 1, Label on line 2 */}
                    <div className="flex flex-col justify-center">
                      <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-none">
                        <CountUp value={num} />
                      </span>
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 leading-tight mt-1">
                        {label}
                      </span>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  {i < trustStats.length - 1 && (
                    <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-pink-200/60" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footer Note */}
        <Reveal delay={680}>
          <div className="mt-6 sm:mt-8 text-center max-w-2xl mx-auto text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
            <p className="mb-1">
              These reviews reflect our commitment to quality, transparency, and client satisfaction.
            </p>
            <p>
              Click on any platform to{" "}
              <a href="https://www.upwork.com/agencies/webstep/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#FF1F8E] hover:underline">
                view our profile
              </a>{" "}
              and client feedback.
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}