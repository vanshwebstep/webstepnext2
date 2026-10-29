"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: "📋",
    content: [
      {
        type: "p",
        text: "At Webstep Solutions, we collect information you provide directly to us when you contact us, request a quote, or engage our services. This includes:",
      },
      {
        type: "list",
        items: [
          "Personal identification information (name, email address, phone number)",
          "Company name and business details",
          "Project requirements and technical specifications",
          "Payment and billing information (processed securely via third-party providers)",
          "Communications and correspondence with our team",
        ],
      },
      {
        type: "p",
        text: "We also automatically collect certain technical information when you visit our website, including IP address, browser type, pages visited, and time spent on our site.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: "⚙️",
    content: [
      {
        type: "p",
        text: "The information we collect is used solely to deliver, improve, and communicate about our services:",
      },
      {
        type: "list",
        items: [
          "To provide web development, design, and digital services you have requested",
          "To respond to your inquiries and provide customer support",
          "To send project updates, invoices, and service-related communications",
          "To improve our website experience and service offerings",
          "To comply with legal obligations and enforce our agreements",
        ],
      },
      {
        type: "p",
        text: "We do not sell, rent, or trade your personal information to any third parties for marketing purposes.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    icon: "🔗",
    content: [
      {
        type: "p",
        text: "We may share your information only in the following limited circumstances:",
      },
      {
        type: "list",
        items: [
          "Service providers who assist in delivering our services (hosting, payment processing, project management tools)",
          "Legal authorities when required by applicable law or court order",
          "Business transfers in the event of a merger, acquisition, or sale of assets",
          "With your explicit consent for any other purpose",
        ],
      },
      {
        type: "p",
        text: "All third-party service providers are contractually obligated to protect your data and use it only for the purposes we specify.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: "🔒",
    content: [
      {
        type: "p",
        text: "Webstep Solutions takes the security of your data seriously. We implement industry-standard security measures including:",
      },
      {
        type: "list",
        items: [
          "SSL/TLS encryption for all data transmission",
          "Secure, access-controlled servers and databases",
          "Regular security audits and vulnerability assessments",
          "Strict internal access controls — only authorised personnel access client data",
          "Secure deletion of data when it is no longer required",
        ],
      },
      {
        type: "p",
        text: "Despite our best efforts, no method of transmission over the internet is 100% secure. We encourage you to contact us immediately if you suspect any unauthorised access to your information.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: "🍪",
    content: [
      {
        type: "p",
        text: "Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how our site is used.",
      },
      {
        type: "list",
        items: [
          "Essential cookies — required for the website to function correctly",
          "Analytics cookies — help us understand visitor behaviour (e.g. Google Analytics)",
          "Preference cookies — remember your settings and preferences",
        ],
      },
      {
        type: "p",
        text: "You can control or disable cookies through your browser settings. Note that disabling cookies may affect some functionality of our website.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: "✅",
    content: [
      {
        type: "p",
        text: "You have the following rights regarding your personal data:",
      },
      {
        type: "list",
        items: [
          "Right to access — request a copy of the personal data we hold about you",
          "Right to rectification — request correction of inaccurate or incomplete data",
          "Right to erasure — request deletion of your personal data",
          "Right to restrict processing — request we limit how we use your data",
          "Right to data portability — receive your data in a structured, machine-readable format",
          "Right to object — object to certain types of processing, including marketing",
        ],
      },
      {
        type: "p",
        text: "To exercise any of these rights, please contact us at info@webstepsolutions.com We will respond within 30 days.",
      },
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: "📁",
    content: [
      {
        type: "p",
        text: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Specifically:",
      },
      {
        type: "list",
        items: [
          "Client project data — retained for 5 years after project completion",
          "Billing and financial records — retained for 7 years (legal requirement)",
          "Marketing communications — until you unsubscribe or request deletion",
          "Website analytics data — retained for 26 months",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: "📬",
    content: [
      {
        type: "p",
        text: "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to us:",
      },
      {
        type: "list",
        items: [
          "Email: info@webstepsolutions.com",
          "Website: webstepsolutions.com/contactus",
          "Response time: Within 2 business days",
        ],
      },
      {
        type: "p",
        text: "We are committed to resolving any privacy concerns promptly and transparently.",
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
              style={{ background: "linear-gradient(135deg, #E879F9, #38BDF8)" }}
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

const PrivacyPolicy = () => {
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
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
              Privacy{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Policy
              </span>
            </h1>

            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed mb-8">
              How Webstep Solutions collects, uses, and protects your personal information.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-slate-200 text-slate-500 text-sm font-semibold shadow-sm">
              📅 Last updated: May 2026
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
                              : "text-slate-500 hover:text-pink-600 hover:bg-pink-50"
                          }`}
                          style={
                            activeSection === s.id
                              ? { background: "linear-gradient(135deg, #E879F9, #A855F7)" }
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
              </aside>

              {/* Main Content */}
              <main className="lg:w-3/4 w-full space-y-6">
                {SECTIONS.map((section, i) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="group p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_rgba(236,72,153,0.1)] transition-all duration-500 scroll-mt-28"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                        style={{ background: "linear-gradient(135deg, #fdf4ff, #eff6ff)" }}
                      >
                        {section.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-pink-400">
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
                        background: "linear-gradient(90deg, rgba(232,121,249,0.3), rgba(56,189,248,0.3), transparent)",
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
                    background: "linear-gradient(135deg, #fdf4ff, #eff6ff)",
                    border: "1px solid rgba(168,85,247,0.15)",
                  }}
                >
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    This privacy policy applies to all services provided by{" "}
                    <span className="font-bold text-slate-700">Webstep Solutions</span>.
                    We may update this policy periodically — continued use of our services
                    constitutes acceptance of any changes.
                  </p>
                  <Link
                    href="/contactus"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm shadow-lg hover:scale-105 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)",
                    }}
                  >
                    Questions? Contact Us →
                  </Link>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;