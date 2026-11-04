"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiCheckCircle, FiLayers, FiShield, FiZap, 
  FiCode, FiCpu, FiPlus, FiMinus, FiArrowRight 
} from 'react-icons/fi';

const INCLUDED_ITEMS = [
  {
    icon: <FiCode className="text-xl text-red-600" />,
    title: "Custom MVC Web Applications",
    desc: "Robust web portals, B2B platforms, and SaaS products built with clean Model-View-Controller patterns following strict PSR coding standards."
  },
  {
    icon: <FiCpu className="text-xl text-orange-600" />,
    title: "RESTful & GraphQL API Infrastructure",
    desc: "High-concurrency API backends with OAuth2/Sanctum authentication, rate limiting, and automated OpenAPI documentation for mobile and web clients."
  },
  {
    icon: <FiZap className="text-xl text-amber-500" />,
    title: "Database Optimization & Eloquent Tuning",
    desc: "Relational schema modeling in MySQL/PostgreSQL, eager loading optimizations, database partitioning, and Redis caching layers for high traffic."
  },
  {
    icon: <FiShield className="text-xl text-emerald-600" />,
    title: "Enterprise RBAC & Security Hardening",
    desc: "Granular Role-Based Access Control, automated CSRF/XSS defenses, SQL injection prevention, and encrypted data storage meeting compliance standards."
  },
  {
    icon: <FiLayers className="text-xl text-purple-600" />,
    title: "Asynchronous Queues & Background Jobs",
    desc: "Event-driven background task processing using Redis and Horizon for email dispatching, webhook processing, PDF generation, and report exports."
  },
  {
    icon: <FiCheckCircle className="text-xl text-blue-600" />,
    title: "Legacy PHP Migration & Upgrades",
    desc: "Modernize legacy procedural PHP or older Laravel versions (Laravel 7/8/9) to Laravel 11 with zero downtime and regression-free unit testing."
  }
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Architecture & Schema Design",
    desc: "We define database entity relationships (ERD), API contracts, data flows, and infrastructure blueprints before writing code."
  },
  {
    step: "02",
    title: "Core Backend Engineering",
    desc: "Engineers build clean migrations, Eloquent models, controllers, and service layers with strict dependency injection."
  },
  {
    step: "03",
    title: "Frontend & API Integration",
    desc: "Pair backend services with modern frontends using Inertia.js, React, Vue, or headless REST API endpoints."
  },
  {
    step: "04",
    title: "Automated QA & Security Testing",
    desc: "PHPUnit/Pest automated tests, penetration tests, queue stress tests, and query efficiency audits."
  },
  {
    step: "05",
    title: "CI/CD & Production Launch",
    desc: "Docker containerization, AWS/Forge deployment pipelines, continuous monitoring, and post-launch support."
  }
];

const LARAVEL_FAQS = [
  {
    q: "Why choose Laravel for custom web applications?",
    a: "Laravel is the industry-standard PHP framework for web applications. It provides elegant syntax, built-in authentication, robust ORM (Eloquent), automated queue processing, and rock-solid security, allowing teams to ship secure products significantly faster."
  },
  {
    q: "Can you upgrade our older Laravel version to the latest Laravel 11?",
    a: "Yes. We have handled migrations from Laravel 5.x, 7.x, 8.x, and 9.x to the latest stable release. We review packages, update deprecated code, and run comprehensive regression tests to ensure zero downtime."
  },
  {
    q: "Can Laravel handle high-traffic enterprise applications?",
    a: "Absolutely. With Redis caching, database read/write replication, Laravel Horizon queue workers, and horizontal auto-scaling on AWS, Laravel routinely powers platforms handling millions of daily requests."
  },
  {
    q: "What frontend technologies do you integrate with Laravel?",
    a: "We frequently build single-page and dynamic web apps pairing Laravel with React, Next.js, Vue 3, Inertia.js, and Livewire, tailored to your application's interactivity and SEO requirements."
  },
  {
    q: "How do you ensure data security in Laravel applications?",
    a: "We adhere to OWASP security practices: parameterized SQL queries, strict CSRF token validation, password hashing via Argon2/Bcrypt, encrypted sessions, and robust Role-Based Access Control (RBAC)."
  }
];

export default function LaravelDetailsSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white font-sans text-slate-800">
      {/* ── WHAT'S INCLUDED ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-bold tracking-[0.25em] text-red-600 uppercase mb-3 block">
              Enterprise Backend Deliverables
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              What Is Included in Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Laravel Development</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
              Engineered with clean architectural patterns, comprehensive automated testing, and scalable database schemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {INCLUDED_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
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
            <span className="text-[11px] font-bold tracking-[0.25em] text-rose-600 uppercase mb-3 block">
              Sprint Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Our 5-Step Laravel <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Engineering Process</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
              Every sprint delivers production-ready code with version control, daily standups, and transparent issue tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 relative flex flex-col justify-between">
                <span className="text-3xl font-black text-red-200 mb-4 block">{step.step}</span>
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
            <span className="text-[11px] font-bold tracking-[0.25em] text-red-600 uppercase mb-3 block">
              Laravel Architecture Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {LARAVEL_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-red-600 transition-colors"
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
          <h3 className="text-2xl sm:text-4xl font-black mb-4">Need Dedicated Laravel Engineers for Your Project?</h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Tell us about your project requirements or API scope. We will evaluate your architecture and provide a detailed roadmap and quote within one business day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contactus"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              Request Free Laravel Scope & Quote
            </Link>
            <Link
              href="/hire-dedicated-developers"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-white/20 transition-all"
            >
              Hire Dedicated Laravel Devs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
