"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FiPhone, FiArrowRight } from "react-icons/fi";
import Menu from "./Menu";
import { assetImage } from "@/lib/assets";
const logo = assetImage("logo.png");

const AIChatWidget = dynamic(() => import("./AIChat/AIChatWidget"), {
  ssr: false,
  loading: () => null,
});

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chatReady, setChatReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadChat = () => setChatReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(loadChat, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(loadChat, 1500);
    return () => window.clearTimeout(id);
  }, []);

  // Close menu when screen grows to lg+
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ─── HEADER WRAPPER ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-[36px] sm:top-[40px] left-0 w-full z-[9999] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl py-2 md:py-3 border-b border-slate-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-2xl py-2 md:py-3 border-b border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* ── INNER ROW ─────────────────────────────────────────────────────── */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-5 md:px-6 lg:px-4 xl:px-12 py-3 md:py-0 flex items-center justify-between gap-2 lg:gap-3 xl:gap-8">

          {/* LOGO ──────────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src={logo}
              alt="Webstep Solutions logo"
              width={150}
              className="w-[100px] sm:w-[120px] md:w-[130px] lg:w-[150px] h-auto transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV (lg: 1024px+) ─────────────────────────────────── */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0">
            <Menu scrolled={scrolled} />
          </div>

          {/* RIGHT ACTIONS ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-5 shrink-0">

            {/* Phone — icon+label only on xl+ (hides on lg to save nav space) */}
            <a
              href="tel:+917973938927"
              className="hidden xl:flex items-center gap-2 group"
              aria-label="Call us"
            >
              <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-[#FF1F8E] group-hover:border-[#FF1F8E] transition-all duration-300 shrink-0">
                <FiPhone size={15} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-slate-400">
                  Expert Support
                </span>
                <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#FF1F8E] transition-colors whitespace-nowrap">
                  +91 79739-38927
                </span>
              </div>
            </a>

            {/* CTA Button — visible from lg: */}
            <Link
              href="/customize-package"
              className="relative inline-flex items-center gap-1.5 px-3.5 lg:px-4 xl:px-6 py-2 lg:py-2.5 xl:py-3 rounded-xl bg-slate-900 text-white text-[10px] xl:text-[11px] font-bold tracking-[0.12em] xl:tracking-[0.18em] uppercase overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_24px_rgba(255,31,142,0.3)] whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-[#FF1F8E] opacity-0 group-hover:opacity-100 transition duration-300" />
              <span className="relative z-10 flex items-center gap-1.5">
                Get a Quote
                <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* HAMBURGER (< lg: 1024px) ──────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] border border-slate-200 rounded-xl bg-white shadow-sm transition-all duration-300 hover:border-[#FF1F8E] active:scale-95 shrink-0"
          >
            <span className={`block w-5 h-[2px] bg-slate-900 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[2px] bg-slate-900 transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block w-5 h-[2px] bg-slate-900 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>

        </div>

        {/* MOBILE/TABLET DROPDOWN MENU (< lg) ─────────────────────────── */}
        {menuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white shadow-2xl">
            <div className="px-5 py-8 flex flex-col gap-8 max-h-[80vh] overflow-y-auto">

              {/* Nav Links */}
              <Menu mobile={true} closeMenu={() => setMenuOpen(false)} />

              {/* Contact + CTA */}
              <div className="space-y-4 pt-2">
                {/* Phone row */}
                <a
                  href="tel:+917973938927"
                  className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-[#FF1F8E]/40 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 block mb-0.5">
                      Expert Support
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      +91 79739-38927
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#FF1F8E]/10 flex items-center justify-center text-[#FF1F8E]">
                    <FiPhone size={18} />
                  </div>
                </a>

                {/* CTA */}
                <Link
                  href="/customize-package"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#FF1F8E] text-white font-bold text-[11px] tracking-[0.25em] uppercase shadow-[0_8px_24px_rgba(255,31,142,0.35)] hover:bg-[#e01880] active:scale-[0.98] transition-all"
                >
                  Get a Quote
                  <FiArrowRight />
                </Link>
              </div>

            </div>
          </div>
        )}
      </header>

      {chatReady && <AIChatWidget />}
    </>
  );
};

export default Header;
