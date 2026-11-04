"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiCheckCircle, FiLayers, FiShield, FiZap, 
  FiCode, FiCpu, FiPlus, FiMinus, FiArrowRight 
} from 'react-icons/fi';

const INCLUDED_ITEMS = [
  {
    icon: <FiLayers className="text-xl text-blue-600" />,
    title: "Custom Block Themes (No Bloat)",
    desc: "Hand-coded Gutenberg block themes built strictly from your Figma designs. No bloated visual builders, zero unwanted CSS, ensuring sub-second page loads."
  },
  {
    icon: <FiCode className="text-xl text-cyan-600" />,
    title: "Bespoke Plugin & API Development",
    desc: "Custom plugins engineered to WordPress.org coding standards. We connect external CRMs, ERPs, payment gateways, and proprietary APIs seamlessly."
  },
  {
    icon: <FiZap className="text-xl text-amber-500" />,
    title: "Core Web Vitals & Speed Optimization",
    desc: "Strict performance tuning: server-level caching, WebP/AVIF asset pipelines, database indexing, and CSS/JS minification to hit 95+ PageSpeed scores."
  },
  {
    icon: <FiShield className="text-xl text-emerald-600" />,
    title: "Security Hardening & Enterprise Audit",
    desc: "Two-factor authentication, secure file permissions, automated security firewalls, spam protection, and regular vulnerability audits."
  },
  {
    icon: <FiCpu className="text-xl text-purple-600" />,
    title: "Headless WordPress with Next.js",
    desc: "Decouple WordPress as a backend CMS via WPGraphQL or REST API, pairing it with a high-performance Next.js frontend for top-tier security and speed."
  },
  {
    icon: <FiCheckCircle className="text-xl text-pink-600" />,
    title: "Zero-Downtime Migration & Redirects",
    desc: "Flawless migration of your posts, pages, custom taxonomies, user accounts, and 1:1 301 URL redirects preserving your hard-earned SEO authority."
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    desc: "We analyze your site requirements, plugin dependencies, and database structure to map a clear development blueprint and timeline."
  },
  {
    step: "02",
    title: "Custom Theme Engineering",
    desc: "Pixel-perfect translation of approved designs into semantic, reusable Gutenberg blocks with ACF Pro and modern Tailwind CSS."
  },
  {
    step: "03",
    title: "Custom Functionality & APIs",
    desc: "We develop dedicated plugins for custom workflows, custom post types, and external third-party software integrations."
  },
  {
    step: "04",
    title: "Testing & Performance Tuning",
    desc: "Rigorous cross-browser, mobile responsiveness, accessibility, and Core Web Vitals audits on staging before signoff."
  },
  {
    step: "05",
    title: "Deployment & Team Handover",
    desc: "Seamless production cutover, DNS configuration, Google Search Console sitemap submission, and team CMS training."
  }
];

const WP_FAQS = [
  {
    q: "Do you build custom WordPress themes or use pre-made templates?",
    a: "We hand-code 100% custom WordPress themes tailored directly to your Figma or Adobe XD designs. We avoid heavy multi-purpose pre-made themes (like Divi or Elementor) to guarantee maximum speed, clean markup, and rock-solid security."
  },
  {
    q: "Can you migrate our existing site to WordPress without losing Google rankings?",
    a: "Yes. We perform a complete crawl of your existing URLs and implement exact 1:1 301 redirects, replicate all metadata, and preserve URL structures so you retain all your organic search positions and backlinks."
  },
  {
    q: "How easy is it for non-technical staff to update content?",
    a: "Very easy. We build modular, drag-and-drop Gutenberg blocks using Advanced Custom Fields (ACF Pro). Your marketing team can change text, images, banners, and layout sections without touching any code or breaking site layouts."
  },
  {
    q: "Can you build headless WordPress with a Next.js or React frontend?",
    a: "Absolutely. We specialize in decoupled WordPress architectures, using WordPress as a headless CMS with WPGraphQL or REST API, powered by a fast Next.js frontend deployed on modern edge infrastructure."
  },
  {
    q: "What is your typical project turnaround time?",
    a: "Standard 5 to 10-page custom WordPress websites typically take 2 to 4 weeks. Larger enterprise portals, multi-lingual sites, or complex WooCommerce platforms are scoped individually with clear milestone deliverables."
  }
];

export default function WpDetailsSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white font-sans text-slate-800">
      {/* ── WHAT'S INCLUDED ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-[0.25em] text-blue-600 uppercase mb-3 block">
              Deliverables & Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              What Is Included in Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">WordPress Services</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
              Every WordPress project is built from scratch with clean, semantic code, modular components, and enterprise-grade performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {INCLUDED_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENT PROCESS ─────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-600 uppercase mb-3 block">
              Transparent Execution
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Our 5-Step WordPress <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Development Process</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
              From requirement analysis to launch and handover, we maintain strict code reviews and sprint transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 relative flex flex-col justify-between">
                <span className="text-3xl font-black text-blue-200 mb-4 block">{step.step}</span>
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">{step.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ──────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold tracking-[0.25em] text-blue-600 uppercase mb-3 block">
              WordPress Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {WP_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                      {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                    </span>
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      isOpen ? "pb-6 max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-4xl font-black mb-4">Ready to Build Your High-Performance WordPress Site?</h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Tell us about your project requirements or Figma design. We will review your scope and provide a detailed timeline and quote within one business day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contactus"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              Request Free WordPress Quote
            </Link>
            <Link
              href="/works"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-white/20 transition-all"
            >
              View Our Recent Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
