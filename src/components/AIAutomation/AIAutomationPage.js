"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiCpu,
  FiCheckCircle,
  FiArrowRight,
  FiTrendingUp,
  FiLayers,
  FiSend,
  FiFileText,
  FiMail,
  FiDatabase,
  FiClock,
  FiChevronDown,
  FiShield,
  FiActivity,
  FiUsers,
  FiRefreshCw,
  FiGlobe,
} from "react-icons/fi";
import { Sparkles } from "lucide-react";
import TopBadge from "../Common/TopBadge";
import { submitLead } from "@/lib/contentApi";
import { THANK_YOU_ROUTE } from "@/lib/routes";

// ─── INTERACTIVE WORKFLOW PRESETS ─────────────────────────────────────────────
const WORKFLOW_PRESETS = [
  {
    id: "lead-enrichment",
    title: "Inbound Lead Auto-Pilot",
    trigger: "Visitor submits high-intent website form",
    aiStep: "AI enriches company data via LinkedIn/Clearbit & calculates buying score (94/100)",
    action: "Pings sales rep in Slack with bulleted brief & creates deal in HubSpot instantly",
    metric: "0-Second Lead Response Time",
    speed: "Automated in 1.4s",
  },
  {
    id: "document-processing",
    title: "Smart Document & Invoice Parsing",
    trigger: "PDF invoice or agreement uploaded to portal",
    aiStep: "Multi-modal OCR extracts line items, tax IDs, and verifies totals against POs",
    action: "Syncs directly into QuickBooks/ERP and notifies accounting team for 1-click signoff",
    metric: "99.8% Extraction Accuracy",
    speed: "Saved 18 hrs/week",
  },
  {
    id: "customer-support",
    title: "Tier-1 Support & Ticket Triage",
    trigger: "Support email or WhatsApp inquiry received",
    aiStep: "AI classifies sentiment, drafts contextual response from knowledge base",
    action: "Resolves standard queries instantly or routes VIP tickets to senior human rep",
    metric: "78% Deflection Rate",
    speed: "24/7 Zero Wait Time",
  },
  {
    id: "content-pipeline",
    title: "Multi-Channel Content Automation",
    trigger: "New product release or case study published",
    aiStep: "AI crafts tailored LinkedIn posts, email newsletter digests, and social threads",
    action: "Stages drafts in scheduling queue for one-click team review & broadcast",
    metric: "5x Content Velocity",
    speed: "Consistent Brand Voice",
  },
];

// ─── 6 AUTOMATION PILLARS ─────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: FiActivity,
    title: "Autonomous Lead Routing & CRM Sync",
    desc: "Connect your landing pages directly to HubSpot, Salesforce, or Zoho. AI automatically qualifies inbound prospects, writes conversation summaries, and notifies reps on Slack.",
    tag: "Revenue Operations",
  },
  {
    icon: FiFileText,
    title: "Intelligent Document Processing (IDP)",
    desc: "Eliminate manual data entry. Our AI models read unstructured PDFs, invoices, receipts, and contracts, converting them into validated database rows in seconds.",
    tag: "Finance & Legal",
  },
  {
    icon: FiMail,
    title: "AI Email & Communication Autopilot",
    desc: "Sort incoming business emails, draft hyper-personalized follow-ups, and auto-schedule meetings without back-and-forth calendar tag.",
    tag: "Executive Efficiency",
  },
  {
    icon: FiRefreshCw,
    title: "E-Commerce & Inventory Automation",
    desc: "Automated supplier restocking alerts, competitive price scraping & repricing, return authorization bots, and catalog enrichment pipelines.",
    tag: "Retail & Shopify",
  },
  {
    icon: FiDatabase,
    title: "Internal Knowledge Base Sync",
    desc: "Sync Notion, Google Drive, Jira, and Slack into a unified internal vector database so your team finds answers across all company tools instantly.",
    tag: "Enterprise Productivity",
  },
  {
    icon: FiShield,
    title: "Multi-Agent Orchestration (LangGraph)",
    desc: "Deploy cooperating AI agents that collaborate: one researches, another writes, a third validates compliance, and the fourth executes the final action.",
    tag: "Autonomous Systems",
  },
];

// ─── TOOLS & INTEGRATIONS ─────────────────────────────────────────────────────
const INTEGRATIONS = [
  "HubSpot",
  "Salesforce",
  "Slack",
  "Make.com",
  "n8n",
  "Zapier",
  "OpenAI API",
  "Anthropic Claude",
  "Supabase",
  "PostgreSQL",
  "Stripe",
  "QuickBooks",
  "Google Workspace",
  "Notion",
  "Shopify",
  "WhatsApp Cloud API",
];

// ─── AUTOMATION PACKAGES ──────────────────────────────────────────────────────
const AUTOMATION_PACKAGES = [
  {
    name: "Workflow Quick Sprint",
    badge: "Fast ROI",
    desc: "Automate your single biggest operational bottleneck in 7 to 10 days.",
    features: [
      "1 Core High-Impact Workflow automated (e.g. Lead triage or invoice OCR)",
      "Integration across up to 3 business tools (Slack, CRM, Email)",
      "Custom AI prompts & error-handling fallback logic",
      "Interactive testing & employee training walkthrough",
      "30 days monitoring and bug fix warranty",
    ],
    highlight: false,
    ctaText: "Automate Core Workflow",
  },
  {
    name: "Full Operations Autopilot",
    badge: "Most Popular",
    desc: "Complete operational automation suite connecting your website, CRM, and support desks.",
    features: [
      "Up to 5 Interconnected AI Workflows automated",
      "Lead scoring, document parsing, and automated email drafting",
      "Custom vector knowledge base connection",
      "Advanced retry mechanisms and security guardrails",
      "Centralized performance dashboard & alert logging",
      "60 days dedicated maintenance & optimization",
    ],
    highlight: true,
    ctaText: "Scale With Full Autopilot",
  },
  {
    name: "Enterprise Multi-Agent Ecosystem",
    badge: "Custom Scale",
    desc: "Autonomous multi-agent orchestration for enterprise scale with strict compliance and custom VPC hosting.",
    features: [
      "Unlimited custom AI agent workflows & LangGraph pipelines",
      "Bi-directional ERP/CRM custom API connectors",
      "Private on-prem or VPC LLM deployment options",
      "SOC-2 / HIPAA compliance audit trails",
      "Dedicated Solutions Engineer & 24/7 SLA",
      "Quarterly architecture reviews and model upgrades",
    ],
    highlight: false,
    ctaText: "Consult Enterprise Lead",
  },
];

// ─── FAQS ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What tools and software can WebStep connect with AI automation?",
    a: "We connect almost any modern software with an API or webhook. This includes CRMs (HubSpot, Salesforce, Pipedrive), messaging (Slack, WhatsApp, Teams), databases (PostgreSQL, Supabase, Airtable), email providers (Google Workspace, Outlook, SendGrid), and accounting tools (QuickBooks, Xero, Stripe).",
  },
  {
    q: "How reliable are AI workflows? What happens if an AI makes a mistake?",
    a: "We build human-in-the-loop safeguards and deterministic guardrails into every automation. For high-stakes decisions (like paying invoices or contacting enterprise prospects), the AI prepares the draft or data summary and pings a human team member for 1-click confirmation before executing.",
  },
  {
    q: "Do we need to switch or change our existing software stack?",
    a: "No! The magic of modern AI automation is that it sits seamlessly on top of your existing software via APIs and webhooks. Your team continues using Slack, Gmail, and HubSpot exactly as they do now, while AI works silently in the background.",
  },
  {
    q: "How quickly do we see positive ROI from AI automation?",
    a: "Most businesses see positive ROI within the first 30 days. For example, automations that save 15 hours of manual data entry per week typically pay for themselves within weeks in reclaimed employee productivity and faster customer turnaround.",
  },
];

export default function AIAutomationPage() {
  const router = useRouter();
  const [activeWorkflow, setActiveWorkflow] = useState(WORKFLOW_PRESETS[0]);
  const [openFaq, setOpenFaq] = useState(0);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    workflowScope: "Full Operations Autopilot",
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
        source: "ai-automation-page",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[AI Automation Inquiry - Scope: ${form.workflowScope}]\n${form.message}`,
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        workflowScope: "Full Operations Autopilot",
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
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-pink-100/60 rounded-full blur-[140px] -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left Hero */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-purple-100 shadow-[0_4px_20px_rgba(168,85,247,0.12)] mb-6 cursor-default"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A855F7]" />
                </span>
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase"
                  style={{
                    background: "linear-gradient(135deg, #A855F7 0%, #FF1F8E 60%, #38BDF8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Autonomous Business Operations • AI Workflows
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] sm:leading-[1.05]"
              >
                Automate Repetitive Work With{" "}
                <span
                  className="relative inline-block"
                  style={{
                    background: "linear-gradient(135deg, #A855F7 0%, #FF1F8E 50%, #38BDF8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Custom AI Agents
                  <span className="absolute left-0 -bottom-1.5 h-[5px] w-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-60 blur-xs" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl"
              >
                Eliminate manual data entry, streamline lead qualification, and bridge your website
                with autonomous multi-agent pipelines. We engineer reliable AI workflows that execute
                tasks 100x faster with 99.8% precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center"
              >
                <a
                  href="#automation-consultation"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#A855F7] via-[#FF1F8E] to-[#38BDF8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_16px_36px_rgba(168,85,247,0.28)] hover:shadow-[0_20px_45px_rgba(255,31,142,0.38)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Design My AI Automation</span>
                  <FiArrowRight className="text-base" />
                </a>

                <Link
                  href="/services/ai-powered-websites"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-slate-200 bg-white/80 hover:bg-white hover:border-pink-300 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiGlobe className="text-[#FF1F8E]" />
                  <span>View AI Websites</span>
                </Link>
              </motion.div>

              {/* KPI Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 sm:mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#A855F7]">85%</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Hours Saved
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FF1F8E]">100%</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Automated Sync
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-500">&lt; 2s</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Workflow Speed
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500">10x</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                    Output Scale
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Interactive Workflow Visualizer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-tr from-[#A855F7] via-[#FF1F8E] to-[#38BDF8] shadow-[0_24px_70px_rgba(168,85,247,0.22)]">
                <div className="rounded-[calc(2rem-2px)] bg-slate-950 p-6 sm:p-8 text-white backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#A855F7] to-[#FF1F8E] flex items-center justify-center text-white">
                        <FiZap className="text-xl animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#A855F7]">
                          Live Workflow Visualizer
                        </div>
                        <p className="text-sm font-extrabold text-white">Interactive Agent Chain</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                      Active Flow
                    </span>
                  </div>

                  {/* Selector Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {WORKFLOW_PRESETS.map((wf) => (
                      <button
                        key={wf.id}
                        onClick={() => setActiveWorkflow(wf)}
                        className={`text-left p-2.5 rounded-xl text-xs font-bold transition-all ${
                          activeWorkflow.id === wf.id
                            ? "bg-gradient-to-r from-[#A855F7] to-[#FF1F8E] text-white shadow-md shadow-purple-500/20"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate block">{wf.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Workflow Steps Display */}
                  <div className="mt-6 space-y-3 relative">
                    {/* Trigger */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        01
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                          Trigger Event
                        </div>
                        <p className="text-xs text-slate-200 mt-0.5 font-medium">
                          {activeWorkflow.trigger}
                        </p>
                      </div>
                    </div>

                    {/* AI Agent Processing */}
                    <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3.5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        <FiCpu />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                          <span>Autonomous AI Agent Step</span>
                          <Sparkles className="animate-spin text-xs" />
                        </div>
                        <p className="text-xs text-slate-200 mt-0.5 font-medium leading-relaxed">
                          {activeWorkflow.aiStep}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        03
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                          Automated Action & Sync
                        </div>
                        <p className="text-xs text-slate-200 mt-0.5 font-medium">
                          {activeWorkflow.action}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visualizer Footer */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <FiTrendingUp /> {activeWorkflow.metric}
                    </span>
                    <span className="font-semibold text-slate-300">{activeWorkflow.speed}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6 AUTOMATION PILLARS ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="End-to-End Solutions" />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              What We Automate For Your Business
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Transform high-friction, error-prone manual tasks into automated, self-healing
              pipelines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#A855F7] group-hover:bg-[#A855F7] group-hover:text-white transition-all duration-300 mb-6">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#A855F7] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{pillar.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-[#A855F7] uppercase tracking-wider">{pillar.tag}</span>
                    <FiArrowRight className="text-slate-400 group-hover:text-[#A855F7] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATION LOGO BADGES ─────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Universal Connectivity
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              Connects With Every Tool You Use
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {INTEGRATIONS.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:border-pink-300 hover:text-[#FF1F8E] transition-all cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Transparent Delivery Models" />

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              AI Automation Packages
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Fixed pricing and rapid implementation sprints designed for instant operational impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {AUTOMATION_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  pkg.highlight
                    ? "bg-white border-2 border-[#A855F7] shadow-[0_20px_50px_rgba(168,85,247,0.18)] scale-[1.03]"
                    : "bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-200"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#A855F7] to-[#FF1F8E] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
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
                      Deliverables:
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
                    href="#automation-consultation"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                      pkg.highlight
                        ? "bg-gradient-to-r from-[#A855F7] to-[#FF1F8E] text-white shadow-[0_8px_24px_rgba(168,85,247,0.3)] hover:shadow-lg"
                        : "bg-slate-900 text-white hover:bg-[#A855F7]"
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
      <section className="py-20 sm:py-28 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TopBadge text="Common Questions" />

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Automation Clarity & FAQs
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
                    borderColor: isOpen ? "rgba(168,85,247,0.4)" : "#e2e8f0",
                    boxShadow: isOpen ? "0 8px 30px rgba(168,85,247,0.08)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? "text-[#A855F7]" : "text-slate-900"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <FiChevronDown
                      className={`text-lg shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#A855F7]" : "text-slate-400"
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
        id="automation-consultation"
        className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/60"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-purple-400">
                  Custom Automation Audit
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
                  Free Workflow Feasibility Review
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Tell us what repetitive processes cost your team the most time. Our senior
                  automation engineers will map a step-by-step diagram and scope an implementation
                  plan within 24 hours.
                </p>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-purple-400 text-base" />
                    <span>Calculated hours saved & ROI estimation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-purple-400 text-base" />
                    <span>Zero downtime integration with current tools</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-purple-400 text-base" />
                    <span>Direct WhatsApp & Call support: +91 79739-38927</span>
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
                    placeholder="e.g. Vikram Mehta"
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-purple-400"
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
                      placeholder="vikram@company.com"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-purple-400"
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
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Target Automation Scope
                  </label>
                  <select
                    value={form.workflowScope}
                    onChange={(e) => setForm({ ...form, workflowScope: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-purple-400"
                  >
                    <option value="Workflow Quick Sprint">Workflow Quick Sprint (1 Process)</option>
                    <option value="Full Operations Autopilot">Full Operations Autopilot (Multi-Process)</option>
                    <option value="Enterprise Multi-Agent Ecosystem">Enterprise Multi-Agent Ecosystem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Describe Your Bottleneck / Tools Used
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what takes up time (e.g. entering invoices into QuickBooks, following up on leads, syncing HubSpot with Slack)..."
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none focus:border-purple-400 resize-none"
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
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-[#A855F7] via-[#FF1F8E] to-[#38BDF8] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_12px_30px_rgba(168,85,247,0.3)] hover:opacity-95 transition-all disabled:opacity-60 cursor-pointer"
                >
                  <FiSend />
                  <span>{submitting ? "Submitting..." : "Get Free Automation Roadmap"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
