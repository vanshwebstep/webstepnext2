"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: "🤝",
    content: [
      {
        type: "p",
        text: "By engaging Webstep Solutions for any service — including web development, mobile app development, eCommerce solutions, WordPress, Shopify, AI integrations, or digital consultancy — you agree to be bound by these Terms and Conditions.",
      },
      {
        type: "p",
        text: "These terms constitute a legally binding agreement between you (the Client) and Webstep Solutions. If you do not agree to these terms, please do not engage our services.",
      },
    ],
  },
  {
    id: "services",
    title: "Our Services",
    icon: "💻",
    content: [
      {
        type: "p",
        text: "Webstep Solutions provides the following digital services:",
      },
      {
        type: "list",
        items: [
          "Web application development (React.js, Next.js, Vue.js, Node.js)",
          "Backend development (PHP, Laravel, Node.js)",
          "CMS solutions (WordPress, WordPress plugins & themes)",
          "eCommerce development (Shopify themes & apps, WooCommerce)",
          "AI chatbot development and AI integrations",
          "Mobile application development",
          "Tech consultancy and digital strategy",
        ],
      },
      {
        type: "p",
        text: "All services are subject to a separate project agreement or statement of work (SOW) which, together with these terms, governs the engagement.",
      },
    ],
  },
  {
    id: "project-process",
    title: "Project Process & Delivery",
    icon: "🗺️",
    content: [
      {
        type: "p",
        text: "All projects follow our standard delivery process:",
      },
      {
        type: "list",
        items: [
          "Discovery & requirements gathering before any development begins",
          "Written project scope and timeline agreed by both parties",
          "Regular progress updates via agreed communication channels",
          "Client review and feedback at defined milestones",
          "Final delivery and handover upon receipt of outstanding payment",
        ],
      },
      {
        type: "p",
        text: "Webstep Solutions will make reasonable efforts to meet agreed deadlines. Delays caused by late client feedback, scope changes, or factors outside our control will extend delivery timelines accordingly.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    icon: "💳",
    content: [
      {
        type: "p",
        text: "Our standard payment structure is as follows:",
      },
      {
        type: "list",
        items: [
          "50% deposit required before project commencement",
          "Remaining 50% due upon project completion before final delivery",
          "Monthly retainer projects billed at the start of each month",
          "All invoices payable within 14 days of issue",
          "Late payments may incur a 2% monthly interest charge",
        ],
      },
      {
        type: "p",
        text: "All prices are quoted in the agreed currency and are exclusive of applicable taxes unless stated otherwise. Webstep Solutions reserves the right to suspend work on accounts with overdue balances.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: "©️",
    content: [
      {
        type: "p",
        text: "Upon receipt of full payment, the Client receives ownership of all custom code and deliverables created specifically for their project. The following exceptions apply:",
      },
      {
        type: "list",
        items: [
          "Webstep Solutions retains rights to any pre-existing frameworks, libraries, or tools used in the project",
          "Open-source components remain under their respective licenses",
          "Webstep Solutions may display the project in our portfolio unless the Client requests otherwise in writing",
          "Third-party assets (stock photos, fonts, plugins) are subject to their own licensing terms",
        ],
      },
      {
        type: "p",
        text: "The Client warrants that all materials provided to Webstep Solutions (content, images, logos) are owned by or licensed to the Client.",
      },
    ],
  },
  {
    id: "revisions",
    title: "Revisions & Scope Changes",
    icon: "✏️",
    content: [
      {
        type: "p",
        text: "Each project includes a defined number of revision rounds as outlined in the project agreement. The following applies to changes:",
      },
      {
        type: "list",
        items: [
          "Minor revisions (text changes, colour tweaks) are included within agreed revision rounds",
          "Significant changes to scope, features, or design direction will be quoted separately",
          "All scope changes must be agreed in writing before implementation",
          "Additional development work beyond the original scope is billed at our current hourly rate",
        ],
      },
      {
        type: "p",
        text: "We encourage thorough brief and feedback to minimise revision cycles and keep projects on schedule.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    icon: "🔒",
    content: [
      {
        type: "p",
        text: "Both parties agree to maintain strict confidentiality regarding:",
      },
      {
        type: "list",
        items: [
          "Business strategies, trade secrets, and proprietary information shared during the engagement",
          "Technical specifications, architecture decisions, and unreleased product details",
          "Financial terms, pricing, and contractual arrangements",
          "Any information explicitly marked as confidential by either party",
        ],
      },
      {
        type: "p",
        text: "Confidentiality obligations survive the termination of any project agreement for a period of 3 years.",
      },
    ],
  },
  {
    id: "warranties",
    title: "Warranties & Liability",
    icon: "🛡️",
    content: [
      {
        type: "p",
        text: "Webstep Solutions warrants that all services will be performed with reasonable skill and care. However:",
      },
      {
        type: "list",
        items: [
          "We do not guarantee uninterrupted or error-free operation of delivered software",
          "We are not liable for issues arising from third-party services, hosting, or platform changes",
          "Our total liability is limited to the total fees paid for the specific project in question",
          "We are not liable for indirect, consequential, or special damages",
        ],
      },
      {
        type: "p",
        text: "We provide a 30-day warranty on delivered work, covering bugs and defects present at the time of delivery. Issues arising from client modifications, third-party updates, or new requirements are not covered.",
      },
    ],
  },
  {
    id: "termination",
    title: "Termination",
    icon: "🚪",
    content: [
      {
        type: "p",
        text: "Either party may terminate a project engagement with 14 days written notice. Upon termination:",
      },
      {
        type: "list",
        items: [
          "The Client pays for all work completed up to the termination date",
          "Webstep Solutions delivers all completed work files upon receipt of final payment",
          "Any deposit paid is non-refundable if the Client terminates without cause",
          "Webstep Solutions will refund proportional amounts if we terminate without cause",
        ],
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    icon: "⚖️",
    content: [
      {
        type: "p",
        text: "These Terms and Conditions are governed by applicable law. Any disputes arising from these terms or related services will first be addressed through good-faith negotiation between both parties.",
      },
      {
        type: "p",
        text: "If resolution cannot be reached through negotiation, disputes will be submitted to binding arbitration before any court proceedings are initiated.",
      },
      {
        type: "p",
        text: "For any questions regarding these terms, please contact us at legal@webstepsolutions.com.",
      },
    ],
  },
];

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #E879F9, #A855F7, #38BDF8)",
        }}
      />
    </div>
  );
};

const ContentBlock = ({ block }) => {
  if (block.type === "p") {
    return (
      <p className="text-slate-600 text-base leading-relaxed mb-4">{block.text}</p>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="space-y-2.5 mb-4">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-600 text-base">
            <span
              className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #A855F7, #38BDF8)" }}
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ReadingProgress />
      <div
        className="min-h-screen font-roboto"
        style={{
          background: "linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 30%, #f0fdfa 60%, #f7fffe 100%)",
        }}
      >
        {/* ── Hero ── */}
        <section className="relative pt-48 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[10px] tracking-[0.3em] uppercase mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
              </span>
              Legal
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.95] mb-6">
              Terms &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #A855F7 0%, #6366f1 40%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Conditions
              </span>
            </h1>

            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed mb-8">
              The terms governing your engagement with Webstep Solutions and our digital services.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-slate-200 text-slate-500 text-sm font-semibold shadow-sm">
                📅 Last updated: May 2025
              </div>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-purple-200 text-purple-600 text-sm font-semibold shadow-sm hover:bg-purple-50 transition-colors"
              >
                🔒 Privacy Policy →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <section className="py-10 px-6 pb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12 items-start">

              {/* Sidebar TOC */}
              <aside className="lg:w-1/4 w-full lg:sticky lg:top-36">
                <div className="p-6 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-5">
                    Contents
                  </p>
                  <ul className="space-y-1">
                    {SECTIONS.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            activeSection === s.id
                              ? "text-white shadow-md"
                              : "text-slate-500 hover:text-purple-600 hover:bg-purple-50"
                          }`}
                          style={
                            activeSection === s.id
                              ? { background: "linear-gradient(135deg, #A855F7, #6366f1)" }
                              : {}
                          }
                        >
                          <span className="text-base">{s.icon}</span>
                          <span className="leading-snug">{s.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick links */}
                <div className="mt-4 p-6 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-4">
                    Quick Links
                  </p>
                  <div className="space-y-2">
                    <Link href="/privacy" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors">
                      🔒 Privacy Policy
                    </Link>
                    <Link href="/contactus" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors">
                      📬 Contact Us
                    </Link>
                    <Link href="/works" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors">
                      💼 Our Work
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="lg:w-3/4 w-full space-y-6">
                {SECTIONS.map((section, i) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="group p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_rgba(168,85,247,0.1)] transition-all duration-500 scroll-mt-28"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                        style={{ background: "linear-gradient(135deg, #ede9fe, #eff6ff)" }}
                      >
                        {section.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-400">
                          Section {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div
                      className="h-px mb-6"
                      style={{
                        background: "linear-gradient(90deg, rgba(168,85,247,0.3), rgba(56,189,248,0.3), transparent)",
                      }}
                    />

                    {section.content.map((block, j) => (
                      <ContentBlock key={j} block={block} />
                    ))}
                  </div>
                ))}

                {/* Footer note */}
                <div
                  className="p-8 rounded-[2rem] text-center"
                  style={{
                    background: "linear-gradient(135deg, #ede9fe, #eff6ff)",
                    border: "1px solid rgba(168,85,247,0.15)",
                  }}
                >
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    By using any service provided by{" "}
                    <span className="font-bold text-slate-700">Webstep Solutions</span>,
                    you acknowledge that you have read, understood, and agree to these
                    Terms and Conditions. These terms may be updated periodically.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      href="/contactus"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm shadow-lg hover:scale-105 transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #A855F7, #6366f1, #38BDF8)",
                      }}
                    >
                      Questions? Contact Us →
                    </Link>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-purple-600 text-sm border border-purple-200 bg-white hover:bg-purple-50 transition-all duration-300"
                    >
                      View Privacy Policy
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsConditions;