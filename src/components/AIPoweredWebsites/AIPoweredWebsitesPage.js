"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiZap,
  FiMessageSquare,
  FiSearch,
  FiCheckCircle,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiLayers,
  FiDatabase,
  FiSliders,
  FiSend,
  FiCode,
  FiClock,
  FiHelpCircle,
  FiChevronDown,
  FiShoppingBag,
  FiBriefcase,
  FiActivity,
  FiLock,
} from "react-icons/fi";
import { Sparkles } from "lucide-react";
import TopBadge from "../Common/TopBadge";
import { submitLead } from "@/lib/contentApi";
import { THANK_YOU_ROUTE } from "@/lib/routes";

// ─── INDUSTRY DEMO DATA FOR LIVE SIMULATOR ────────────────────────────────────
const DEMO_PRESETS = [
  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: FiShoppingBag,
    userQuery: "Show me lightweight running shoes under $120 with high arch support",
    aiResponse:
      "Found 3 matches in live inventory! Recommended: **Velocity Fly Knit ($110)** — weighs only 210g, ergonomic arch support, 4.8★ rated. Would you like to check size 10 availability or apply the 10% first-order discount?",
    badge: "Dynamic Catalog Match",
    metric: "+42% Checkout Conversion",
  },
  {
    id: "saas",
    name: "SaaS & Tech",
    icon: FiLayers,
    userQuery: "Does your Pro tier support custom webhook payloads and SOC-2 compliance?",
    aiResponse:
      "Yes! The Pro Tier includes custom signed webhooks, automated payload retries, and SOC-2 Type II audit logs. I've highlighted the API specification page for you and can arrange a developer sandbox access right now.",
    badge: "Vector RAG Knowledge Base",
    metric: "88% Faster Lead Handoff",
  },
  {
    id: "b2b",
    name: "B2B Agency",
    icon: FiBriefcase,
    userQuery: "We need a Next.js web application with CRM integration ready in 4 weeks. Can you handle this?",
    aiResponse:
      "Absolutely. WebStep builds rapid Next.js 15 apps with HubSpot/Salesforce sync. Based on your 4-week target, our 2-week Sprint Pod model matches your timeline. Would you like our senior tech lead to send a detailed milestone roadmap?",
    badge: "Intelligent Lead Scorer",
    metric: "Instant Proposal Generation",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: FiActivity,
    userQuery: "I'd like to book an appointment with Dr. Sharma for a preventive health checkup this Friday.",
    aiResponse:
      "Dr. Sharma has openings this Friday at 11:30 AM and 3:45 PM. I can hold the 11:30 AM slot for you. Please confirm if you'd like an SMS confirmation sent to your number.",
    badge: "Triage & Auto-Scheduler",
    metric: "24/7 Patient Intake",
  },
];

// ─── CORE CAPABILITIES ────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: FiSearch,
    title: "Semantic Vector RAG Search",
    desc: "Replace clunky keyword searches. Users find exact products, articles, and answers in conversational natural language using vector embeddings.",
    tag: "Pinecone & pgvector",
  },
  {
    icon: FiMessageSquare,
    title: "Autonomous Conversational Chatbots",
    desc: "Embedded custom GPT & Claude assistants trained exclusively on your business data that handle 80%+ customer inquiries and capture qualified leads 24/7.",
    tag: "OpenAI & Claude 3.5",
  },
  {
    icon: FiSliders,
    title: "Dynamic Real-Time Personalization",
    desc: "Websites that intelligently adapt headlines, banners, and product grids based on visitor intent, referral traffic, and behavioral signals.",
    tag: "Contextual AI Engine",
  },
  {
    icon: FiTrendingUp,
    title: "Automated Lead Scoring & CRM Sync",
    desc: "AI assesses visitor intent in real time, scores purchase readiness, and instantly dispatches enriched dossiers to your sales team via Slack and CRM.",
    tag: "HubSpot & Salesforce",
  },
  {
    icon: FiZap,
    title: "Programmatic & Generative SEO",
    desc: "Autonomous page generation, dynamic structured schema markup, and AI-optimized metadata that ranks your site for hundreds of high-value long-tail keywords.",
    tag: "Zero-Lag Next.js SSR",
  },
  {
    icon: FiShield,
    title: "Enterprise Guardrails & Privacy",
    desc: "Built-in prompt-injection firewalls, automatic PII redaction, hallucination verification layers, and GDPR/CCPA compliant data boundaries.",
    tag: "SOC-2 Ready Architecture",
  },
];

// ─── TECH STACK ───────────────────────────────────────────────────────────────
const TECH_STACK = [
  { category: "Frontend & Web", items: ["Next.js 15 App Router", "React 19", "Tailwind CSS", "Framer Motion"] },
  { category: "AI & LLM Engines", items: ["OpenAI GPT-4o", "Anthropic Claude 3.5", "Google Gemini Pro", "Llama 3 Local"] },
  { category: "Vector Databases", items: ["Pinecone", "Supabase pgvector", "Qdrant", "Redis Semantic Cache"] },
  { category: "Frameworks & APIs", items: ["Vercel AI SDK", "LangChain", "LlamaIndex", "FastAPI / Node.js"] },
];

// ─── COMPARISON MATRIX ────────────────────────────────────────────────────────
const COMPARISON = [
  {
    feature: "Search Experience",
    traditional: "Exact keyword matching only (fails on synonyms or typos)",
    aiPowered: "Semantic RAG search understanding user intent in plain English",
  },
  {
    feature: "Visitor Interaction",
    traditional: "Static forms requiring visitors to wait 24–48 hours for replies",
    aiPowered: "Instant 24/7 conversational engagement & real-time answers",
  },
  {
    feature: "Content Relevance",
    traditional: "One-size-fits-all static pages for every visitor",
    aiPowered: "Dynamic real-time personalization based on user journey",
  },
  {
    feature: "Lead Qualification",
    traditional: "Manual sorting through spam and unqualified inquiries",
    aiPowered: "Automated intent scoring and enriched intelligence sent directly to CRM",
  },
  {
    feature: "Support Scalability",
    traditional: "Requires increasing human headcount as traffic grows",
    aiPowered: "Handles 10,000+ simultaneous conversations with zero wait time",
  },
];

// ─── DEVELOPMENT ROADMAP ──────────────────────────────────────────────────────
const ROADMAP = [
  {
    step: "01",
    title: "AI Strategy & Knowledge Architecture",
    desc: "We analyze your website goals, map high-ROI user touchpoints, and organize your company documentation, FAQs, and product catalogs into structured vector embeddings.",
    time: "Days 1–3",
  },
  {
    step: "02",
    title: "Next.js UI/UX & Conversational Prototypes",
    desc: "We design a sleek, accessible, high-conversion interface matching your brand identity, blending interactive conversational widgets seamlessly into the user journey.",
    time: "Days 4–8",
  },
  {
    step: "03",
    title: "LLM Engineering & Guardrails Integration",
    desc: "We connect enterprise AI APIs, engineer tailored prompt chains, configure vector similarity search, and implement strict anti-hallucination guardrails.",
    time: "Days 9–14",
  },
  {
    step: "04",
    title: "Rigorous QA, Latency & Security Testing",
    desc: "Every AI endpoint undergoes latency tuning (under 800ms streaming), cross-browser responsiveness checks, and penetration testing against prompt injection attacks.",
    time: "Days 15–18",
  },
  {
    step: "05",
    title: "Production Launch & Continuous Analytics",
    desc: "Zero-downtime deployment on high-speed CDN edges with real-time analytics monitoring user sentiment, token costs, and lead conversion rates.",
    time: "Days 19+",
  },
];

// ─── PRICING PACKAGES ─────────────────────────────────────────────────────────
const PACKAGES = [
  {
    name: "AI Starter Website",
    badge: "Quick Launch",
    desc: "Ideal for startups and small businesses ready to modernize their web presence with conversational AI.",
    features: [
      "Custom responsive Next.js website (up to 5 pages)",
      "Branded AI Chatbot trained on your company knowledge",
      "Semantic FAQ & natural language search",
      "Automated lead capture with email notifications",
      "Mobile-first responsive design & SEO setup",
      "1 month post-launch technical support",
    ],
    highlight: false,
    ctaText: "Get Starter Proposal",
  },
  {
    name: "AI Business Pro",
    badge: "Most Popular",
    desc: "Comprehensive AI web application for growing businesses requiring dynamic personalization and CRM sync.",
    features: [
      "Custom Next.js 15 web application (up to 12 pages/views)",
      "High-speed RAG vector search (Pinecone / Supabase)",
      "24/7 Lead qualification agent with CRM integration (HubSpot/Slack)",
      "Dynamic content & personalization engine",
      "Advanced streaming UI & voice/audio input support",
      "Full analytics dashboard with query insight logs",
      "3 months dedicated optimization & support",
    ],
    highlight: true,
    ctaText: "Choose Business Pro",
  },
  {
    name: "Enterprise AI Platform",
    badge: "Custom Architecture",
    desc: "Full-scale bespoke AI ecosystem with multi-agent orchestration, complex database connections, and custom SLAs.",
    features: [
      "Enterprise web architecture with unlimited scale",
      "Multi-agent autonomous workflows & ERP connectors",
      "Multi-lingual RAG system across complex document sets",
      "Custom fine-tuned or open-source LLM hosting (on-prem/VPC)",
      "SOC-2 / HIPAA compliance guardrails & audit logging",
      "Dedicated senior solutions architect & 24/7 SLA",
      "Continuous model retraining & vector database maintenance",
    ],
    highlight: false,
    ctaText: "Consult Our Architect",
  },
];

// ─── FAQS ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How does an AI-powered website differ from a traditional website?",
    a: "Traditional websites are static digital brochures where visitors must manually click through pages, read generic copy, and wait for human responses. An AI-powered website acts as an active, intelligent representative: it converses with visitors, searches large catalogs using semantic intent, personalizes content in real time, and qualifies leads autonomously 24 hours a day.",
  },
  {
    q: "Can you upgrade or integrate AI into my existing website without rebuilding?",
    a: "Yes! While we build full Next.js AI platforms from scratch, we can also integrate standalone AI modules (like custom RAG search bars, conversational lead bots, or dynamic recommendation widgets) into your existing WordPress, Shopify, Laravel, or React website with just a few lines of code.",
  },
  {
    q: "How do you prevent the AI from hallucinating or providing incorrect answers?",
    a: "We implement Retrieval-Augmented Generation (RAG) coupled with strict prompt boundaries. The AI is instructed to answer strictly based on your verified knowledge base (docs, pricing sheets, product specifications). If an answer isn't in the verified data, the AI gracefully offers to connect the visitor with your human team rather than guessing.",
  },
  {
    q: "Is our company data and customer conversations kept private and secure?",
    a: "Absolutely. We utilize enterprise API tiers from OpenAI, Anthropic, and Google that legally guarantee your inputs and customer conversations are never used to train public models. Furthermore, we implement automated PII redaction and secure encryption at rest and in transit.",
  },
  {
    q: "What are the ongoing costs of running AI APIs on the website?",
    a: "Modern LLM API costs are surprisingly cost-effective. For typical business traffic (thousands of monthly visitors), API token costs generally range between $10 to $40 per month. We also implement smart caching (Redis semantic cache) so recurring questions cost zero tokens.",
  },
  {
    q: "How long does it take to build an AI-powered website?",
    a: "A standard AI Starter website typically launches within 2 to 3 weeks. A more comprehensive AI Business platform with custom database integration, dynamic personalization, and CRM webhooks usually takes 3 to 5 weeks.",
  },
];

export default function AIPoweredWebsitesPage() {
  const router = useRouter();
  const [activePreset, setActivePreset] = useState(DEMO_PRESETS[0]);
  const [openFaq, setOpenFaq] = useState(0);

  // Lead Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    websiteType: "New AI Website",
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
        source: "ai-powered-websites-page",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[AI Website Inquiry - Type: ${form.websiteType}]\n${form.message}`,
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        websiteType: "New AI Website",
        message: "",
      });
      router.push(THANK_YOU_ROUTE);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to submit. Please try again or call us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-roboto text-slate-900 selection:bg-[#FF1F8E] selection:text-white overflow-hidden">
      {/* ─── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative pt-[130px] sm:pt-[150px] lg:pt-[190px] pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-pink-100/60 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-100/60 rounded-full blur-[140px] -translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-12 lg:gap-16 items-center">
            {/* ── Left Hero Copy ── */}
            <div>
              {/* Top Badge */}
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
                  Next-Gen Web Engineering • AI-Powered
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] sm:leading-[1.05]"
              >
                Transform Your Web Presence With{" "}
                <span
                  className="relative inline-block"
                  style={{
                    background: "linear-gradient(135deg, #E879F9 0%, #A855F7 45%, #38BDF8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI-Powered Websites
                  <span className="absolute left-0 -bottom-1.5 h-[5px] w-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-60 blur-xs" />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl"
              >
                We build ultra-fast, intelligent Next.js websites and web applications infused with
                custom LLM assistants, vector semantic search, automated lead qualification, and
                context-aware personalization. Stop running a static digital flyer — deploy a site that
                actively thinks and converts.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center"
              >
                <a
                  href="#ai-consultation"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#FF1F8E] via-[#A855F7] to-[#38BDF8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_16px_36px_rgba(255,31,142,0.28)] hover:shadow-[0_20px_45px_rgba(255,31,142,0.38)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Build My AI Website</span>
                  <FiArrowRight className="text-base" />
                </a>

                <Link
                  href="/services/ai-automation"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-slate-200 bg-white/80 hover:bg-white hover:border-pink-300 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiZap className="text-[#FF1F8E]" />
                  <span>Explore AI Automation</span>
                </Link>
              </motion.div>

              {/* KPI Metrics Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 sm:mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
              >
                <div>
                  <div
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, #FF1F8E, #A855F7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    3.8x
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Conversion Lift
                  </div>
                </div>

                <div>
                  <div
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, #A855F7, #38BDF8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    &lt; 800ms
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    AI Response Time
                  </div>
                </div>

                <div>
                  <div
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, #FF1F8E, #38BDF8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    24/7
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Autonomous Leads
                  </div>
                </div>

                <div>
                  <div
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, #E879F9, #FF1F8E)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    100%
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Data Privacy Safe
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Right Interactive AI Simulator ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Outer Glow Wrapper */}
              <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-tr from-[#FF1F8E] via-[#A855F7] to-[#38BDF8] shadow-[0_24px_70px_rgba(255,31,142,0.22)]">
                <div className="rounded-[calc(2rem-2px)] bg-slate-950 p-5 sm:p-7 text-white backdrop-blur-2xl">
                  {/* Simulator Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF1F8E] to-[#A855F7] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(255,31,142,0.35)]">
                        <FiCpu className="text-xl animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#FF1F8E] flex items-center gap-1.5">
                          <span>Live AI Feature Simulator</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                        </div>
                        <p className="text-sm font-extrabold text-white">Experience AI In Real Time</p>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-widest bg-white/10 text-slate-300 px-3 py-1 rounded-full border border-white/10">
                      Next.js 15
                    </span>
                  </div>

                  {/* Industry Tab Selectors */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DEMO_PRESETS.map((preset) => {
                      const Icon = preset.icon;
                      const isActive = activePreset.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => setActivePreset(preset)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-[#FF1F8E] to-[#A855F7] text-white shadow-md shadow-pink-500/20"
                              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Icon className="text-sm shrink-0" />
                          <span className="truncate">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Simulation Display */}
                  <div className="mt-5 space-y-4">
                    {/* User Query Box */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Visitor Query / Intent</span>
                        <span className="text-sky-400">Natural Language</span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium italic">
                        &ldquo;{activePreset.userQuery}&rdquo;
                      </p>
                    </div>

                    {/* AI Processing Arrow */}
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-pink-400 py-0.5">
                      <Sparkles className="animate-spin text-sm" />
                      <span>Synthesizing with Vector RAG & Real-Time Business Data...</span>
                    </div>

                    {/* AI Output Box */}
                    <div className="rounded-xl border border-[#FF1F8E]/30 bg-gradient-to-b from-white/10 to-white/5 p-4 shadow-inner">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-white">WebStep AI Engine Response</span>
                        </div>
                        <span className="text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest">
                          {activePreset.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed font-normal">
                        {activePreset.aiResponse}
                      </p>
                    </div>

                    {/* Simulator Footer Metric */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <FiTrendingUp /> {activePreset.metric}
                      </span>
                      <span className="text-[11px] text-slate-400">Zero Hallucinations Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE CAPABILITIES SECTION ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/60 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Intelligent Architecture" />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              6 Built-In Superpowers of a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF1F8E 0%, #A855F7 60%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WebStep AI Website
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              We go far beyond basic chatbots. We architect cohesive, full-stack intelligence
              directly into your website’s core database, UI components, and backend pipeline.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#FF1F8E] group-hover:bg-[#FF1F8E] group-hover:text-white transition-all duration-300 mb-6">
                      <Icon className="text-2xl" />
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#FF1F8E] transition-colors">
                      {cap.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{cap.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#FF1F8E] uppercase tracking-wider">{cap.tag}</span>
                    <FiArrowRight className="text-slate-400 group-hover:text-[#FF1F8E] group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK & ENGINE STRIP ───────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Battle-Tested Infrastructure" />

          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Modern Tech Stack For Production AI
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              We leverage modern enterprise frameworks ensuring sub-second latencies, strict data
              isolation, and unlimited scalability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STACK.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 hover:border-pink-200 transition-colors"
              >
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF1F8E] mb-4">
                  {group.category}
                </div>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-semibold text-slate-800"
                    >
                      <FiCheckCircle className="text-emerald-500 shrink-0 text-base" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRADITIONAL VS AI-POWERED COMPARISON ────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-pink-400 block mb-3">
              The Evolution of the Web
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Traditional Websites vs.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF1F8E, #A855F7, #38BDF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WebStep AI Websites
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Why leading brands are retiring static pages in favor of responsive, conversational AI
              architecture.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1.4fr] border-b border-white/10 bg-white/5 font-extrabold text-xs uppercase tracking-wider text-slate-300 p-4 sm:p-5">
              <div>Capability</div>
              <div className="text-slate-400 mt-2 md:mt-0">Traditional Website</div>
              <div className="text-[#FF1F8E] mt-2 md:mt-0 flex items-center gap-1.5">
                <Sparkles /> WebStep AI Platform
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {COMPARISON.map((row, i) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1.4fr] p-4 sm:p-5 gap-3 md:gap-4 text-sm"
                >
                  <div className="font-extrabold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F8E]" />
                    {row.feature}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">{row.traditional}</div>
                  <div className="text-pink-200 text-xs sm:text-sm font-medium bg-pink-500/10 p-2.5 rounded-xl border border-pink-500/20">
                    {row.aiPowered}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROADMAP / DEVELOPMENT PROCESS ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Our Execution Methodology" />

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How We Build Your AI Website
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              A transparent, battle-tested 5-step roadmap delivering production-ready AI in 3 to 4
              weeks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {ROADMAP.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-pink-200 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF1F8E] to-[#A855F7] text-white flex items-center justify-center font-extrabold text-lg shadow-[0_6px_20px_rgba(255,31,142,0.25)] shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-start md:self-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#FF1F8E] text-xs font-extrabold uppercase tracking-wider">
                    <FiClock /> {step.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES / PRICING ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Transparent Delivery Packages" />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Tailored AI Website Packages
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Clear deliverables, fixed scopes, and high-velocity turnarounds designed for fast
              ROI.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PACKAGES.map((pkg) => (
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
                      What&apos;s Included:
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
                    href="#ai-consultation"
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

      {/* ─── RELATED AI SERVICES CARDS ───────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF1F8E]">
                Complementary Solutions
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Explore More AI Solutions from WebStep
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                href="/services/ai-automation"
                className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-6 hover:border-pink-300 hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-[#FF1F8E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FiZap className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#FF1F8E] transition-colors">
                    AI Automation & Workflows
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Automate document processing, CRM lead routing, and repetitive operational tasks
                    with custom AI agents.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#FF1F8E]">
                    Learn More <FiArrowRight size={13} />
                  </span>
                </div>
              </Link>

              <Link
                href="/services/ai-chatbots"
                className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-6 hover:border-pink-300 hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#A855F7] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FiMessageSquare className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#FF1F8E] transition-colors">
                    AI Chatbots & Virtual Assistants
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Deploy 24/7 brand-trained conversational agents that handle support tickets and
                    book appointments autonomously.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#FF1F8E]">
                    Learn More <FiArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQS ACCORDION ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50/60 border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Frequently Asked Questions" />

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Got Questions? We Have Answers.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Everything you need to know about transitioning to an AI-powered website.
            </p>
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
        id="ai-consultation"
        className="py-20 sm:py-28 bg-white border-t border-slate-200/60 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-pink-400">
                  Direct Engineering Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
                  Ready to Deploy an{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #FF1F8E, #A855F7, #38BDF8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    AI-Powered Website?
                  </span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Tell us about your current website or new vision. Our AI solutions architects will
                  deliver a tailored tech roadmap, model recommendation, and proposal within 24
                  hours.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-emerald-400 text-base" />
                    <span>Free architectural feasibility review</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-emerald-400 text-base" />
                    <span>No generic bots — tailored brand models</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-emerald-400 text-base" />
                    <span>Direct phone support: +91 79739-38927</span>
                  </div>
                </div>
              </div>

              {/* Consultation Form */}
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
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
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
                      placeholder="rahul@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
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
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Project Type
                  </label>
                  <select
                    value={form.websiteType}
                    onChange={(e) => setForm({ ...form, websiteType: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-pink-400"
                  >
                    <option value="New Next.js AI Website">New Next.js AI Website</option>
                    <option value="Integrate AI Into Existing Website">
                      Integrate AI Into Existing Website
                    </option>
                    <option value="AI E-Commerce Platform">AI E-Commerce Platform</option>
                    <option value="Custom RAG & Enterprise Agent">Custom RAG & Enterprise Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Project Goals / Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your site, intended AI features (e.g. RAG search, recommendation bot), or timeline..."
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20 resize-none"
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
                  <span>{submitting ? "Submitting Inquiry..." : "Submit AI Project Request"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
