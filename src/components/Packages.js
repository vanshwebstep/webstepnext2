"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPackages, submitPlanInquiry } from "@/lib/contentApi";
import { THANK_YOU_ROUTE } from "@/lib/routes";
import {
  FaCheckCircle, FaPhoneAlt, FaUser, FaChartLine, FaUsers, FaBuilding,
  FaCommentDots, FaLightbulb, FaCrown, FaTimes, FaPaperPlane, FaCode, FaLaptopCode
} from "react-icons/fa";
import { LuClock } from "react-icons/lu";

const storeSelectedPlan = (pkg) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    "selectedPackageInquiry",
    JSON.stringify({
      id: pkg.id || pkg.title,
      title: pkg.title,
      price: pkg.price,
      pricedes: pkg.pricedes,
      features: pkg.events,
    })
  );
};

const ICON_MAP = { starter: FaUser, senior: FaChartLine, team: FaUsers, enterprise: FaBuilding };

const HOURLY_PACKAGES = [
  {
    id: "hourly-junior",
    title: "Junior Developer",
    price: "8",
    symbol: "$",
    pricedes: "/hour",
    badge: "MAX $8 / HR",
    tagline: "Ideal for basic site updates, bug fixes, CSS styling & minor custom tweaks.",
    icon: FaLaptopCode,
    hoursText: "Junior Dev - $8/hr",
    hoursSubtext: "Quick turnaround & minor fixes",
    hoursType: "green",
    events: [
      "HTML5, CSS3 & JavaScript",
      "WordPress & Basic CMS Edits",
      "UI/UX Bug Fixes & Layout Tweaks",
      "Content & Image Asset Updates",
      "Basic Speed & Mobile Responsive Fixes"
    ],
    btnText: "Book Junior Developer",
    btnType: "blue"
  },
  {
    id: "hourly-mid",
    title: "Mid-Level Developer",
    price: "14 - 15",
    symbol: "$",
    pricedes: "/hour",
    badge: "MOST POPULAR HOURLY",
    isPopular: true,
    popularBadge: "MOST POPULAR HOURLY",
    tagline: "Perfect for feature builds, modern frontend/backend dev & API integrations.",
    icon: FaCode,
    hoursText: "Mid-Level Dev - $14-$15/hr",
    hoursSubtext: "Full feature development & APIs",
    hoursType: "pink",
    events: [
      "React.js, Next.js & Node.js Development",
      "PHP, Laravel & Custom Backends",
      "WooCommerce & Shopify Solutions",
      "RESTful API & Database Integration",
      "Custom Component & State Management"
    ],
    btnText: "Book Mid-Level Developer",
    btnType: "pink"
  },
  {
    id: "hourly-senior",
    title: "Senior Developer",
    price: "25",
    symbol: "$",
    pricedes: "/hour",
    badge: "MAX $25 / HR",
    tagline: "Best for complex app architectures, lead dev, cloud optimization & scale.",
    icon: FaCrown,
    hoursText: "Senior Dev - $25/hr",
    hoursSubtext: "System design & Tech Leadership",
    hoursType: "blue",
    events: [
      "Full-Stack Architecture & Systems Design",
      "Advanced Next.js, React, Node.js & Laravel",
      "Cloud Infrastructure & DevOps (AWS/Docker)",
      "Database Optimization & Security Hardening",
      "Technical Leadership & Code Reviews"
    ],
    btnText: "Book Senior Developer",
    btnType: "blue"
  }
];

// pageType: "b2b" | "packages"
const Packages = ({ pageType = "packages" }) => {
  const router = useRouter();
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  // Hourly modal state
  const [hourlyModalPkg, setHourlyModalPkg] = useState(null);
  const [hourlyForm, setHourlyForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submittingHourly, setSubmittingHourly] = useState(false);
  const [hourlyStatus, setHourlyStatus] = useState({ type: "", message: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPackages(pageType, { packages: [], tabs: [] })
      .then((data) => {
        if (data?.packages) setPackagesData(data.packages);
      })
      .finally(() => setLoading(false));
  }, [pageType]);

  // page load hote hi is section pr auto-scroll, taaki sbhi packages first shot mai dikhein
  useEffect(() => {
    if (!loading && packagesData.length > 0 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, packagesData]);

  const openHourlyBooking = (pkg) => {
    storeSelectedPlan(pkg);
    setHourlyModalPkg(pkg);
    setHourlyForm({
      name: "",
      email: "",
      phone: "",
      message: `Hi, I would like to book a ${pkg.title} on an hourly basis (${pkg.symbol}${pkg.price}${pkg.pricedes}). Please contact me with availability.`
    });
    setHourlyStatus({ type: "", message: "" });
  };

  const handleHourlySubmit = async (e) => {
    e.preventDefault();
    if (!hourlyModalPkg) return;

    setSubmittingHourly(true);
    setHourlyStatus({ type: "", message: "" });

    try {
      await submitPlanInquiry({
        package_id: hourlyModalPkg.id,
        package_title: `${hourlyModalPkg.title} (Hourly Basis)`,
        name: hourlyForm.name,
        email: hourlyForm.email,
        phone: hourlyForm.phone,
        message: `[HOURLY DEVELOPER BOOKING REQUEST]\nPackage: ${hourlyModalPkg.title}\nRate: ${hourlyModalPkg.symbol}${hourlyModalPkg.price}${hourlyModalPkg.pricedes}\n\nNotes:\n${hourlyForm.message}`,
      });

      setHourlyStatus({ type: "success", message: "Booking request submitted successfully! Redirecting..." });
      setTimeout(() => {
        setHourlyModalPkg(null);
        router.push(THANK_YOU_ROUTE);
      }, 1200);
    } catch (error) {
      setHourlyStatus({ type: "error", message: error.message || "Failed to submit request. Please try again." });
    } finally {
      setSubmittingHourly(false);
    }
  };

  const modalContent = hourlyModalPkg ? (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-lg border border-pink-100 shadow-2xl overflow-hidden my-auto"
      >
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex justify-between items-center relative">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase bg-pink-500/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Hourly Developer Booking
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Book {hourlyModalPkg.title}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Rate: <span className="font-bold text-pink-400">{hourlyModalPkg.symbol}{hourlyModalPkg.price}{hourlyModalPkg.pricedes}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHourlyModalPkg(null)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleHourlySubmit} className="p-5 sm:p-7 space-y-4 bg-white">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name*</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={hourlyForm.name}
              onChange={(e) => setHourlyForm({ ...hourlyForm, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address*</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={hourlyForm.email}
                onChange={(e) => setHourlyForm({ ...hourlyForm, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number*</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={hourlyForm.phone}
                onChange={(e) => setHourlyForm({ ...hourlyForm, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Requirements & Project Notes</label>
            <textarea
              rows="3"
              placeholder="Describe your project, tech stack needed, and estimated hours..."
              value={hourlyForm.message}
              onChange={(e) => setHourlyForm({ ...hourlyForm, message: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
            />
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              disabled={submittingHourly}
              className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-[#ff0066] to-[#ff0080] hover:from-[#e6005c] hover:to-[#e60073] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <FaPaperPlane className="text-xs" />
              <span>{submittingHourly ? "Submitting Booking Request..." : "Confirm Hourly Booking"}</span>
            </button>

            <Link
              href={`/customize-package?plan=${encodeURIComponent(hourlyModalPkg.title)}`}
              onClick={() => storeSelectedPlan(hourlyModalPkg)}
              className="text-center text-xs text-pink-600 hover:text-pink-700 font-semibold hover:underline"
            >
              Or open full package customizer page &rarr;
            </Link>
          </div>

          {hourlyStatus.message && (
            <p className={`text-xs font-semibold text-center mt-2 ${hourlyStatus.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
              {hourlyStatus.message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  ) : null;

  return (
    <section
      id="packages-section"
      ref={sectionRef}
      className="pt-[140px] md:pt-[190px] pb-12 sm:pb-24 px-3 sm:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <motion.a
            href="https://www.upwork.com/agencies/webstep/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-50 border border-pink-200/80 text-pink-600 text-[10px] sm:text-xs md:text-sm font-bold tracking-wide shadow-sm hover:bg-pink-100 hover:scale-105 transition-all cursor-pointer"
          >
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[9px] sm:text-[10px]">🌸</span>
            <span>TOP RATED PLUS ON UPWORK</span>
            <span className="text-pink-400 font-normal ml-0.5">&gt;</span>
          </motion.a>
        </div>

        <div className="text-center mx-auto mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
            Flexible Hiring Models to{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Scale Your Team
            </span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-base md:text-lg font-medium px-2">
            Hire dedicated developers or teams on a monthly basis. No long-term contracts.
          </p>
        </div>

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 font-semibold text-sm">Loading packages from API...</p>
          </div>
        ) : packagesData.length === 0 ? (
          <div className="py-20 text-center text-slate-500 font-semibold text-base">
            No packages available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch mb-10 sm:mb-14">
            {packagesData.map((pkg, index) => {
              const Icon = (typeof pkg.icon === 'function' ? pkg.icon : null) || ICON_MAP[pkg.id] || FaUser;
              const BtnIcon = (typeof pkg.btnIcon === 'function' ? pkg.btnIcon : null) || FaPhoneAlt;
              const cardKey = pkg.id ? `pkg-${pkg.id}` : `pkg-idx-${index}`;

              return (
                <motion.div
                  key={cardKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between bg-white transition-all duration-300 hover:-translate-y-1 ${
                    pkg.isPopular
                      ? "border-2 border-[#ff0066] shadow-[0_12px_35px_rgba(255,0,102,0.18)] z-10"
                      : "border border-slate-200/90 shadow-md hover:shadow-xl"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff0066] text-white text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase px-3.5 sm:px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      {pkg.popularBadge || "MOST POPULAR"}
                    </div>
                  )}

                  <div className="flex flex-col items-stretch flex-1">
                    <div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex-1 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Icon className="text-lg sm:text-xl" />
                      </div>
                    </div>

                    <div className="text-center flex-1 mb-4 sm:mb-5">
                      <h3 className="text-sm sm:text-base md:text-[17px] font-extrabold text-slate-900 tracking-wide uppercase">
                        {pkg.title}
                      </h3>
                      <p className="text-pink-600 text-xs md:text-sm font-semibold mt-1 max-w-[210px] mx-auto leading-snug">
                        {pkg.tagline || pkg.des}
                      </p>
                    </div>

                    <div className="text-center flex-1 mb-4 sm:mb-5">
                      {pkg.pricedes ? (
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                            {pkg.symbol ? `${pkg.symbol}${pkg.price}` : pkg.price}
                          </span>
                          <span className="text-slate-400 font-medium text-xs sm:text-sm">{pkg.pricedes}</span>
                        </div>
                      ) : (
                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight block py-1">
                          {pkg.symbol ? `${pkg.symbol}${pkg.price}` : pkg.price}
                        </span>
                      )}
                    </div>

                    <ul className="flex-1 space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                      {Array.isArray(pkg.events) && pkg.events.map((event, idx) => {
                        const rawText = typeof event === 'object' && event !== null ? (event.title || event.name || JSON.stringify(event)) : String(event);
                        const eventText = rawText.replace(/^OK\s*[:-]?\s*/i, '');
                        return (
                          <li key={`${cardKey}-evt-${idx}`} className="flex items-start gap-2 sm:gap-2.5 text-xs md:text-sm text-slate-700 font-medium">
                            <FaCheckCircle className="text-pink-500 mt-0.5 shrink-0 text-xs sm:text-sm" />
                            <span>{eventText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/customize-package?plan=${encodeURIComponent(pkg.title)}`}
                      onClick={() => storeSelectedPlan(pkg)}
                      className={`w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                        pkg.btnType === "pink"
                          ? "bg-gradient-to-r from-[#ff0066] to-[#ff0080] hover:from-[#e6005c] hover:to-[#e60073] text-white shadow-[0_8px_20px_rgba(255,0,102,0.35)] hover:shadow-lg"
                          : "bg-[#0a1128] hover:bg-[#152244] text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      <BtnIcon className="text-xs" />
                      <span>{pkg.btnText || 'Book A Call'}</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ─── HOURLY PACKAGES SECTION ────────────────────────────────────────── */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-slate-200/80">
          <div className="text-center mx-auto mb-10 sm:mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-pink-600 text-xs font-extrabold uppercase tracking-wider mb-3">
              <LuClock className="text-pink-500 text-sm" />
              <span>HOURLY DEVELOPER PACKAGES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
              Book Developer on{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Hourly Basis
              </span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-base md:text-lg font-medium px-2">
              Need quick bug fixes, dedicated feature development, or senior tech lead oversight? Hire developers by the hour with full flexibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-16 max-w-6xl mx-auto">
            {HOURLY_PACKAGES.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-white transition-all duration-300 hover:-translate-y-1.5 ${
                    pkg.isPopular
                      ? "border-2 border-[#ff0066] shadow-[0_15px_40px_rgba(255,0,102,0.2)] z-10"
                      : "border border-slate-200/90 shadow-md hover:shadow-2xl"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff0066] text-white text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      {pkg.popularBadge || "MOST POPULAR HOURLY"}
                    </div>
                  )}

                  <div className="flex flex-col items-stretch flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Icon className="text-xl sm:text-2xl" />
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-900 tracking-wide uppercase">
                        {pkg.title}
                      </h3>
                      <p className="text-pink-600 text-xs sm:text-sm font-semibold mt-1 max-w-[240px] mx-auto leading-snug">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="text-center mb-5 bg-slate-50/80 rounded-2xl py-3 border border-slate-100">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                          {pkg.symbol}{pkg.price}
                        </span>
                        <span className="text-slate-500 font-semibold text-xs sm:text-sm">{pkg.pricedes}</span>
                      </div>
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">
                        {pkg.badge}
                      </span>
                    </div>

                    <div className="mb-5">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 text-center">
                        Key Skills & Capabilities
                      </h4>
                      <ul className="space-y-2.5">
                        {pkg.events.map((skill, idx) => (
                          <li key={`hr-skill-${idx}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <FaCheckCircle className="text-pink-500 mt-0.5 shrink-0 text-xs sm:text-sm" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => openHourlyBooking(pkg)}
                      className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                        pkg.btnType === "pink"
                          ? "bg-gradient-to-r from-[#ff0066] to-[#ff0080] hover:from-[#e6005c] hover:to-[#e60073] text-white shadow-[0_8px_25px_rgba(255,0,102,0.35)] hover:shadow-lg"
                          : "bg-[#0a1128] hover:bg-[#152244] text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      <LuClock className="text-sm" />
                      <span>{pkg.btnText}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#fcf7ff] via-[#fff5f9] to-[#fcf7ff] border border-pink-100 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 text-left flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100/80 text-pink-600 flex items-center justify-center shrink-0 text-base sm:text-xl">
              <FaLightbulb />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm md:text-base">Need a different tech stack or role?</h4>
              <p className="text-slate-600 text-[11px] sm:text-xs md:text-sm mt-0.5">
                We provide developers in WordPress, Shopify, Laravel, PHP, React, Node.js and more on hourly or monthly contracts.
              </p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-pink-200/70 shrink-0" />
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 text-left flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100/80 text-pink-600 flex items-center justify-center shrink-0 text-base sm:text-xl">
              <FaCommentDots />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm md:text-base">Let&apos;s build the right team for your project.</h4>
            </div>
          </div>
        </motion.div>
      </div>

      {mounted && createPortal(modalContent, document.body)}
    </section>
  );
};

export default Packages;