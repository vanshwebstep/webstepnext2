"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── BRAND COLORS (consistent across all services) ────────────────────────────
const BRAND = {
  primary: "#FF1F8E",
  secondary: "#A855F7",
  tertiary: "#38BDF8",
  dark: "#9D1162",
  light: "#FFF0F7",
  lightAlt: "#FAF5FF",
  gradient: "linear-gradient(135deg, #FF1F8E 0%, #A855F7 50%, #38BDF8 100%)",
  gradientBtn: "linear-gradient(135deg, #FF1F8E, #9D1162)",
  gradientText: (from = "#FF1F8E", to = "#A855F7") =>
    `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
  border: "rgba(255,31,142,0.25)",
  glow: (opacity = 0.2) => `rgba(255,31,142,${opacity})`,
  shadow: "0 20px 60px rgba(255,31,142,0.18)",
};

// ─── ALL SERVICES DATA ────────────────────────────────────────────────────────
const ALL_SERVICES = {

  "psd-to-html": {
    id: "01", slug: "psd-to-html", title: "PSD to HTML", subTitle: "Premium Conversion",
    tagline: "Pixel-perfect. Semantically pure. Blazing fast.",
    description: "We transform your layered Photoshop files into high-performance, W3C-validated HTML markup. Every pixel is preserved, every layer respected — crafted with semantic structure that search engines and browsers love.",
    tags: ["Semantic HTML", "W3C Validated", "SEO Ready"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
    stats: [{ value: "200+", label: "PSD Projects" }, { value: "100%", label: "Pixel Accurate" }, { value: "48hr", label: "Avg Delivery" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Pixel-Perfect Precision", desc: "Every margin, padding, and font size translated with exacting accuracy — no approximations.", icon: "◈" },
      { title: "Semantic HTML5 Structure", desc: "Clean markup using proper heading hierarchies, ARIA labels, and accessibility-first patterns.", icon: "⬡" },
      { title: "SEO Optimized Output", desc: "Meta tags, structured data, open graph, and performance optimizations baked in from day one.", icon: "◎" },
      { title: "Responsive by Default", desc: "Mobile-first breakpoints that look stunning on every screen — from 320px to 4K.", icon: "⬢" },
      { title: "Cross-Browser Tested", desc: "Verified on Chrome, Firefox, Safari, and Edge across Windows, macOS, and iOS.", icon: "◉" },
      { title: "Clean, Commented Code", desc: "Well-structured, developer-friendly code your team can maintain and extend.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Send Your PSD", desc: "Upload your layered Photoshop files via our secure portal." },
      { step: "02", title: "Analysis & Scoping", desc: "We review complexity, assets, and define a precise timeline." },
      { step: "03", title: "HTML Conversion", desc: "Our engineers hand-craft every line of markup with care." },
      { step: "04", title: "QA & Review", desc: "Multi-browser testing, validation checks, and refinements." },
      { step: "05", title: "Delivery", desc: "Clean ZIP with all assets, ready to integrate or deploy." },
    ],
    faqs: [
      { q: "Do you support all versions of Photoshop?", a: "Yes — PSD files from CS3 through the latest CC. Smart objects, layer comps, and artboards all supported." },
      { q: "How long does a typical project take?", a: "Most single-page PSDs are delivered within 24–48 hours. Multi-page projects scoped individually." },
      { q: "Will the HTML be mobile responsive?", a: "Absolutely. Every conversion includes mobile-first breakpoints as a standard deliverable." },
      { q: "Do you include CSS animations?", a: "Basic hover states and transitions are included. Complex JS interactions can be added optionally." },
    ],
    relatedServices: [
      { id: "02", title: "Sketch to HTML", subTitle: "Modern Workflow", slug: "sketch-to-html" },
      { id: "03", title: "Email Templates", subTitle: "Responsive Campaigns", slug: "email-templates" },
    ],
  },

  "sketch-to-html": {
    id: "02", slug: "sketch-to-html", title: "Sketch to HTML", subTitle: "Modern Workflow",
    tagline: "From artboard to browser — flawlessly.",
    description: "We meticulously convert your Sketch designs into W3C-validated, fast-loading HTML. Every symbol, style, and component faithfully reproduced with cross-browser precision.",
    tags: ["Cross-browser", "Modern CSS", "Responsive"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>),
    stats: [{ value: "150+", label: "Sketch Projects" }, { value: "98%", label: "W3C Valid" }, { value: "48hr", label: "Avg Turnaround" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Symbol Fidelity", desc: "Sketch symbols and shared styles translated into reusable CSS components.", icon: "◈" },
      { title: "Auto Layout Support", desc: "Sketch auto-layout constraints perfectly mirrored in CSS flexbox & grid.", icon: "⬡" },
      { title: "Prototype Interactions", desc: "Hotspot flows and hover states from your prototype reproduced in HTML/JS.", icon: "◎" },
      { title: "Asset Export Ready", desc: "All icons, images, and SVG assets optimized and exported in modern formats.", icon: "⬢" },
      { title: "CSS Variables", desc: "Your Sketch color palette and text styles become clean CSS custom properties.", icon: "◉" },
      { title: "Figma-Compatible", desc: "Component structure compatible with Figma handoff tools.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Upload Sketch File", desc: "Share your .sketch file via our secure portal." },
      { step: "02", title: "Design Audit", desc: "We inspect symbols, styles, and assets to plan conversion." },
      { step: "03", title: "HTML/CSS Build", desc: "Component-by-component build with modern CSS architecture." },
      { step: "04", title: "Browser Testing", desc: "Cross-browser & cross-device QA." },
      { step: "05", title: "Delivery", desc: "Clean codebase delivered with documentation." },
    ],
    faqs: [
      { q: "Do you support Sketch Cloud files?", a: "Yes, we accept both local .sketch files and Sketch Cloud shared links." },
      { q: "Can you convert Sketch prototypes?", a: "Yes — prototype flows and hover states can be reproduced in HTML/CSS/JS." },
      { q: "Do you also support Figma files?", a: "Yes! Figma, Adobe XD, and Sketch handled with the same precision." },
      { q: "Is the output framework-agnostic?", a: "Yes. Clean HTML/CSS/JS by default, but can also deliver in React or Vue." },
    ],
    relatedServices: [
      { id: "01", title: "PSD to HTML", subTitle: "Premium Conversion", slug: "psd-to-html" },
      { id: "03", title: "Email Templates", subTitle: "Responsive Campaigns", slug: "email-templates" },
    ],
  },

  "email-templates": {
    id: "03", slug: "email-templates", title: "Email Templates", subTitle: "Responsive Campaigns",
    tagline: "Emails that render beautifully everywhere.",
    description: "We craft responsive HTML email templates that render perfectly across Gmail, Outlook, Apple Mail, and 50+ email clients. Dark mode support, mobile-first design, and CRM-ready code — all included.",
    tags: ["Mobile-First", "Dark Mode", "Multi-client"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
    stats: [{ value: "500+", label: "Templates Built" }, { value: "50+", label: "Email Clients" }, { value: "98%", label: "Render Rate" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Cross-Client Compatibility", desc: "Tested on Gmail, Outlook 2016–2021, Apple Mail, Yahoo, and 50+ clients.", icon: "◈" },
      { title: "Dark Mode Support", desc: "Tailored dark-mode styles ensure brand integrity in dark environments.", icon: "⬡" },
      { title: "Mobile-First Layouts", desc: "Single-column and hybrid layouts that look stunning on all screen sizes.", icon: "◎" },
      { title: "ESP Ready", desc: "Compatible with Mailchimp, Klaviyo, HubSpot, Campaign Monitor, and more.", icon: "⬢" },
      { title: "Dynamic Merge Tags", desc: "Placeholder merge tags for personalisation with your chosen ESP.", icon: "◉" },
      { title: "Accessibility Compliant", desc: "ARIA roles, alt text standards, and semantic structure for screen readers.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Share Your Design", desc: "PSD, Sketch, Figma, or even a rough mockup works." },
      { step: "02", title: "Scope & Plan", desc: "We audit the design for email-client constraints." },
      { step: "03", title: "HTML Email Build", desc: "Table-based, inline-CSS email with bulletproof structure." },
      { step: "04", title: "Litmus Testing", desc: "Render-tested across 50+ clients with Litmus screenshots." },
      { step: "05", title: "Delivery", desc: "HTML file + ESP-specific version + inline CSS variant." },
    ],
    faqs: [
      { q: "Which ESPs do you support?", a: "Mailchimp, Klaviyo, HubSpot, Campaign Monitor, Salesforce Marketing Cloud, and Brevo." },
      { q: "Do you test in Outlook?", a: "Yes — specifically in Outlook 2016, 2019, 2021, and Microsoft 365 web client." },
      { q: "Can you add dynamic personalisation?", a: "Absolutely — merge tag placeholders compatible with your ESP's syntax." },
      { q: "Do you provide Litmus test screenshots?", a: "Yes, all projects include a full Litmus screenshot report across 50+ clients." },
    ],
    relatedServices: [
      { id: "01", title: "PSD to HTML", subTitle: "Premium Conversion", slug: "psd-to-html" },
      { id: "02", title: "Sketch to HTML", subTitle: "Modern Workflow", slug: "sketch-to-html" },
    ],
  },

  "mobile-app-development": {
    id: "01", slug: "mobile-app-development", title: "Mobile App Development", subTitle: "Native & Cross-Platform",
    tagline: "Apps that engage, delight, and retain users.",
    description: "We build native iOS & Android apps and cross-platform solutions using React Native and Flutter. From MVP to enterprise-grade — every app is engineered for performance, scalability, and a delightful UX.",
    tags: ["iOS & Android", "React Native", "Flutter"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>),
    stats: [{ value: "120+", label: "Apps Launched" }, { value: "4.8★", label: "Avg App Rating" }, { value: "2M+", label: "End Users" }, { value: "98%", label: "Client Retention" }],
    features: [
      { title: "Native Performance", desc: "Platform-specific code for iOS and Android that leverages every device capability.", icon: "◈" },
      { title: "React Native", desc: "Single codebase, two platforms — 90% code reuse with native-like performance.", icon: "⬡" },
      { title: "Flutter Development", desc: "Pixel-perfect, natively compiled apps from one codebase with expressive UI.", icon: "◎" },
      { title: "App Store Optimization", desc: "ASO strategies, screenshots, and metadata to maximize visibility and downloads.", icon: "⬢" },
      { title: "Push Notifications & Real-time", desc: "Firebase, APNs, and WebSocket integrations for live updates and engagement.", icon: "◉" },
      { title: "Offline-First Architecture", desc: "Local storage, sync strategies, and graceful degradation for offline scenarios.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Goals, user flows, and interactive wireframes defined." },
      { step: "02", title: "UI/UX Design", desc: "Platform-specific design for iOS & Android." },
      { step: "03", title: "Dev Sprints", desc: "Agile 2-week sprints with regular demos." },
      { step: "04", title: "Device Testing", desc: "Tested on 20+ real devices across OS versions." },
      { step: "05", title: "Store Submission", desc: "App Store & Play Store submission handled for you." },
    ],
    faqs: [
      { q: "Do you build for both iOS and Android?", a: "Yes — native apps for both, plus cross-platform via React Native and Flutter." },
      { q: "How long does it take to build an app?", a: "A typical MVP takes 8–12 weeks. Complex apps with custom backends range 4–6 months." },
      { q: "Do you handle App Store submission?", a: "Yes — complete submission process including review compliance and metadata optimization." },
      { q: "Can you integrate with our existing API?", a: "Absolutely — REST APIs, GraphQL, Firebase, Supabase, and most backend technologies." },
    ],
    relatedServices: [
      { id: "02", title: "UI/UX Designing", subTitle: "User-First Interfaces", slug: "ui-ux-designing" },
      { id: "03", title: "Full Stack Dev", subTitle: "Scalable Web Apps", slug: "full-stack-development" },
    ],
  },

  "ui-ux-designing": {
    id: "02", slug: "ui-ux-designing", title: "UI/UX Designing", subTitle: "User-First Interfaces",
    tagline: "Interfaces that blend beauty with functional clarity.",
    description: "We design digital experiences that users love — from research and wireframes to polished, pixel-perfect UI. Every design decision is grounded in user psychology, business goals, and modern design principles.",
    tags: ["Figma", "User Research", "Prototyping"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>),
    stats: [{ value: "300+", label: "Screens Designed" }, { value: "98%", label: "Client Approval" }, { value: "40%", label: "Avg Conv. Lift" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "User Research & Personas", desc: "In-depth interviews, surveys, and persona creation to ground every design decision.", icon: "◈" },
      { title: "Wireframing & IA", desc: "Low-fidelity wireframes and IA maps that define structure before visual polish.", icon: "⬡" },
      { title: "High-Fidelity Figma UI", desc: "Pixel-perfect Figma designs with auto-layout, components, and design tokens.", icon: "◎" },
      { title: "Interactive Prototypes", desc: "Clickable Figma prototypes for stakeholder demos and usability testing.", icon: "⬢" },
      { title: "Design System Creation", desc: "Scalable component libraries with typography, color, and spacing tokens.", icon: "◉" },
      { title: "Usability Testing", desc: "Moderated and unmoderated testing sessions to validate designs before dev.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Research", desc: "User interviews, competitor audit, and goal alignment." },
      { step: "02", title: "Wireframes", desc: "Low-fidelity flows to establish structure." },
      { step: "03", title: "Visual Design", desc: "High-fidelity Figma UI with your brand identity." },
      { step: "04", title: "Prototype & Test", desc: "Interactive prototype validated with real users." },
      { step: "05", title: "Dev Handoff", desc: "Annotated Figma files with design tokens & assets." },
    ],
    faqs: [
      { q: "Do you work in Figma exclusively?", a: "Figma is our primary tool, but we can also work in Adobe XD or Sketch." },
      { q: "Do you conduct user research?", a: "Yes — end-to-end UX from research and IA through to polished UI and usability testing." },
      { q: "What deliverables will I receive?", a: "Wireframes, high-fidelity Figma files, clickable prototype, design system, and developer-ready assets." },
      { q: "Can you redesign an existing product?", a: "Absolutely — we conduct UX audits and deliver redesigns that improve usability and conversion." },
    ],
    relatedServices: [
      { id: "01", title: "Mobile App Dev", subTitle: "Native & Cross-Platform", slug: "mobile-app-development" },
      { id: "03", title: "Full Stack Dev", subTitle: "Scalable Web Apps", slug: "full-stack-development" },
    ],
  },

  "full-stack-development": {
    id: "03", slug: "full-stack-development", title: "Full Stack Development", subTitle: "Scalable Web Apps",
    tagline: "Scalable backends & dynamic frontends for modern web.",
    description: "We engineer full-stack web applications from the ground up — robust RESTful or GraphQL APIs, modern React/Next.js frontends, and cloud-native deployments. Built to scale from day one.",
    tags: ["React / Next.js", "Node.js", "PostgreSQL"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>),
    stats: [{ value: "180+", label: "Apps Built" }, { value: "99.9%", label: "Uptime SLA" }, { value: "3x", label: "Avg Perf Gain" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "React & Next.js Frontends", desc: "SSR, SSG, and app router for lightning-fast, SEO-optimized UIs.", icon: "◈" },
      { title: "Node.js & Express APIs", desc: "RESTful and GraphQL APIs with Node.js, Express, and NestJS.", icon: "⬡" },
      { title: "Database Architecture", desc: "PostgreSQL, MySQL, MongoDB, Redis — schema design and query optimization.", icon: "◎" },
      { title: "Authentication & Security", desc: "JWT, OAuth 2.0, 2FA, rate limiting, and OWASP-compliant security.", icon: "⬢" },
      { title: "Cloud & DevOps", desc: "AWS, GCP, or Vercel deployments with CI/CD pipelines and Docker.", icon: "◉" },
      { title: "Third-Party Integrations", desc: "Stripe, Twilio, SendGrid, Cloudinary, and any REST API you need.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Architecture", desc: "Tech stack selection, system design, and DB schema." },
      { step: "02", title: "API Development", desc: "Backend endpoints built and documented with Swagger." },
      { step: "03", title: "Frontend Build", desc: "React/Next.js UI connected to live APIs." },
      { step: "04", title: "Testing & Security", desc: "Unit, integration, and security testing." },
      { step: "05", title: "Deploy & Monitor", desc: "Cloud deployment with uptime monitoring." },
    ],
    faqs: [
      { q: "What tech stack do you use?", a: "React/Next.js, Node.js/NestJS, PostgreSQL, and AWS or Vercel. Flexible based on your needs." },
      { q: "Can you take over an existing codebase?", a: "Yes — we conduct a code audit and maintain, refactor, or extend any existing codebase." },
      { q: "Do you provide post-launch support?", a: "Yes — monthly retainer packages for maintenance, monitoring, and feature development." },
      { q: "How do you handle scalability?", a: "Horizontal scaling, caching layers, database read replicas, and CDN strategies from day one." },
    ],
    relatedServices: [
      { id: "01", title: "Mobile App Dev", subTitle: "Native & Cross-Platform", slug: "mobile-app-development" },
      { id: "08", title: "WordPress Website", subTitle: "Flexible CMS", slug: "wordpress-website" },
    ],
  },

  "software-testing": {
    id: "04", slug: "software-testing", title: "Software Testing", subTitle: "QA & Quality Engineering",
    tagline: "Bug-free, flawlessly performing products — guaranteed.",
    description: "We provide end-to-end QA services that catch bugs before your users do. Manual testing, automated test suites, performance benchmarks, and security audits — your product, thoroughly validated.",
    tags: ["Automated Testing", "Manual QA", "Performance"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    stats: [{ value: "50K+", label: "Test Cases Run" }, { value: "99.8%", label: "Bug Detection" }, { value: "60%", label: "Faster Release" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Manual Exploratory Testing", desc: "Experienced QA engineers find edge cases automated tools miss.", icon: "◈" },
      { title: "Automated Test Suites", desc: "Cypress, Playwright, and Selenium suites for continuous regression testing.", icon: "⬡" },
      { title: "API Testing", desc: "Postman and REST-Assured test collections — functional, negative, and load tests.", icon: "◎" },
      { title: "Performance Testing", desc: "JMeter and k6 load tests to validate your app under peak traffic.", icon: "⬢" },
      { title: "Security Testing", desc: "OWASP Top 10 scanning, penetration testing, and dependency audits.", icon: "◉" },
      { title: "CI/CD Integration", desc: "Automated tests plugged into GitHub Actions, GitLab CI, or Jenkins.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Requirements Review", desc: "Understand specs, user stories, and acceptance criteria." },
      { step: "02", title: "Test Plan", desc: "Comprehensive test plan covering all scenarios." },
      { step: "03", title: "Execution", desc: "Manual + automated tests across environments." },
      { step: "04", title: "Bug Reporting", desc: "Detailed Jira/Linear bug reports with reproduction steps." },
      { step: "05", title: "Sign-off Report", desc: "Final QA report with metrics and coverage stats." },
    ],
    faqs: [
      { q: "Do you write automated tests for existing projects?", a: "Yes — we audit existing codebases and write automated test suites with CI/CD integration." },
      { q: "Which automation frameworks do you use?", a: "Cypress and Playwright for web, Appium for mobile, JMeter/k6 for performance." },
      { q: "Do you offer ongoing QA retainer services?", a: "Yes — many clients retain us for continuous QA coverage across development sprints." },
      { q: "Can you test mobile apps?", a: "Absolutely — iOS and Android apps tested on real devices across multiple OS versions." },
    ],
    relatedServices: [
      { id: "03", title: "Full Stack Dev", subTitle: "Scalable Web Apps", slug: "full-stack-development" },
      { id: "05", title: "Laravel Dev", subTitle: "PHP Framework", slug: "laravel-development" },
    ],
  },

  "laravel-development": {
    id: "05", slug: "laravel-development", title: "Laravel Development", subTitle: "PHP Framework Excellence",
    tagline: "Secure, feature-rich web apps on the world's best PHP framework.",
    description: "We build powerful, secure web applications using Laravel — from SaaS platforms to enterprise portals. Elegant code, robust architecture, and a framework that scales with your ambitions.",
    tags: ["Laravel 11", "PHP 8.3", "REST APIs"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>),
    stats: [{ value: "200+", label: "Laravel Projects" }, { value: "Laravel 11", label: "Latest" }, { value: "8+", label: "Yrs Experience" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Custom Laravel Applications", desc: "Bespoke web apps built with Laravel's elegant MVC architecture and Eloquent ORM.", icon: "◈" },
      { title: "RESTful API Development", desc: "Secure, versioned REST APIs with Laravel Sanctum/Passport authentication.", icon: "⬡" },
      { title: "SaaS Platform Development", desc: "Multi-tenant SaaS with subscription billing, teams, and role-based access.", icon: "◎" },
      { title: "E-Commerce Solutions", desc: "Custom Laravel e-commerce with cart, payments, inventory, and order management.", icon: "⬢" },
      { title: "Queue & Background Jobs", desc: "Laravel Horizon, queues, and scheduled tasks for robust async processing.", icon: "◉" },
      { title: "Admin Panel Development", desc: "FilamentPHP or custom admin dashboards for complete data management.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Requirements", desc: "Detailed scoping and system architecture planning." },
      { step: "02", title: "Database Design", desc: "Migrations, relationships, and schema optimization." },
      { step: "03", title: "Backend Dev", desc: "Controllers, services, and API layer built." },
      { step: "04", title: "Frontend", desc: "Blade, Livewire, or API-connected React/Vue." },
      { step: "05", title: "Deploy", desc: "Server setup, caching, and performance tuning." },
    ],
    faqs: [
      { q: "Which Laravel version do you use?", a: "Latest stable Laravel (currently Laravel 11) with PHP 8.3." },
      { q: "Can you upgrade our old Laravel app?", a: "Yes — we handle upgrades from any version to the latest with thorough testing." },
      { q: "Do you build multi-tenant SaaS?", a: "Yes — SaaS multi-tenancy with subscription management via Stripe is a specialty." },
      { q: "What frontend do you pair with Laravel?", a: "Blade, Livewire for reactive UIs, or decoupled React/Vue with a Laravel API." },
    ],
    relatedServices: [
      { id: "06", title: "Node.js Dev", subTitle: "Event-Driven Backend", slug: "nodejs-development" },
      { id: "07", title: "PHP Development", subTitle: "Custom PHP Solutions", slug: "php-development" },
    ],
  },

  "nodejs-development": {
    id: "06", slug: "nodejs-development", title: "Node.js Development", subTitle: "Event-Driven Backend",
    tagline: "High-performance, real-time event-driven applications.",
    description: "We build blazing-fast Node.js backends — from real-time chat and streaming APIs to microservices and serverless functions. Non-blocking, scalable, and production-ready.",
    tags: ["Node.js", "Express / NestJS", "Real-time"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
    stats: [{ value: "150+", label: "Node Projects" }, { value: "10M+", label: "Req/day Handled" }, { value: "<50ms", label: "Avg Response" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "REST & GraphQL APIs", desc: "Express and NestJS APIs with OpenAPI docs, validation, and versioning.", icon: "◈" },
      { title: "Real-time with Socket.io", desc: "WebSocket-based real-time features — chat, notifications, live dashboards.", icon: "⬡" },
      { title: "Microservices Architecture", desc: "Event-driven microservices with RabbitMQ, Kafka, or NATS.", icon: "◎" },
      { title: "Serverless Functions", desc: "AWS Lambda and Vercel Edge Functions for cost-efficient, scalable compute.", icon: "⬢" },
      { title: "Database Integrations", desc: "Prisma, TypeORM, Mongoose — seamless ORM/ODM integration.", icon: "◉" },
      { title: "Authentication & JWT", desc: "Passport.js, JWT, and OAuth 2.0 with refresh token rotation.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Architecture", desc: "Monolith vs microservices decision and system design." },
      { step: "02", title: "API Blueprint", desc: "OpenAPI spec and data model defined upfront." },
      { step: "03", title: "Development", desc: "TDD-driven Node.js development with Jest." },
      { step: "04", title: "Load Testing", desc: "k6 performance tests under simulated peak load." },
      { step: "05", title: "Deploy", desc: "PM2 / Docker / Kubernetes deployment configured." },
    ],
    faqs: [
      { q: "NestJS or Express — which do you recommend?", a: "NestJS for large enterprise projects; Express for simpler, faster-to-ship APIs. We advise based on your needs." },
      { q: "Can Node.js handle high traffic?", a: "Yes — Node's non-blocking event loop excels under high concurrency. We've built systems at 10M+ req/day." },
      { q: "Do you build real-time features?", a: "Yes — Socket.io, Server-Sent Events, and WebRTC for real-time chat, notifications, and live data." },
      { q: "Do you write tests?", a: "Absolutely — Jest unit tests and Supertest integration tests are standard in all our deliverables." },
    ],
    relatedServices: [
      { id: "05", title: "Laravel Dev", subTitle: "PHP Framework", slug: "laravel-development" },
      { id: "03", title: "Full Stack Dev", subTitle: "Scalable Web Apps", slug: "full-stack-development" },
    ],
  },

  "php-development": {
    id: "07", slug: "php-development", title: "PHP Development", subTitle: "Custom PHP Solutions",
    tagline: "Custom PHP solutions engineered for your unique goals.",
    description: "From custom PHP scripts to complex CMS platforms and enterprise portals, we deliver clean, secure, and maintainable PHP solutions that stand the test of time and traffic.",
    tags: ["PHP 8.3", "OOP", "MVC Patterns"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
    stats: [{ value: "250+", label: "PHP Projects" }, { value: "PHP 8.3", label: "Latest" }, { value: "10+", label: "Yrs Experience" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Custom PHP Applications", desc: "Bespoke PHP apps built with modern OOP principles, design patterns, and clean architecture.", icon: "◈" },
      { title: "Legacy PHP Modernisation", desc: "Upgrade and refactor legacy PHP 5.x/7.x codebases to modern PHP 8.x standards.", icon: "⬡" },
      { title: "Custom CMS Development", desc: "Bespoke content management systems tailored to your editorial workflow.", icon: "◎" },
      { title: "API Development & Integration", desc: "RESTful API development and third-party integrations with robust error handling.", icon: "⬢" },
      { title: "Payment Gateway Integration", desc: "Stripe, PayPal, Razorpay, and custom gateways with PCI compliance.", icon: "◉" },
      { title: "Caching & Performance", desc: "Redis, Memcached, OPcache, and query optimization for sub-200ms response times.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Understand existing systems, integrations, and goals." },
      { step: "02", title: "Architecture", desc: "MVC structure, DB schema, and API contract defined." },
      { step: "03", title: "Development", desc: "Clean, PSR-compliant, documented PHP code." },
      { step: "04", title: "Testing", desc: "PHPUnit tests, code review, and security audit." },
      { step: "05", title: "Deploy", desc: "cPanel, VPS, or cloud deploy with monitoring." },
    ],
    faqs: [
      { q: "Do you work with PHP without a framework?", a: "Yes — while we recommend Laravel or Symfony, we're equally skilled in vanilla PHP for custom needs." },
      { q: "Can you modernise our legacy PHP app?", a: "Yes — we specialise in upgrading PHP 5.x/7.x systems to PHP 8.x with minimal disruption." },
      { q: "Do you follow PSR coding standards?", a: "All our PHP code follows PSR-1, PSR-2, PSR-4, and PSR-12 with automated linting." },
      { q: "Can you integrate third-party APIs?", a: "Yes — extensive experience with payment gateways, CRMs, ERPs, and REST/SOAP APIs." },
    ],
    relatedServices: [
      { id: "05", title: "Laravel Dev", subTitle: "PHP Framework", slug: "laravel-development" },
      { id: "08", title: "WordPress Website", subTitle: "Flexible CMS", slug: "wordpress-website" },
    ],
  },

  "wordpress-website": {
    id: "08", slug: "wordpress-website", title: "WordPress Website", subTitle: "Flexible CMS",
    tagline: "Flexible, beautiful, and easy to manage WordPress sites.",
    description: "We build custom WordPress websites — not template sites. Custom themes from Figma designs, bespoke plugins, headless WordPress with Next.js, and full WooCommerce stores.",
    tags: ["Custom Themes", "WooCommerce", "Headless WP"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
    stats: [{ value: "400+", label: "WP Sites Built" }, { value: "100%", label: "Custom Coded" }, { value: "95+", label: "PageSpeed Score" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Custom Theme Development", desc: "Pixel-perfect themes from your Figma/PSD — no page builders, no bloat.", icon: "◈" },
      { title: "WooCommerce Stores", desc: "Full WooCommerce with custom product types, checkout flows, and payment gateways.", icon: "⬡" },
      { title: "Custom Plugin Development", desc: "Bespoke plugins to extend functionality far beyond off-the-shelf solutions.", icon: "◎" },
      { title: "Headless WordPress + Next.js", desc: "WordPress as a headless CMS with a blazing-fast Next.js frontend via WPGraphQL.", icon: "⬢" },
      { title: "Performance Optimization", desc: "Core Web Vitals optimization, image compression, caching, and CDN config.", icon: "◉" },
      { title: "WordPress Migrations", desc: "Safe, zero-downtime migrations from any platform with full data integrity.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Design & Plan", desc: "Figma design approved before any code is written." },
      { step: "02", title: "Theme Dev", desc: "Custom theme coded from scratch — no Elementor." },
      { step: "03", title: "Plugin Build", desc: "Custom plugins and WooCommerce configuration." },
      { step: "04", title: "Speed & SEO", desc: "Core Web Vitals and Yoast SEO optimization." },
      { step: "05", title: "Launch & Train", desc: "Go-live + editor training session for your team." },
    ],
    faqs: [
      { q: "Do you use page builders like Elementor?", a: "No — we hand-code all themes for performance, security, and full design control." },
      { q: "Can you migrate our existing site to WordPress?", a: "Yes — from Wix, Squarespace, Joomla, or custom — zero data loss, zero downtime." },
      { q: "Do you build headless WordPress?", a: "Yes — WordPress + WPGraphQL with a Next.js frontend is one of our favorite modern stacks." },
      { q: "Will I be able to manage the site myself?", a: "Absolutely — every project includes an editor training session so you're confident managing content." },
    ],
    relatedServices: [
      { id: "07", title: "PHP Development", subTitle: "Custom PHP Solutions", slug: "php-development" },
      { id: "03", title: "Full Stack Dev", subTitle: "Scalable Web Apps", slug: "full-stack-development" },
    ],
  },

  "web-development": {
    id: "01", slug: "web-development", title: "Web Development", subTitle: "Custom Websites & Apps",
    tagline: "Fast, scalable, and built to convert.",
    description: "We engineer custom websites and web applications that are fast, accessible, and built for growth. From marketing sites to complex SaaS platforms — every project crafted with precision and purpose.",
    tags: ["Next.js", "React", "Performance"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
    stats: [{ value: "500+", label: "Sites Launched" }, { value: "95+", label: "PageSpeed Avg" }, { value: "3x", label: "Avg Traffic Growth" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Next.js & React Applications", desc: "SSR, SSG, and ISR for maximum performance and SEO-optimized UIs.", icon: "◈" },
      { title: "CMS Integration", desc: "Headless CMS with Sanity, Contentful, or Strapi for flexible content management.", icon: "⬡" },
      { title: "Performance Engineering", desc: "Core Web Vitals obsession — LCP under 2.5s, CLS near zero, FID below 100ms.", icon: "◎" },
      { title: "SEO Architecture", desc: "Technical SEO foundations — structured data, sitemaps, canonicals, and metadata.", icon: "⬢" },
      { title: "Conversion Optimization", desc: "Landing pages and user flows engineered to maximize lead generation and sales.", icon: "◉" },
      { title: "Accessibility (WCAG 2.1)", desc: "AA-compliant accessible experiences for every user on every device.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Goals, audience, and content strategy defined." },
      { step: "02", title: "Design", desc: "Figma designs approved before development starts." },
      { step: "03", title: "Development", desc: "Next.js or React build with clean component architecture." },
      { step: "04", title: "QA & Performance", desc: "Cross-browser testing and Core Web Vitals audit." },
      { step: "05", title: "Launch", desc: "DNS, CDN, and monitoring configured for go-live." },
    ],
    faqs: [
      { q: "Do you build marketing sites or web apps?", a: "Both — from high-converting landing pages and corporate sites to complex SaaS dashboards." },
      { q: "How do you ensure fast load times?", a: "Next.js SSG/SSR, image optimization, lazy loading, edge CDN, and continuous Core Web Vitals monitoring." },
      { q: "Do you include SEO?", a: "Yes — technical SEO is built in from the start: structured data, semantic HTML, sitemap, robots.txt." },
      { q: "Can we update the site ourselves?", a: "Yes — we integrate a headless CMS so your team manages all content without touching code." },
    ],
    relatedServices: [
      { id: "02", title: "App Development", subTitle: "iOS & Android", slug: "app-development" },
      { id: "04", title: "UI/UX Design", subTitle: "User-First Interfaces", slug: "ui-ux" },
    ],
  },

  "app-development": {
    id: "02", slug: "app-development", title: "App Development", subTitle: "iOS & Android Apps",
    tagline: "Native and cross-platform apps users love.",
    description: "We design and develop mobile applications for iOS and Android — from MVPs to enterprise-scale platforms. React Native, Flutter, or fully native — we build for performance, retention, and delight.",
    tags: ["iOS & Android", "React Native", "Flutter"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>),
    stats: [{ value: "120+", label: "Apps Launched" }, { value: "4.8★", label: "Avg App Rating" }, { value: "2M+", label: "End Users" }, { value: "5★", label: "Client Rating" }],
    features: [
      { title: "React Native", desc: "Cross-platform apps with native performance — one codebase, iOS and Android.", icon: "◈" },
      { title: "Flutter Development", desc: "Pixel-perfect, natively compiled apps with Google's expressive UI framework.", icon: "⬡" },
      { title: "Native iOS (Swift)", desc: "Pure Swift development for apps that demand deepest platform integration.", icon: "◎" },
      { title: "Native Android (Kotlin)", desc: "Kotlin-first Android development following Material You design language.", icon: "⬢" },
      { title: "Backend & API Integration", desc: "Firebase, Supabase, or custom Node.js/Laravel API integration.", icon: "◉" },
      { title: "App Store Optimization", desc: "ASO, screenshots, preview videos, and review strategy for maximum visibility.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery", desc: "User flows and wireframes aligned to business goals." },
      { step: "02", title: "UI/UX Design", desc: "Platform-native design for iOS and Android." },
      { step: "03", title: "Dev Sprints", desc: "Agile 2-week sprints with client demos." },
      { step: "04", title: "Device Testing", desc: "Tested on 20+ real devices and OS versions." },
      { step: "05", title: "Store Launch", desc: "App Store & Play Store submission managed for you." },
    ],
    faqs: [
      { q: "React Native or Flutter — which is better?", a: "Both are excellent. React Native is ideal for JavaScript teams; Flutter excels in UI customisation. We advise based on your goals." },
      { q: "How long does app development take?", a: "MVP: 8–12 weeks. Full-featured app: 4–6 months depending on complexity." },
      { q: "Do you handle store submission?", a: "Yes — we manage the full submission process including compliance and metadata optimization." },
      { q: "Can you add features to an existing app?", a: "Absolutely — we conduct a code audit and extend any React Native, Flutter, or native iOS/Android app." },
    ],
    relatedServices: [
      { id: "01", title: "Web Development", subTitle: "Custom Websites", slug: "web-development" },
      { id: "04", title: "UI/UX Design", subTitle: "User-First Interfaces", slug: "ui-ux" },
    ],
  },

  "ecommerce": {
    id: "03", slug: "ecommerce", title: "E-Commerce", subTitle: "Shopify & WooCommerce",
    tagline: "Online stores engineered to sell more, every day.",
    description: "We build high-converting e-commerce experiences on Shopify, WooCommerce, and custom platforms. From product catalog to checkout — every touchpoint optimized for conversion and customer retention.",
    tags: ["Shopify", "WooCommerce", "CRO"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>),
    stats: [{ value: "200+", label: "Stores Built" }, { value: "35%", label: "Avg Conv. Lift" }, { value: "$50M+", label: "Revenue Gen." }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Shopify & Shopify Plus", desc: "Custom Shopify themes, app integrations, and Plus-tier B2B and multi-storefront setups.", icon: "◈" },
      { title: "WooCommerce Development", desc: "Custom stores with tailored product types, checkout flows, and payment gateways.", icon: "⬡" },
      { title: "Conversion Rate Optimization", desc: "Checkout flow optimization, upsells, cross-sells, and cart abandonment recovery.", icon: "◎" },
      { title: "Headless Commerce", desc: "Next.js frontend with Shopify Storefront API or WooCommerce REST API.", icon: "⬢" },
      { title: "ERP & POS Integration", desc: "Sync your store with inventory management, accounting, and point-of-sale systems.", icon: "◉" },
      { title: "Performance & SEO", desc: "E-commerce SEO, schema markup, product page optimization, sub-2s load times.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Strategy", desc: "Platform selection, catalog audit, and UX strategy." },
      { step: "02", title: "Design", desc: "Custom store design optimized for conversion." },
      { step: "03", title: "Development", desc: "Theme/plugin build, payment and shipping setup." },
      { step: "04", title: "Migration", desc: "Catalog, customer data, and order history migrated." },
      { step: "05", title: "Launch & CRO", desc: "Go-live with conversion monitoring and A/B testing." },
    ],
    faqs: [
      { q: "Shopify or WooCommerce — which should I choose?", a: "Shopify for simplicity and hosted reliability. WooCommerce for full control and lower transaction fees. We advise based on your scale." },
      { q: "Can you migrate our existing store?", a: "Yes — from any platform (WooCommerce, Magento, BigCommerce, custom) with full data integrity." },
      { q: "Do you offer post-launch CRO services?", a: "Yes — post-launch CRO retainers covering A/B testing, heatmap analysis, and checkout optimization." },
      { q: "Can you build a B2B wholesale store?", a: "Yes — Shopify Plus B2B, WooCommerce wholesale plugins, or fully custom quote-based ordering." },
    ],
    relatedServices: [
      { id: "01", title: "Web Development", subTitle: "Custom Websites", slug: "web-development" },
      { id: "08", title: "WordPress Website", subTitle: "Flexible CMS", slug: "wordpress-website" },
    ],
  },

  "shopify": {
    id: "09", slug: "shopify", title: "Shopify Development", subTitle: "High-Converting Shopify Stores",
    tagline: "Custom Shopify stores built to scale and convert.",
    description: "We build custom Shopify and Shopify Plus storefronts, custom Liquid themes, private apps, and headless commerce solutions that maximize conversion and average order value.",
    tags: ["Shopify Plus", "Liquid Themes", "Private Apps"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>),
    stats: [{ value: "150+", label: "Shopify Stores" }, { value: "35%", label: "Avg Conv. Lift" }, { value: "95+", label: "Core Web Vitals" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Custom Liquid Theme Development", desc: "Bespoke Shopify themes built from Figma designs with clean, modular Liquid code and zero bloat.", icon: "◈" },
      { title: "Shopify Plus & Enterprise", desc: "Shopify Plus setups, B2B wholesale portals, multi-currency, and Checkout Extensibility customizations.", icon: "⬡" },
      { title: "Private App & API Integration", desc: "Custom Shopify apps to integrate ERPs, CRMs, warehouse 3PLs, and proprietary backend workflows.", icon: "◎" },
      { title: "Headless Shopify with Next.js", desc: "Blazing-fast headless commerce powered by Shopify Storefront API and Next.js frontend.", icon: "⬢" },
      { title: "Platform Migration to Shopify", desc: "Seamless, zero-downtime migrations from Magento, WooCommerce, BigCommerce, or custom platforms.", icon: "◉" },
      { title: "Speed & Conversion Optimization", desc: "Shopify Core Web Vitals optimization, asset minification, and checkout flow improvements.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery & Architecture", desc: "Catalog audit, app tech stack review, and conversion roadmap." },
      { step: "02", title: "Custom UI/UX Design", desc: "Mobile-first storefront wireframes and Figma designs." },
      { step: "03", title: "Liquid & App Development", desc: "Theme coding, app integrations, and checkout configurations." },
      { step: "04", title: "Data Migration & QA", desc: "Products, customers, and order history migrated with 100% integrity." },
      { step: "05", title: "Launch & Growth", desc: "DNS cutover, analytics verification, and post-launch CRO support." },
    ],
    faqs: [
      { q: "Can you build custom Shopify themes from scratch?", a: "Yes — we build 100% custom Shopify themes from your designs without using off-the-shelf bloated themes." },
      { q: "Do you handle migration from Magento or WooCommerce to Shopify?", a: "Yes — we migrate catalogs, customer databases, past orders, and SEO redirects with zero downtime." },
      { q: "Can you build private Shopify apps?", a: "Yes — our developers build secure Node.js and Laravel private apps connecting Shopify with your internal tools." },
      { q: "What is Shopify Checkout Extensibility?", a: "We customize checkout experiences using Shopify's modern Extensibility framework, replacing legacy checkout.liquid." },
    ],
    relatedServices: [
      { id: "10", title: "WooCommerce Development", subTitle: "Flexible E-Commerce", slug: "woocommerce" },
      { id: "01", title: "Web Development", subTitle: "Custom Websites", slug: "web-development" },
    ],
  },

  "woocommerce": {
    id: "10", slug: "woocommerce", title: "WooCommerce Development", subTitle: "Custom E-Commerce on WordPress",
    tagline: "Total control, unlimited flexibility, and high-performance WooCommerce.",
    description: "We engineer robust WooCommerce stores tailored to your business model. From custom themes and complex checkout flows to high-volume inventory systems, subscriptions, and custom payment integrations.",
    tags: ["Custom Themes", "Subscriptions", "High Volume"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
    stats: [{ value: "250+", label: "Woo Stores Built" }, { value: "100%", label: "Custom Code" }, { value: "95+", label: "Speed Score" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Custom WooCommerce Themes", desc: "Tailor-made themes built without heavy page builders, optimizing speed and mobile user experience.", icon: "◈" },
      { title: "Custom Payment & Shipping Gateways", desc: "Integrate Stripe, PayPal, localized gateways, and bespoke shipping rule engines.", icon: "⬡" },
      { title: "Subscriptions & Memberships", desc: "Recurring billing, tiered memberships, digital downloads, and customer portal architecture.", icon: "◎" },
      { title: "High-Volume Performance & Caching", desc: "Redis object caching, database index optimization, and server tuning for massive product catalogs.", icon: "⬢" },
      { title: "Headless WooCommerce", desc: "Decoupled WordPress with Next.js or React frontend via WooCommerce REST API and GraphQL.", icon: "◉" },
      { title: "Platform Migration", desc: "Safe migrations to and from WooCommerce with customer accounts, passwords, and order histories intact.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Architecture & Planning", desc: "Product schema, tax/shipping logic, and plugin audit." },
      { step: "02", title: "Custom Theme Build", desc: "Lightweight, conversion-focused theme development." },
      { step: "03", title: "Extension & Gateway Setup", desc: "Payment gateways, custom checkout hooks, and ERP sync." },
      { step: "04", title: "Speed & Security Audit", desc: "Database indexing, server caching, and PCI compliance review." },
      { step: "05", title: "Launch & Handover", desc: "Smooth go-live with full client team training." },
    ],
    faqs: [
      { q: "Can WooCommerce handle large catalogs and high traffic?", a: "Yes — with proper server architecture, Redis caching, and clean code, WooCommerce easily scales to tens of thousands of products." },
      { q: "Do you build custom WooCommerce plugins?", a: "Yes — we code bespoke plugins for custom pricing, shipping calculations, B2B wholesale rules, and CRM syncing." },
      { q: "Can you fix a slow WooCommerce store?", a: "Yes — our speed optimization cleans database bloat, eliminates plugin bottlenecks, and implements advanced caching." },
      { q: "Can WooCommerce integrate with external ERP/POS systems?", a: "Yes — we integrate WooCommerce with QuickBooks, NetSuite, SAP, Square, and custom inventory APIs." },
    ],
    relatedServices: [
      { id: "08", title: "WordPress Website", subTitle: "Flexible CMS", slug: "wordpress-website" },
      { id: "09", title: "Shopify Development", subTitle: "High-Converting Shopify", slug: "shopify" },
    ],
  },

  "ui-ux": {
    id: "04", slug: "ui-ux", title: "UI/UX Design", subTitle: "User-First Interfaces",
    tagline: "Design that converts, retains, and delights.",
    description: "We create digital experiences that users love — grounded in research, crafted with precision, and validated with testing. From wireframes to polished Figma UI, we design for outcomes.",
    tags: ["Figma", "User Research", "Prototyping"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>),
    stats: [{ value: "300+", label: "Screens Designed" }, { value: "40%", label: "Avg Conv. Lift" }, { value: "98%", label: "Client Approval" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "UX Research & Strategy", desc: "User interviews, competitive analysis, and journey mapping to validate design directions.", icon: "◈" },
      { title: "Wireframing & IA", desc: "Low-fidelity wireframes and information architecture before visual design.", icon: "⬡" },
      { title: "High-Fidelity Figma UI", desc: "Pixel-perfect UI with auto-layout, design tokens, and complete component library.", icon: "◎" },
      { title: "Interactive Prototyping", desc: "Clickable Figma prototypes for stakeholder sign-off and usability sessions.", icon: "⬢" },
      { title: "Design Systems", desc: "Scalable, documented design systems that accelerate every future sprint.", icon: "◉" },
      { title: "Usability Testing", desc: "Moderated testing with real users to validate flows before a line of code is written.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Research", desc: "User interviews, personas, and competitor audit." },
      { step: "02", title: "Wireframes", desc: "Low-fidelity flows and information architecture." },
      { step: "03", title: "Visual Design", desc: "High-fidelity Figma UI with your brand identity." },
      { step: "04", title: "Prototype & Test", desc: "Interactive prototype validated with real users." },
      { step: "05", title: "Dev Handoff", desc: "Annotated Figma with tokens, specs, and assets." },
    ],
    faqs: [
      { q: "Do you conduct user research or just design?", a: "End-to-end — from research and persona creation through to UI design and usability testing." },
      { q: "What does a design system include?", a: "Typography scale, color tokens, spacing system, component library, and usage documentation." },
      { q: "Can you redesign an existing product?", a: "Yes — UX audits identifying friction points, then redesigns that improve usability and conversion." },
      { q: "How long does a UI/UX project take?", a: "Single product UI: 3–6 weeks. Full design systems or product redesigns: 8–16 weeks." },
    ],
    relatedServices: [
      { id: "01", title: "Web Development", subTitle: "Custom Websites", slug: "web-development" },
      { id: "02", title: "App Development", subTitle: "iOS & Android", slug: "app-development" },
    ],
  },

  "seo": {
    id: "05", slug: "seo", title: "SEO Services", subTitle: "Rank Higher, Grow Faster",
    tagline: "Organic growth engineered with data, not guesswork.",
    description: "We grow your organic search presence with technical SEO, content strategy, and authority building. Transparent reporting, proven methodologies, and rankings that compound over time.",
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
    stats: [{ value: "300%", label: "Avg Traffic Growth" }, { value: "#1", label: "Rankings Achieved" }, { value: "500+", label: "Keywords Ranked" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Technical SEO Audit", desc: "Comprehensive crawl analysis, Core Web Vitals, indexation issues, and structured data audit.", icon: "◈" },
      { title: "Keyword Research & Strategy", desc: "Intent-mapped keyword research identifying highest-value opportunities in your niche.", icon: "⬡" },
      { title: "On-Page Optimization", desc: "Title tags, meta descriptions, header hierarchy, internal linking, and content optimization.", icon: "◎" },
      { title: "Content Strategy & Creation", desc: "Topical authority strategy with expert-written content that ranks and converts.", icon: "⬢" },
      { title: "Link Building & Digital PR", desc: "White-hat link acquisition through digital PR, guest posting, and broken link building.", icon: "◉" },
      { title: "Monthly Reporting", desc: "Transparent dashboards showing rankings, traffic, conversions, and ROI.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "SEO Audit", desc: "Technical, on-page, and off-page baseline audit." },
      { step: "02", title: "Strategy", desc: "Keyword map, content calendar, and link plan." },
      { step: "03", title: "Technical Fixes", desc: "Priority technical issues resolved first." },
      { step: "04", title: "Content & Links", desc: "Content published and links acquired monthly." },
      { step: "05", title: "Report & Iterate", desc: "Monthly report with rankings, traffic, and next actions." },
    ],
    faqs: [
      { q: "How long before I see SEO results?", a: "Measurable ranking improvements within 3–4 months. Significant traffic growth at the 6–9 month mark." },
      { q: "Do you do black-hat SEO?", a: "Never. Exclusively white-hat techniques aligned with Google's guidelines — sustainable rankings." },
      { q: "Do you write the content?", a: "Yes — SEO-specialist content writers create expert-level articles optimized for search intent." },
      { q: "Can you do SEO for a new website?", a: "Yes — starting from day one is ideal. We architect your site for maximum search performance from the beginning." },
    ],
    relatedServices: [
      { id: "08", title: "Brand Design", subTitle: "Logos & Brand Identity", slug: "branding" },
    ],
  },

  "branding": {
    id: "08", slug: "branding", title: "Brand Design", subTitle: "Logos & Brand Identity",
    tagline: "Identities that are instantly recognisable and impossible to forget.",
    description: "We craft brand identities that make lasting impressions — from logo design and color systems to typography, brand guidelines, and every touchpoint in between.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
    stats: [{ value: "400+", label: "Brands Created" }, { value: "100%", label: "Original Designs" }, { value: "2 Wks", label: "Avg Turnaround" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "Logo Design", desc: "Timeless, versatile logo marks that work across every medium — digital, print, and signage.", icon: "◈" },
      { title: "Brand Identity System", desc: "Complete visual system: logos, color palette, typography hierarchy, and iconography.", icon: "⬡" },
      { title: "Brand Guidelines", desc: "Comprehensive guidelines ensuring consistent brand application across all teams.", icon: "◎" },
      { title: "Stationery & Collateral", desc: "Business cards, letterheads, email signatures, and presentation templates.", icon: "⬢" },
      { title: "Social Media Branding", desc: "Profile graphics, cover images, post templates, and Stories assets.", icon: "◉" },
      { title: "Brand Strategy", desc: "Positioning, messaging pillars, brand voice, and tone-of-voice guidelines.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Brand questionnaire, competitor audit, and moodboard." },
      { step: "02", title: "Concepts", desc: "3 distinct logo directions presented for feedback." },
      { step: "03", title: "Refinement", desc: "Selected direction refined through 2 revision rounds." },
      { step: "04", title: "Full Identity", desc: "Complete brand system designed and applied." },
      { step: "05", title: "Delivery", desc: "Brand guidelines PDF + all assets in every format." },
    ],
    faqs: [
      { q: "How many logo concepts do we receive?", a: "3 distinct logo directions in round one, then 2 revision rounds on the chosen direction." },
      { q: "What file formats are included?", a: "SVG, PDF, PNG (transparent), EPS, and JPG — for light and dark backgrounds in all color variations." },
      { q: "Do you design brand guidelines?", a: "Yes — brand guidelines are a core deliverable covering logo usage, color, typography, and tone of voice." },
      { q: "Can you rebrand an existing company?", a: "Yes — from brand strategy and naming through to complete visual identity system." },
    ],
    relatedServices: [
      { id: "04", title: "UI/UX Design", subTitle: "User-First Interfaces", slug: "ui-ux" },
      { id: "06", title: "Social Media", subTitle: "Content & Paid Ads", slug: "social-media" },
    ],
  },

  "ai-powered-websites": {
    id: "09", slug: "ai-powered-websites", title: "AI-Powered Websites", subTitle: "Next-Gen Intelligent Web Development",
    tagline: "Smart. Adaptive. Context-aware. Built for the modern web.",
    description: "We build ultra-fast, intelligent Next.js websites and web applications infused with custom LLMs, vector semantic search, automated lead qualification, and real-time personalized user experiences.",
    tags: ["Next.js 15", "Vector RAG", "OpenAI & Claude", "Dynamic Personalization"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>),
    stats: [{ value: "3.8x", label: "Conversion Lift" }, { value: "< 800ms", label: "AI Latency" }, { value: "24/7", label: "Lead Capture" }, { value: "100%", label: "Brand Safe" }],
    features: [
      { title: "Semantic RAG Search", desc: "Natural language search understanding visitor intent in plain English without keyword guessing.", icon: "◈" },
      { title: "Autonomous Chatbots", desc: "Brand-trained AI assistants resolving queries, qualifying leads, and booking meetings 24/7.", icon: "⬡" },
      { title: "Dynamic Personalization", desc: "Websites that dynamically adapt headlines, layouts, and recommendations based on visitor behavior.", icon: "◎" },
      { title: "Programmatic SEO", desc: "Autonomous AI-optimized landing page generation and schema markup for high-intent search terms.", icon: "⬢" },
      { title: "Predictive Lead Scoring", desc: "Automated intent scoring and enriched intelligence dispatched directly to sales via Slack/CRM.", icon: "◉" },
      { title: "Enterprise Guardrails", desc: "Strict prompt injection firewalls, PII redaction, and verified knowledge boundaries.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Discovery & Knowledge Audit", desc: "We structure your business documentation and FAQs into high-dimensional vector embeddings." },
      { step: "02", title: "Next.js UI/UX Architecture", desc: "We design a high-converting, mobile-first interface tailored to your brand identity." },
      { step: "03", title: "LLM & RAG Integration", desc: "Engineered prompt chains, vector similarity search, and anti-hallucination guardrails." },
      { step: "04", title: "Testing & Security Checks", desc: "Latency tuning, cross-browser validation, and security prompt injection testing." },
      { step: "05", title: "Deployment & Analytics", desc: "CDN edge deployment with real-time sentiment, token usage, and conversion analytics." },
    ],
    faqs: [
      { q: "How is an AI website different from a regular website?", a: "Traditional websites are static brochures. An AI website engages visitors in real-time, answers complex questions from your verified data, and captures leads autonomously." },
      { q: "Can you add AI to my existing website?", a: "Yes — we can build full Next.js AI platforms from scratch or embed intelligent AI modules into WordPress, Shopify, or React websites." },
      { q: "How do you prevent AI hallucinations?", a: "We utilize Retrieval-Augmented Generation (RAG) with strict boundary prompts ensuring the AI only answers based on verified company data." },
      { q: "What are the running costs for AI APIs?", a: "Modern LLM APIs are very cost-effective, typically costing between $10 to $40/month for average business traffic, augmented by semantic caching." },
    ],
    relatedServices: [
      { id: "10", title: "AI Automation", subTitle: "Autonomous Workflows", slug: "ai-automation" },
      { id: "11", title: "AI Chatbots", subTitle: "24/7 Smart Assistants", slug: "ai-chatbots" },
    ],
  },

  "ai-automation": {
    id: "10", slug: "ai-automation", title: "AI Automation & Workflows", subTitle: "Autonomous Operations & Integrations",
    tagline: "Automate repetitive tasks, connect LLMs to your data, scale operations 10x.",
    description: "Eliminate manual data entry, streamline lead qualification, and bridge your website with autonomous multi-agent pipelines and CRM sync.",
    tags: ["LangGraph", "Zapier & n8n", "CRM Integration", "Doc Processing"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    stats: [{ value: "85%", label: "Hours Saved" }, { value: "99.8%", label: "Accuracy" }, { value: "10x", label: "Velocity" }, { value: "0s", label: "Wait Time" }],
    features: [
      { title: "Lead Routing & CRM Sync", desc: "Instant intent qualification and enriched dossiers dispatched to sales reps via Slack and HubSpot.", icon: "◈" },
      { title: "Intelligent Document Parsing", desc: "Extract line items from invoices, receipts, and contracts into database records in seconds.", icon: "⬡" },
      { title: "Email Autopilot", desc: "Sort incoming business emails, draft hyper-personalized follow-ups, and automate scheduling.", icon: "◎" },
      { title: "E-Commerce Automation", desc: "Automated supplier restocking, competitor price monitoring, and catalog enrichment.", icon: "⬢" },
      { title: "Internal Knowledge Base", desc: "Sync Notion, Google Drive, Jira, and Slack into a unified internal vector search engine.", icon: "◉" },
      { title: "Multi-Agent Systems", desc: "Deploy cooperating AI agents that research, validate compliance, and execute tasks autonomously.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Operational Audit", desc: "We identify your highest friction repetitive workflows and calculate time/cost ROI." },
      { step: "02", title: "Architecture & Data Mapping", desc: "Design secure webhook triggers and multi-agent logic chains across your existing tools." },
      { step: "03", title: "Prompt & Agent Engineering", desc: "Build tailored agents with deterministic fallback guardrails and validation layers." },
      { step: "04", title: "Testing & Team Walkthrough", desc: "Rigorous stress testing and employee walkthrough for seamless daily adoption." },
      { step: "05", title: "Continuous Optimization", desc: "Ongoing monitoring of success rates, latency, and automated exception logging." },
    ],
    faqs: [
      { q: "What software can you connect with AI?", a: "We connect CRMs (HubSpot, Salesforce), communication (Slack, WhatsApp), ERPs (QuickBooks, Xero), and databases (Postgres, Supabase) via APIs and webhooks." },
      { q: "What happens if the AI encounters an edge case?", a: "We build human-in-the-loop safeguards. High-stakes actions queue up a 1-click confirmation alert for human approval before executing." },
    ],
    relatedServices: [
      { id: "09", title: "AI-Powered Websites", subTitle: "Smart Web Apps", slug: "ai-powered-websites" },
      { id: "11", title: "AI Chatbots", subTitle: "24/7 Smart Assistants", slug: "ai-chatbots" },
    ],
  },

  "website-maintenance": {
    id: "14", slug: "website-maintenance", title: "Website Maintenance", subTitle: "Proactive Support & Care",
    tagline: "Keep your website fast, secure, and always updated.",
    description: "We provide comprehensive, proactive website maintenance and support plans for WordPress, Shopify, and custom web applications. From security patches and daily backups to Core Web Vitals optimization and dedicated development hours.",
    tags: ["Security", "Speed Monitoring", "Monthly Support"],
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>),
    stats: [{ value: "99.9%", label: "Uptime Monitored" }, { value: "<1hr", label: "Critical Response" }, { value: "100+", label: "Sites Maintained" }, { value: "5★", label: "Rated" }],
    features: [
      { title: "24/7 Uptime & Security Monitoring", desc: "Real-time monitoring with automated malware scans, SSL verification, and firewall hardening.", icon: "◈" },
      { title: "Plugin, Theme & Core Updates", desc: "Safe staging-environment updates preventing breaking changes before deploying to production.", icon: "⬡" },
      { title: "Daily Cloud Backups", desc: "Automated off-site cloud backups with 1-click restore protocols for total peace of mind.", icon: "◎" },
      { title: "Performance & Core Web Vitals", desc: "Continuous speed monitoring, database defragmentation, and caching optimization.", icon: "⬢" },
      { title: "Dedicated Development Hours", desc: "Monthly engineering hours for feature updates, landing page tweaks, and bug fixes.", icon: "◉" },
      { title: "Monthly Health & SEO Reports", desc: "Transparent monthly reporting on uptime, security health, speed scores, and completed tasks.", icon: "◐" },
    ],
    process: [
      { step: "01", title: "Site Health Audit", desc: "Security, speed, and plugin audit across your entire stack." },
      { step: "02", title: "Staging Setup", desc: "Safe testing sandbox established for zero-risk updates." },
      { step: "03", title: "Monitoring Config", desc: "24/7 uptime ping and automated backup schedule activated." },
      { step: "04", title: "Monthly Maintenance", desc: "Weekly patches, performance tune-ups, and support tickets." },
      { step: "05", title: "Monthly Reporting", desc: "Detailed summary report delivered to your team." },
    ],
    faqs: [
      { q: "What platforms do you support for maintenance?", a: "We support WordPress, WooCommerce, Shopify, Laravel, Next.js, and custom PHP web applications." },
      { q: "How quickly do you respond if our site goes down?", a: "Critical emergency response time is under 1 hour for all active maintenance retainer clients." },
      { q: "Do unused maintenance hours roll over?", a: "Yes, depending on your selected monthly support plan, unused development hours roll over to the next month." },
      { q: "How do updates get tested before going live?", a: "We test all core, theme, and plugin updates in an isolated staging environment before deploying to production." },
    ],
    relatedServices: [
      { id: "08", title: "WordPress Website", subTitle: "Flexible CMS", slug: "wordpress-website" },
      { id: "01", title: "Web Development", subTitle: "Custom Websites", slug: "web-development" },
    ],
  },
};

// ─── SLUG ALIASES ─────────────────────────────────────────────────────────────
const SLUG_ALIASES = {
  "website-maintenance": "website-maintenance",
  "maintenance": "website-maintenance",
  "mobileapp": "mobile-app-development",
  "uiux": "ui-ux-designing",
  "fullstack": "full-stack-development",
  "softwaretesting": "software-testing",
  "laravel": "laravel-development",
  "nodejs": "nodejs-development",
  "php": "php-development",
  "wordpress": "wordpress-website",
  "ai": "ai-powered-websites",
  "ai-websites": "ai-powered-websites",
  "ai-integration": "ai-automation",
  "react-js-dev": "web-development",
  "next-js-dev": "web-development",
  "vue-js-dev": "web-development",
  "shopify": "shopify",
  "shopify-development": "shopify",
  "shopify-themes": "shopify",
  "shopify-apps": "shopify",
  "woocommerce": "woocommerce",
  "woocommerce-development": "woocommerce",
  "woo": "woocommerce",
  "wp-themes": "wordpress-website",
  "wp-plugins": "wordpress-website",
  "react": "web-development",
  "reactjs": "web-development",
  "nextjs": "web-development",
  "vue": "web-development",
  "vuejs": "web-development",
  "flutter": "app-development",
  "react-native": "app-development",
  "figma": "ui-ux",
  "ui-design": "ui-ux",
  "ux-design": "ui-ux",
  "design": "ui-ux",
  "testing": "software-testing",
  "qa": "software-testing",
  "qa-testing": "software-testing",
  "mobile": "app-development",
  "web": "web-development",
  "app": "app-development",
  "brand-design": "branding",
  "branding": "branding",
  "email-marketing": "email-templates",
  "email-templates": "email-templates",
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="border rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        borderColor: open ? "rgba(255,31,142,0.3)" : "#e2e8f0",
        background: open ? "rgba(255,240,247,0.6)" : "#fff",
      }}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 text-left">
        <span className="font-bold text-slate-800 text-[13px] sm:text-[14px] leading-snug pr-2 sm:pr-4">{faq.q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: open ? BRAND.gradient : "#f1f5f9",
            color: open ? "#fff" : "#64748b",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-slate-600 text-[13px] sm:text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-5 sm:p-6 border transition-all duration-300"
      style={{
        borderColor: hovered ? "rgba(255,31,142,0.3)" : "#e2e8f0",
        background: hovered ? "linear-gradient(135deg, #FFF0F7, #FAF5FF, #fff)" : "#fff",
        boxShadow: hovered ? "0 12px 40px -8px rgba(255,31,142,0.18)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Top shimmer line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-5 sm:left-6 right-5 sm:right-6 h-0.5 origin-left rounded-full"
        style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", }}
      />
      <div
        className="text-2xl sm:text-3xl mb-3 sm:mb-4 transition-all duration-300"
        style={{
          background: hovered ? BRAND.gradient : "none",
          WebkitBackgroundClip: hovered ? "text" : "unset",
          WebkitTextFillColor: hovered ? "transparent" : "#94a3b8",
          backgroundClip: hovered ? "text" : "unset",
          color: hovered ? "transparent" : "#94a3b8",
        }}
      >
        {feature.icon}
      </div>
      <h4 className="font-bold text-slate-800 text-[14px] sm:text-[15px] mb-2">{feature.title}</h4>
      <p className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ServiceDetailPage = ({ serviceSlug = "web-development" }) => {
  const resolvedSlug = SLUG_ALIASES[serviceSlug] || serviceSlug;
  const service = ALL_SERVICES[resolvedSlug] || ALL_SERVICES["web-development"];
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const words = service.title.split(" ");
  const lastWord = words.pop();
  const firstLine = words.join(" ");
  return (
    <div className="bg-white min-h-screen font-roboto overflow-x-hidden" style={{ fontFamily: "inherit" }}>

      {/* Ambient blobs — same as Blogs page */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "clamp(260px, 45vw, 500px)", height: "clamp(260px, 45vw, 500px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)", filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: "clamp(260px, 45vw, 500px)", height: "clamp(260px, 45vw, 500px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", filter: "blur(120px)" }} />
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-3 sm:py-4 flex items-center gap-2 flex-wrap">
        <Link href="/services/" className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors">Services</Link>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          <span
            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            {service.title}
          </span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative z-10 pt-20 sm:pt-[100px] md:pt-[140px] pb-12 sm:pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-10 lg:gap-16">
            <div className="flex-1 min-w-0">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-2xl border mb-4 sm:mb-6 max-w-full flex-wrap"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.6)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                {/* Ping dot */}
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: BRAND.primary }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3" style={{ background: BRAND.primary }} />
                </span>
                <span
                  className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.35em] uppercase"
                  style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  {service.subTitle}
                </span>
                <div className="shrink-0" style={{ color: BRAND.primary }}>{service.icon}</div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.25em] uppercase text-slate-300 mb-2 sm:mb-3 block">{service.id}</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] sm:leading-[0.95] lg:leading-[0.9] tracking-tight text-slate-900 mb-3 sm:mb-4 break-words">
                  {firstLine}
                  <br className="hidden lg:block" />

                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {' '}{lastWord}
                  </span>
                </h1>
                {/* Animated underline — matches Blogs heading */}
                <div className="relative w-20 sm:w-24 h-1.5 rounded-full mb-6" style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", }}>
                  <div className="absolute inset-0 blur-md opacity-70" style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", }} />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-500 font-medium italic mb-4"
              >
                "{service.tagline}"
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-lg mb-8"
              >
                {service.description}
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-8 sm:mb-10"
              >
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full tracking-wide border"
                    style={{
                      background: "rgba(255,240,247,0.8)",
                      color: BRAND.primary,
                      borderColor: "rgba(255,31,142,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center sm:items-center gap-3 sm:gap-4"
              >
                <Link
                  href="/customize-package"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm font-bold text-white tracking-wide w-full xs:w-auto sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, #FF79C6 0%, #A855F7 50%)",
                    boxShadow: "0 6px 24px rgba(168,85,247,0.3)",
                  }}
                >
                  Get Started
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
                <Link
                  href="/works"
                  className="text-sm font-semibold flex items-center justify-center gap-2"
                  style={{ color: BRAND.dark }}
                >
                  View Portfolio
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </motion.div>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-80 shrink-0"
            >
              {/* Gradient border wrapper — matches Blogs form */}
              <div
                className="relative rounded-3xl p-[2px]"
                style={{
                  background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                  boxShadow: "0 20px 60px rgba(236,72,153,0.25)",
                }}
              >
                <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 opacity-[0.06] text-[100px] sm:text-[120px] leading-none select-none pointer-events-none" style={{ color: BRAND.primary }}>◈</div>
                  <div className="grid grid-cols-2 gap-5 sm:gap-6">
                    {service.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className="text-center"
                      >
                        <p
                          className="text-xl sm:text-2xl font-black leading-none mb-1"
                          style={{
                            background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-pink-100">
                    <p className="text-[11px] sm:text-[12px] text-center text-slate-500 font-medium">Trusted by 500+ clients worldwide</p>
                    <div className="flex justify-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={BRAND.primary} stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 h-px mx-auto max-w-6xl px-4 sm:px-6" style={{ background: "linear-gradient(90deg, transparent, rgba(255,31,142,0.4), rgba(168,85,247,0.4), transparent)" }} />

      {/* ── FEATURES ── */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", backgroundImage: BRAND.gradient }} />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">What's Included</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.05] sm:leading-[1]"
              >
                Everything You <br className="hidden lg:block" />
                <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Need</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm max-w-xs leading-relaxed"
            >
              Every feature below is standard — no hidden tiers, no surprise add-ons.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #fff 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BRAND.primary }} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">How It Works</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Our{" "}
              <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Process
              </span>
            </motion.h2>
          </div>
          <div className="relative">
            <div
              className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,31,142,0.3), rgba(168,85,247,0.3), transparent)" }}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-6">
              {service.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-sm mb-3 sm:mb-4 relative"
                    style={{
                      background: "linear-gradient(135deg, #FFF0F7, #FAF5FF)",
                      border: "2px solid rgba(255,31,142,0.25)",
                    }}
                  >
                    <span
                      style={{
                        background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {step.step}
                    </span>
                    <div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", backgroundImage: BRAND.gradient }}
                    />
                  </div>
                  <h4 className="font-bold text-slate-800 text-[13px] sm:text-sm mb-1.5 sm:mb-2">{step.title}</h4>
                  <p className="text-slate-500 text-[11px] sm:text-[12px] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND.primary }} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">Common Questions</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>FAQ</span>
            </motion.h2>
          </div>
          <div className="flex flex-col gap-3">
            {service.faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="relative z-10 py-16 sm:py-20 border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">More Services</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">You May Also Like</h3>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              View All Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {service.relatedServices.map((related, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={`/services/${related.slug}`}
        className="group block rounded-2xl p-5 sm:p-6 border transition-all duration-300 no-underline bg-white hover:bg-gradient-to-br hover:from-pink-50 hover:via-purple-50 hover:to-white hover:shadow-[0_10px_30px_-8px_rgba(255,31,142,0.2)] hover:border-pink-300"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] mb-1"
              style={{
                background:
                  "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {related.subTitle}
            </p>

            <h4 className="text-lg sm:text-xl font-extrabold text-slate-800 truncate">
              {related.title}
            </h4>
          </div>

          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-slate-100 text-pink-500 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-[2px] overflow-hidden"
            style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", boxShadow: "0 20px 60px rgba(236,72,153,0.25)" }}
          >
            <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
              <div
                className="absolute top-4 right-6 text-[4rem] sm:text-[6rem] md:text-[8rem] font-black leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {service.id}
              </div>

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 sm:mb-6"
                style={{ background: "rgba(255,240,247,0.9)", border: "1px solid rgba(255,31,142,0.2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: BRAND.primary }} />
                <span
                  className="text-[10px] font-bold tracking-[0.3em] uppercase"
                  style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  Ready to Start?
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
                Let's Build Something<br />
                <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Extraordinary
                </span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
                Send us your requirements today and receive a detailed quote within one business day — no commitment required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/packages"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-bold text-white whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #FF79C6 0%, #A855F7 50%)", boxShadow: "0 6px 24px rgba(168,85,247,0.3)" }}
                >
                  <span>Start Your Project</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
                <Link
                  href="/contactus"
                  className="w-full sm:w-auto text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 py-2"
                  style={{ color: BRAND.dark }}
                >
                  <span>Contact Us First</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  INTEGRATION — /app/services/[slug]/page.jsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  "use client";
  import ServiceDetailPage from "@/components/ServiceDetailPage";
  export default function Page({ params }) {
    return <ServiceDetailPage serviceSlug={params.slug} />;
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  RESPONSIVE CHANGES MADE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - Added overflow-x-hidden on root to prevent horizontal scroll from
    ambient blobs / gradient underline on any breakpoint.
  - Ambient blobs sized with clamp() so they scale down on small/tablet
    viewports instead of causing overflow.
  - Hero: badge now wraps (flex-wrap) instead of overflowing on narrow
    tablets; title uses a full sm→xl fluid type scale (3xl → 7xl) and
    break-words so long titles don't overflow the column; CTA buttons
    stack full-width below `xs` and become row layout from `xs` up
    instead of jumping straight from mobile to desktop; stats card is
    `w-full` until `lg` so it doesn't get squeezed at tablet widths.
  - Features grid: added an explicit sm:grid-cols-2 step so tablets
    (640–1024px) get a 2-column layout instead of jumping from 1 to 3
    columns.
  - Process steps: 2-columns on mobile, 3 on tablet (sm), 5 on desktop
    (lg) — was previously 1 → 3 → 5, which produced awkward single-file
    stacking on small phones and a 3-wide/2-orphan layout on md tablets.
  - FAQ items, feature cards, related-service cards, and the bottom CTA
    all got intermediate sm-level padding/font sizes so they scale more
    gradually between mobile and desktop rather than only two states.
  - Related service card title truncates instead of wrapping into the
    arrow icon on narrow tablet widths.

  BRAND TOKENS (pulled from Blogs page)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Primary   #FF1F8E  (pink)
  Secondary #A855F7  (purple)
  Tertiary  #38BDF8  (cyan)
  Gradient  135deg, #FF1F8E → #A855F7 → #38BDF8
*/