"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiArrowRight, FiCheckCircle, FiLayers, FiCode, FiCpu, 
  FiSmartphone, FiLayout, FiSearch, FiShield, FiTrendingUp, FiShoppingBag,
  FiClock, FiCheck, FiChevronRight, FiUsers, FiHelpCircle
} from 'react-icons/fi';
import { FaReact, FaWordpress, FaShopify, FaLaravel, FaPhp, FaUsers } from 'react-icons/fa';
import { SiNextdotjs, SiWoocommerce } from 'react-icons/si';

const servicesData = [
  {
    id: '01',
    icon: <FaWordpress className="text-2xl text-[#0369a1]" />,
    title: 'WordPress Development',
    tag: 'CMS & Custom Themes',
    slug: 'wordpress',
    href: '/services/wordpress/',
    category: 'Web & CMS',
    accent: '#0369A1',
    accentBg: '#F0F9FF',
    accentBorder: '#BAE6FD',
    description: 'Custom block themes, bespoke plugin engineering, WooCommerce stores, and high-security enterprise WordPress solutions without page builder bloat.',
    features: [
      'Custom theme development from Figma',
      'ACF Pro & Gutenberg blocks',
      'Zero bloat, sub-second load times',
      'WooCommerce & payment gateways'
    ]
  },
  {
    id: '02',
    icon: <FaShopify className="text-2xl text-[#059669]" />,
    title: 'Shopify & Shopify Plus',
    tag: 'eCommerce Architecture',
    slug: 'shopify',
    href: '/services/shopify/',
    category: 'eCommerce',
    accent: '#059669',
    accentBg: '#ECFDF5',
    accentBorder: '#A7F3D0',
    description: 'High-converting custom Liquid themes, private apps, Shopify Plus B2B wholesale setups, and checkout extensibility tuned to maximize conversion rates.',
    features: [
      'Custom Liquid & Online Store 2.0',
      'Private Shopify apps & ERP sync',
      'Checkout extensibility customizations',
      'Store migration with zero downtime'
    ]
  },
  {
    id: '03',
    icon: <SiWoocommerce className="text-2xl text-[#7c3aed]" />,
    title: 'WooCommerce Development',
    tag: 'Scalable Stores',
    slug: 'woocommerce',
    href: '/services/woocommerce/',
    category: 'eCommerce',
    accent: '#7C3AED',
    accentBg: '#F5F3FF',
    accentBorder: '#DDD6FE',
    description: 'Custom e-commerce platforms on WordPress with multi-currency, high-SKU catalog optimization, and seamless subscription & payment integrations.',
    features: [
      'High-traffic WooCommerce tuning',
      'Custom checkout & upsell funnels',
      'Subscription & membership portals',
      '3PL warehouse & inventory APIs'
    ]
  },
  {
    id: '04',
    icon: <SiNextdotjs className="text-2xl text-slate-900" />,
    title: 'Custom Web Development',
    tag: 'Next.js & Full Stack',
    slug: 'web-development',
    href: '/services/web-development/',
    category: 'Web & CMS',
    accent: '#0f172a',
    accentBg: '#F8FAFC',
    accentBorder: '#CBD5E1',
    description: 'Modern web applications built with Next.js, React, Node.js, and REST/GraphQL APIs. Engineered for lightning performance and perfect Core Web Vitals.',
    features: [
      'Server-Side Rendering (SSR) & SSG',
      'Custom web portals & SaaS apps',
      'Fast APIs & database architectures',
      'Core Web Vitals 95+ score targets'
    ]
  },
  {
    id: '05',
    icon: <FaLaravel className="text-2xl text-[#dc2626]" />,
    title: 'Laravel & PHP Applications',
    tag: 'Backend Architecture',
    slug: 'laravel',
    href: '/services/laravel/',
    category: 'Web & CMS',
    accent: '#DC2626',
    accentBg: '#FEF2F2',
    accentBorder: '#FECACA',
    description: 'Robust MVC backend web applications, complex relational databases, queue schedulers, and secure RESTful APIs engineered for enterprise stability.',
    features: [
      'Clean Laravel MVC architectures',
      'REST & GraphQL microservices',
      'Role-based access control (RBAC)',
      'High-throughput database tuning'
    ]
  },
  {
    id: '06',
    icon: <FaReact className="text-2xl text-[#0891b2]" />,
    title: 'React.js & Frontend SPAs',
    tag: 'Interactive Frontends',
    slug: 'reactjs',
    href: '/services/reactjs/',
    category: 'Web & CMS',
    accent: '#0891B2',
    accentBg: '#ECFEFF',
    accentBorder: '#A5F3FC',
    description: 'Interactive single-page apps (SPAs), dynamic customer dashboards, and reusable design systems crafted using modern React and TypeScript.',
    features: [
      'State management (Redux/Zustand)',
      'Enterprise admin dashboards',
      'Interactive data visualizations',
      'Component library standardization'
    ]
  },
  {
    id: '07',
    icon: <FiCpu className="text-2xl text-[#d946ef]" />,
    title: 'AI-Powered Websites',
    tag: 'Next-Gen Intelligence',
    slug: 'ai-powered-websites',
    href: '/services/ai-powered-websites/',
    category: 'AI & Automation',
    accent: '#D946EF',
    accentBg: '#FDF4FF',
    accentBorder: '#F5D0FE',
    description: 'Transform traditional websites into intelligent platforms with RAG vector search, dynamic user personalization, and context-aware conversion engines.',
    features: [
      'RAG & semantic vector search',
      'Dynamic real-time personalization',
      'Automated lead qualification',
      'Strict RAG verification guardrails'
    ]
  },
  {
    id: '08',
    icon: <FiCpu className="text-2xl text-[#e11d48]" />,
    title: 'Custom AI Chatbots',
    tag: 'Autonomous Support',
    slug: 'ai-chatbots',
    href: '/services/ai-chatbots/',
    category: 'AI & Automation',
    accent: '#E11D48',
    accentBg: '#FFF1F2',
    accentBorder: '#FECDD3',
    description: 'Train contextual AI support chatbots on your documentation and product knowledge. Resolve routine customer inquiries 24/7 with zero false promises.',
    features: [
      'Trained on approved company docs',
      'Multi-channel web & CRM widget',
      'Live agent fallback routing',
      'Strict brand-aligned response guardrails'
    ]
  },
  {
    id: '09',
    icon: <FiTrendingUp className="text-2xl text-[#0ea5e9]" />,
    title: 'AI Automation & Workflows',
    tag: 'Workflow Automation',
    slug: 'ai-automation',
    href: '/services/ai-automation/',
    category: 'AI & Automation',
    accent: '#0EA5E9',
    accentBg: '#F0F9FF',
    accentBorder: '#BAE6FD',
    description: 'Automate repetitive workflows across CRMs, ERPs, support desks, and databases using customized AI pipelines and API integrations.',
    features: [
      'Automated document data extraction',
      'CRM & lead routing pipelines',
      'Custom webhook schedulers',
      'Enterprise compliance & audit logging'
    ]
  },
  {
    id: '10',
    icon: <FiLayout className="text-2xl text-[#8b5cf6]" />,
    title: 'UI/UX Product Design',
    tag: 'Design Systems',
    slug: 'ui-ux',
    href: '/services/ui-ux/',
    category: 'Design & Mobile',
    accent: '#8B5CF6',
    accentBg: '#F5F3FF',
    accentBorder: '#DDD6FE',
    description: 'Human-centered UI/UX design: user research, wireframes, interactive Figma prototypes, and design systems built ready for developer handoff.',
    features: [
      'Comprehensive user journey mapping',
      'Clickable interactive Figma prototypes',
      'Scalable design token systems',
      'Mobile-first responsive layouts'
    ]
  },
  {
    id: '11',
    icon: <FiSmartphone className="text-2xl text-[#06b6d4]" />,
    title: 'Mobile App Development',
    tag: 'iOS & Android',
    slug: 'app-development',
    href: '/services/app-development/',
    category: 'Design & Mobile',
    accent: '#06B6D4',
    accentBg: '#ECFEFF',
    accentBorder: '#A5F3FC',
    description: 'Cross-platform and native mobile apps built with React Native and Flutter. Smooth user experiences, cloud backends, and full store publishing.',
    features: [
      'Cross-platform iOS & Android code',
      'Offline caching & push notifications',
      'Secure biometrics & payment gateways',
      'App Store & Play Store deployment'
    ]
  },
  {
    id: '12',
    icon: <FiSearch className="text-2xl text-[#10b981]" />,
    title: 'Technical SEO Services',
    tag: 'Organic Growth',
    slug: 'seo',
    href: '/services/seo/',
    category: 'Web & CMS',
    accent: '#10B981',
    accentBg: '#ECFDF5',
    accentBorder: '#A7F3D0',
    description: 'Data-driven technical SEO audits, Core Web Vitals optimization, structured schema markup, and on-page architectures that compound organic traffic.',
    features: [
      'Full technical crawl audits',
      'Core Web Vitals performance tuning',
      'JSON-LD schema markup integration',
      'Site architecture & indexation fixes'
    ]
  },
  {
    id: '13',
    icon: <FiShield className="text-2xl text-[#f59e0b]" />,
    title: 'Website Maintenance & Care',
    tag: 'Proactive Support',
    slug: 'website-maintenance',
    href: '/services/website-maintenance/',
    category: 'Web & CMS',
    accent: '#F59E0B',
    accentBg: '#FFFBEB',
    accentBorder: '#FDE68A',
    description: '24/7 uptime monitoring, regular security patches, plugin updates, off-site backups, and monthly developer hours for ongoing improvements.',
    features: [
      'Weekly core & plugin updates',
      'Daily offsite automated backups',
      'Malware scans & security patching',
      'Dedicated monthly dev retainers'
    ]
  },
  {
    id: '14',
    icon: <FiLayers className="text-2xl text-[#ec4899]" />,
    title: 'Brand Design & Identity',
    tag: 'Visual Strategy',
    slug: 'brand-design',
    href: '/services/brand-design/',
    category: 'Design & Mobile',
    accent: '#EC4899',
    accentBg: '#FDF2F8',
    accentBorder: '#FBCFE8',
    description: 'Stand out in your market with distinctive logo design, brand guidelines, typography scales, color palettes, and marketing collateral.',
    features: [
      'Logo design & visual identity kits',
      'Comprehensive brand guidelines',
      'Vector typography & color rules',
      'Social & digital marketing assets'
    ]
  },
  {
    id: '15',
    icon: <FaUsers className="text-2xl text-[#6366f1]" />,
    title: 'Hire Dedicated Developers',
    tag: 'Staff Augmentation',
    slug: 'hire-dedicated-developers',
    href: '/hire-dedicated-developers/',
    category: 'Design & Mobile',
    accent: '#6366F1',
    accentBg: '#EEF2FF',
    accentBorder: '#C7D2FE',
    description: 'Hire dedicated, pre-vetted web and mobile developers on a flexible monthly basis. Seamless communication, US/CA/AU overlap, and 100% IP ownership.',
    features: [
      '160 hours/month dedicated engineers',
      '3 to 5 hours timezone overlap',
      'Direct integration in your Slack & Git',
      'Flexible monthly engagement models'
    ]
  }
];

const FAQS = [
  {
    q: "How quickly can we kick off a new project?",
    a: "After an initial discovery call, we provide a transparent scope of work and quotation within one business day. Dedicated developers can be onboarded in as little as 2 to 5 business days."
  },
  {
    q: "Do you collaborate with clients in the US, Canada, and Australia?",
    a: "Yes! The majority of our clients are based in North America and Australia. Our teams schedule daily working overlap of 3 to 5 hours for smooth standups, demos, and live communication."
  },
  {
    q: "Do we get full intellectual property and code ownership?",
    a: "100% yes. All source code, design assets, database configurations, and deliverables belong entirely to you from day one under strict confidentiality and non-disclosure agreements."
  },
  {
    q: "Can I hire a dedicated developer rather than a fixed-scope project?",
    a: "Absolutely. We offer dedicated full-time developers (160 hours/month) for WordPress, Shopify, React, Next.js, and Laravel who integrate directly into your team workflows and task boards."
  }
];

export default function ServicesPage() {
  const [filter, setFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { label: 'All Services', count: 15 },
    { label: 'Web & CMS', count: 6 },
    { label: 'eCommerce', count: 2 },
    { label: 'AI & Automation', count: 3 },
    { label: 'Design & Mobile', count: 4 }
  ];

  const filteredServices = servicesData.filter(s => {
    if (filter === 'All' || filter === 'All Services') return true;
    return s.category === filter;
  });

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-pink-500 selection:text-white">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-[140px] sm:pt-[170px] md:pt-[190px] pb-16 sm:pb-24 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden border-b border-slate-100">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-pink-100/50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-20 left-10 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-100/40 rounded-full blur-[130px] pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 bg-white/70 px-4 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <FiChevronRight size={12} />
            <span className="text-slate-700">Services</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-pink-200/80 bg-white/90 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] uppercase text-[#FF1F8E]">
                Full-Cycle Web &amp; App Engineering
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] sm:leading-[1.02] max-w-5xl mx-auto mb-6">
            Web Development Services Built for{" "}
            <span 
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Scale &amp; Conversion
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            From modern WordPress &amp; Shopify development to high-scale Next.js applications, AI automation, and dedicated engineering teams — delivered on time with clean, scalable code.
          </p>

          {/* Key Value Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 pb-2 border-t border-slate-200/60 max-w-4xl mx-auto text-xs sm:text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>15 Core Disciplines</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>120+ Completed Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>100% In-House Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span>3–5h US/CA/AU Overlap</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="py-16 sm:py-24 bg-slate-50/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Filter Pills */}
          <div className="flex items-center justify-center mb-12 sm:mb-16">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-white rounded-2xl border border-slate-200/90 shadow-sm max-w-full">
              {categories.map((cat) => {
                const isActive = filter === cat.label || (filter === 'All' && cat.label === 'All Services');
                return (
                  <button
                    key={cat.label}
                    onClick={() => setFilter(cat.label === 'All Services' ? 'All' : cat.label)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and ID */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: service.accentBg,
                        borderColor: service.accentBorder,
                      }}
                    >
                      {service.icon}
                    </div>
                    <span className="text-xs font-black text-slate-300 tracking-widest font-mono">
                      {service.id}
                    </span>
                  </div>

                  {/* Tag Pill */}
                  <div className="mb-3">
                    <span
                      className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 rounded-md"
                      style={{ 
                        color: service.accent,
                        backgroundColor: service.accentBg,
                        border: `1px solid ${service.accentBorder}`
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 group-hover:text-[#FF1F8E] transition-colors leading-snug">
                    <Link href={service.href}>
                      {service.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-100">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium leading-tight">
                        <FiCheckCircle
                          className="mt-0.5 shrink-0"
                          style={{ color: service.accent }}
                          size={15}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase transition-all duration-300"
                    style={{ color: service.accent }}
                  >
                    <span>Explore Service</span>
                    <FiArrowRight className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>

                  <Link
                    href="/contactus"
                    className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50"
                  >
                    Get Quote &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING QUALITY SECTION ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#FF1F8E] mb-3 block">
              The Webstep Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why High-Growth Teams Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Senior In-House Engineers</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No junior handoffs or unvetted freelancers. Dedicated developers with 4+ years of core technology experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Agile 2-Week Sprints</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct integration into your Slack, Jira, or Git. Continuous demo deployments so you always see working software.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Clean, Modular Code</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero bloated page builders or fragile hacks. Clean semantic HTML, scalable databases, and Core Web Vitals 95+.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">100% IP &amp; Code Ownership</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You own 100% of the repository, source code, and design assets from day one under binding enterprise NDAs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQS SECTION ── */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#FF1F8E] mb-2 block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#FF1F8E] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`transform transition-transform text-slate-400 ${openFaq === idx ? 'rotate-180 text-[#FF1F8E]' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-pink-400 mb-2 block">
                Let&apos;s Build Together
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mb-3 tracking-tight">
                Have a project or need dedicated developers?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Share your requirements with us today. We review your scope and provide a transparent, fixed-price or monthly dedicated quote within one business day.
              </p>
            </div>

            <div className="relative z-10 shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/contactus"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all text-center"
              >
                Request a Free Quote &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
