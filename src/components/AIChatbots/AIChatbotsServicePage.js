"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiCpu,
  FiZap,
  FiCheckCircle,
  FiArrowRight,
  FiTrendingUp,
  FiSend,
  FiGlobe,
  FiClock,
  FiChevronDown,
  FiShield,
  FiUsers,
  FiHeadphones,
  FiMessageCircle,
} from "react-icons/fi";
import TopBadge from "../Common/TopBadge";
import { submitLead } from "@/lib/contentApi";
import { THANK_YOU_ROUTE } from "@/lib/routes";

const CHAT_BENEFITS = [
  {
    icon: FiClock,
    title: "Zero-Second Response Time",
    desc: "Visitors receive instant, context-aware answers to complex product questions 24 hours a day, 365 days a year.",
    tag: "24/7 Available",
  },
  {
    icon: FiTrendingUp,
    title: "Autonomous Lead Qualification",
    desc: "The bot naturally asks qualifying questions (budget, timeline, requirements) and converts casual visitors into scheduled calls.",
    tag: "Higher Conversions",
  },
  {
    icon: FiGlobe,
    title: "95+ Languages Supported",
    desc: "Deliver personalized conversations in Hindi, English, Spanish, Arabic, German, and 90+ other languages automatically.",
    tag: "Global Audience",
  },
  {
    icon: FiShield,
    title: "RAG & Knowledge Guardrails",
    desc: "Trained exclusively on your approved product manuals, help centers, and pricing sheets. Zero false promises or hallucinations.",
    tag: "100% Brand Safe",
  },
  {
    icon: FiHeadphones,
    title: "Seamless Human Handoff",
    desc: "When a customer requests a human agent or enters an enterprise inquiry, the bot smoothly loops in your sales rep via Slack or email.",
    tag: "Omnichannel Sync",
  },
  {
    icon: FiMessageCircle,
    title: "Web, WhatsApp & Instagram Ready",
    desc: "Deploy a single intelligent brain across your Next.js website, WhatsApp Cloud API, Facebook Messenger, and mobile app.",
    tag: "Multi-Platform",
  },
];

const CHAT_PACKAGES = [
  {
    name: "Custom Website Chatbot",
    badge: "Quick Launch",
    desc: "Trained on your website pages and FAQ docs, embedded as a lightweight modern widget.",
    features: [
      "Custom conversational AI widget styled to your brand",
      "Trained on up to 50 URLs / documents via RAG",
      "Instant lead capture with email & Slack notifications",
      "Conversation analytics dashboard & history logs",
      "Setup & deployment within 5 business days",
    ],
    highlight: false,
    ctaText: "Deploy Website Bot",
  },
  {
    name: "Omnichannel Pro Assistant",
    badge: "Most Popular",
    desc: "High-volume AI agent running across your website and WhatsApp Cloud API with CRM sync.",
    features: [
      "Website widget + WhatsApp Business Cloud API integration",
      "Unlimited knowledge base sync with auto-refresh",
      "Bi-directional CRM integration (HubSpot, Salesforce, Zoho)",
      "Calendar appointment booking (Calendly, Cal.com)",
      "Smart sentiment tracking and human agent handover",
      "3 months dedicated prompt engineering & tuning",
    ],
    highlight: true,
    ctaText: "Get Omnichannel Pro",
  },
  {
    name: "Enterprise Support Brain",
    badge: "Bespoke SLA",
    desc: "Autonomous customer service department handling thousands of tickets, API lookups, and account data.",
    features: [
      "Full API actions (look up live order status, change addresses, cancel orders)",
      "Multi-agent architecture with specialized role handoffs",
      "Custom vector database hosting & VPC isolation",
      "Dedicated account manager & 24/7 SLA",
      "Continuous supervised learning & weekly refinement",
    ],
    highlight: false,
    ctaText: "Consult Enterprise Team",
  },
];

const FAQS = [
  {
    q: "How does the AI chatbot know our company’s specific information?",
    a: "We feed your website pages, help center articles, PDF manuals, pricing documents, and internal guidelines into a high-dimensional vector database. When a visitor asks a question, our Retrieval-Augmented Generation (RAG) engine retrieves the exact relevant paragraphs and synthesizes an accurate, conversational reply.",
  },
  {
    q: "Can the bot book appointments or take orders?",
    a: "Yes! We can equip the chatbot with custom function calling / tool use. It can check calendar availability (e.g. Calendly or Google Calendar), verify product stock, calculate quotes, and trigger webhook calls to your backend.",
  },
  {
    q: "Can the chatbot work on WhatsApp as well as our website?",
    a: "Absolutely. We configure official WhatsApp Business Cloud API webhooks so the same intelligent bot answers customer inquiries on WhatsApp, Instagram DM, and your website simultaneously.",
  },
  {
    q: "How do we monitor what the AI chatbot is saying to visitors?",
    a: "You get access to a full conversation log dashboard showing all chats, visitor satisfaction ratings, captured leads, and queries that required human assistance.",
  },
];

export default function AIChatbotsServicePage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(0);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "Website + WhatsApp",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await submitLead({
        source: "ai-chatbots-service-page",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[AI Chatbot Inquiry - Platform: ${form.platform}]\n${form.message}`,
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        platform: "Website + WhatsApp",
        message: "",
      });
      router.push(THANK_YOU_ROUTE);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to submit. Please try again or call us.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-roboto text-slate-900 selection:bg-[#FF1F8E] selection:text-white overflow-hidden">
      {/* ─── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative pt-[130px] sm:pt-[150px] lg:pt-[190px] pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100/60 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-100/60 rounded-full blur-[140px] -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-pink-100 shadow-[0_4px_20px_rgba(255,31,142,0.12)] mb-6 cursor-default"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
                </span>
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase"
                  style={{
                    background: "linear-gradient(135deg, #FF1F8E 0%, #A855F7 60%, #38BDF8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  24/7 Intelligent Support & Sales Agents
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] sm:leading-[1.05]"
              >
                AI Chatbots & Virtual Assistants Built For{" "}
                <span
                  className="relative inline-block"
                  style={{
                    background: "linear-gradient(135deg, #E879F9 0%, #A855F7 45%, #38BDF8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Real Business Results
                  <span className="absolute left-0 -bottom-1.5 h-[5px] w-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-60 blur-xs" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl"
              >
                Deploy tailored, brand-safe conversational agents trained on your documentation,
                products, and pricing. Answer customer queries in under 1 second, capture warm leads,
                and book meetings 24/7 across your website and WhatsApp.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center"
              >
                <a
                  href="#chatbot-consultation"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#FF1F8E] via-[#A855F7] to-[#38BDF8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_16px_36px_rgba(255,31,142,0.28)] hover:shadow-[0_20px_45px_rgba(255,31,142,0.38)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Build My Custom Chatbot</span>
                  <FiArrowRight className="text-base" />
                </a>

                <Link
                  href="/services/ai-powered-websites"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-slate-200 bg-white/80 hover:bg-white hover:border-pink-300 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiCpu className="text-[#FF1F8E]" />
                  <span>Explore AI Websites</span>
                </Link>
              </motion.div>

              {/* KPI Strip */}
              <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FF1F8E]">80%+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Tickets Resolved
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#A855F7]">&lt; 1s</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Response Speed
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-500">24/7</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Lead Capture
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500">95+</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Languages
                  </div>
                </div>
              </div>
            </div>

            {/* Right Chat Demo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-tr from-[#FF1F8E] via-[#A855F7] to-[#38BDF8] shadow-[0_24px_70px_rgba(255,31,142,0.22)]">
                <div className="rounded-[calc(2rem-2px)] bg-slate-950 p-6 sm:p-7 text-white backdrop-blur-2xl">
                  {/* Chat header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF1F8E] to-[#A855F7] flex items-center justify-center text-white">
                        <FiMessageSquare className="text-xl" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-pink-400 flex items-center gap-1.5">
                          <span>WebStep AI Assistant</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <p className="text-xs text-slate-300">Online & Trained on Business Docs</p>
                      </div>
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest bg-pink-500/20 text-pink-300 px-2.5 py-1 rounded-full border border-pink-500/30">
                      Live
                    </span>
                  </div>

                  {/* Chat message bubbles */}
                  <div className="mt-5 space-y-4">
                    {/* Bot bubble */}
                    <div className="flex items-start gap-2.5 max-w-[85%]">
                      <div className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        AI
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-white/10 p-3.5 text-xs text-slate-200 leading-relaxed border border-white/10">
                        Hello! 👋 I can answer any questions regarding our pricing, tech stack, or
                        deployment timeline. How can I help you today?
                      </div>
                    </div>

                    {/* User bubble */}
                    <div className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
                      <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#FF1F8E] to-[#A855F7] p-3.5 text-xs text-white leading-relaxed shadow-md">
                        Can you build a Next.js 15 site with a custom AI chatbot that connects to our
                        Salesforce CRM?
                      </div>
                    </div>

                    {/* Bot reply */}
                    <div className="flex items-start gap-2.5 max-w-[85%]">
                      <div className="w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        AI
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-white/10 p-3.5 text-xs text-slate-200 leading-relaxed border border-white/10">
                        Yes! We specialize in Next.js 15 web development with bi-directional
                        Salesforce webhooks. Every lead qualified by this bot can sync directly into
                        your Salesforce pipeline in real time. Would you like to schedule a 15-minute
                        call with our solutions lead?
                      </div>
                    </div>
                  </div>

                  {/* Simulated Input */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
                    <input
                      disabled
                      placeholder="Type your question..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 outline-none"
                    />
                    <button
                      disabled
                      className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#FF1F8E] to-[#A855F7] text-white flex items-center justify-center shrink-0 text-sm shadow-md"
                    >
                      <FiSend />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6 BENEFITS ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Enterprise Features" />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Why Companies Trust Our AI Assistants
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CHAT_BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF1F8E] group-hover:bg-[#FF1F8E] group-hover:text-white transition-all duration-300 mb-6">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#FF1F8E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#FF1F8E] uppercase tracking-wider">{item.tag}</span>
                    <FiArrowRight className="text-slate-400 group-hover:text-[#FF1F8E] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Straightforward Pricing" />

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              Chatbot Delivery Packages
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {CHAT_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  pkg.highlight
                    ? "bg-white border-2 border-[#FF1F8E] shadow-[0_20px_50px_rgba(255,31,142,0.18)] scale-[1.03]"
                    : "bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-pink-200"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF1F8E] to-[#A855F7] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-extrabold text-slate-900">{pkg.name}</h3>
                    {!pkg.highlight && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{pkg.desc}</p>

                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                      Features Included:
                    </p>
                    <ul className="space-y-3">
                      {pkg.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug"
                        >
                          <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a
                    href="#chatbot-consultation"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                      pkg.highlight
                        ? "bg-gradient-to-r from-[#FF1F8E] to-[#A855F7] text-white shadow-[0_8px_24px_rgba(255,31,142,0.3)] hover:shadow-lg"
                        : "bg-slate-900 text-white hover:bg-[#FF1F8E]"
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQS ────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Common Questions" />

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Chatbot Integration FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border transition-all duration-300 overflow-hidden bg-white"
                  style={{
                    borderColor: isOpen ? "rgba(255,31,142,0.3)" : "#e2e8f0",
                    boxShadow: isOpen ? "0 8px 30px rgba(255,31,142,0.08)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? "text-[#FF1F8E]" : "text-slate-900"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <FiChevronDown
                      className={`text-lg shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#FF1F8E]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── LEAD CONSULTATION FORM ─────────────────────────────────────────── */}
      <section
        id="chatbot-consultation"
        className="py-20 sm:py-28 bg-white border-t border-slate-200/60"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-pink-400">
                  Custom Knowledge-Base Bot
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
                  Deploy a Bot Trained on Your Business
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Provide your website URL or knowledge documents. We&apos;ll set up a working prototype
                  demo so you can see your bot answering questions live.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-emerald-400 text-base" />
                    <span>Free live working prototype demo</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-emerald-400 text-base" />
                    <span>1-line embed code for any website</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-emerald-400 text-base" />
                    <span>Direct Call/WhatsApp: +91 79739-38927</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ananya Patel"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ananya@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Deployment Channel
                  </label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-pink-400"
                  >
                    <option value="Website Widget Only">Website Widget Only</option>
                    <option value="Website + WhatsApp">Website + WhatsApp Business</option>
                    <option value="Omnichannel (Web, WhatsApp, Instagram)">
                      Omnichannel (Web, WhatsApp, Instagram)
                    </option>
                    <option value="Enterprise Internal Support Bot">
                      Enterprise Internal Support Bot
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Website URL or Knowledge Base Details
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide your website link, docs, or the kind of questions you want the bot to answer..."
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400 resize-none"
                  />
                </div>

                {status.message && (
                  <p
                    className={`text-xs font-bold ${
                      status.type === "error" ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-[#FF1F8E] via-[#A855F7] to-[#38BDF8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_12px_30px_rgba(255,31,142,0.3)] hover:opacity-95 transition-all disabled:opacity-60 cursor-pointer"
                >
                  <FiSend />
                  <span>{submitting ? "Submitting..." : "Request Working Prototype Demo"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
