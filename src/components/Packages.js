"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchPackages } from "@/lib/contentApi";
import {
  FaCheckCircle, FaPhoneAlt, FaUser, FaChartLine, FaUsers, FaBuilding,
  FaCommentDots, FaLightbulb,
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

// pageType: "b2b" | "packages"
const Packages = ({ pageType = "packages" }) => {
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPackages(pageType, { packages: [], tabs: [] })
      .then((data) => {
        if (data?.packages) setPackagesData(data.packages);
      })
      .finally(() => setLoading(false));
  }, [pageType]);

  return (
    <section className="pt-[140px] md:pt-[190px] pb-12 sm:pb-24 px-3 sm:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
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

                    <div
                      className={`flex-1 rounded-2xl p-2.5 sm:p-3 text-center mb-5 sm:mb-6 border ${
                        pkg.hoursType === "pink"
                          ? "bg-[#fff0f5] border-pink-100 text-pink-950"
                          : pkg.hoursType === "green"
                          ? "bg-[#ecfdf5] border-emerald-100 text-emerald-950"
                          : "bg-[#edf2fe] border-blue-100 text-blue-950"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm ${
                          pkg.hoursType === "pink" ? "text-pink-900" : pkg.hoursType === "green" ? "text-emerald-900" : "text-blue-900"
                        }`}
                      >
                        <LuClock className={pkg.hoursType === "pink" ? "text-pink-500" : pkg.hoursType === "green" ? "text-emerald-600" : "text-blue-600"} />
                        <span>{pkg.hoursText || `${pkg.price} Plan`}</span>
                      </div>
                      {pkg.hoursSubtext && (
                        <div className={`text-[10px] sm:text-[11px] md:text-xs font-medium mt-0.5 ${
                          pkg.hoursType === "pink" ? "text-pink-600/80" : pkg.hoursType === "green" ? "text-emerald-600/80" : "text-slate-500"
                        }`}>
                          {pkg.hoursSubtext}
                        </div>
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
                We provide developers in WordPress, Shopify, Laravel, PHP, React, Node.js and more.
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
    </section>
  );
};

export default Packages;