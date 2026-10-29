"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiShoppingCart, FiCpu, FiCode, FiLayers, FiGlobe, FiPackage, FiX, FiCheckCircle, FiActivity, FiShield, FiTrendingUp } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPhp, FaWordpress, FaVuejs } from 'react-icons/fa';
import { SiNextdotjs, SiLaravel, SiShopify } from 'react-icons/si';

const servicesData = [
  {
    id: '01', icon: <FaReact />,
    title: 'React.js Dev', fullTitle: 'React.js Development',
    tag: 'Frontend Architecture', span: 'b1', slug: 'reactjs',
    accent: '#0891B2', accentBg: '#ECFEFF', accentBorder: '#A5F3FC',
    headline: 'Build Lightning-Fast, Component-Driven Web Interfaces',
    description: 'We engineer high-performance single-page applications (SPAs), complex enterprise dashboards, and real-time interactive user interfaces using modern React ecosystem features like Hooks, Context API, and Concurrent rendering.',
    features: ['Custom SPA & Dashboard Engineering', 'State Management (Redux/Zustand) Mastery', 'Reusable Component Library Architecture', 'Legacy Codebase Migration to Modern React'],
    process: ['Requirement Mapping', 'Component Structuring', 'API Integration', 'Performance Tuning'],
  },
  {
    id: '02', icon: <SiNextdotjs />,
    title: 'Next.js Dev', fullTitle: 'Next.js Development',
    tag: 'Full Stack Framework', span: 'b2', slug: 'web-development',
    accent: '#0f172a', accentBg: '#F8FAFC', accentBorder: '#CBD5E1',
    headline: 'Production-Ready Apps with Absolute SEO Dominance',
    description: 'Leverage the power of Server-Side Rendering (SSR), Static Site Generation (SSG), and Edge Computing. We build SEO-optimized corporate web applications that score 100 on Core Web Vitals.',
    features: ['Hybrid Rendering (SSR & SSG) Setup', 'App Router & Layout Optimization', 'Automated Image & Asset Optimization', 'Serverless Functions & API Routes Architecture'],
    process: ['Architecture Blueprinting', 'Server-Side Layout Design', 'API & Edge Configuration', 'Core Web Vitals Auditing'],
  },
  {
    id: '03', icon: <FaVuejs />,
    title: 'Vue.js Dev', fullTitle: 'Vue.js Development',
    tag: 'Progressive Frontend', span: 'b3', slug: 'web-development',
    accent: '#059669', accentBg: '#ECFDF5', accentBorder: '#A7F3D0',
    headline: 'Elegant UI Frameworks for Fluid User Transitions',
    description: 'Crafting maintainable, flexible, and progressive frontend applications. Vue.js allows us to build powerful user interfaces that scale organically alongside your active business models.',
    features: ['Vue 3 Composition API Architectures', 'Pinia State Management Setup', 'High-Fidelity Transitions & Animation Controls', 'Seamless Multi-platform Viewports Integration'],
    process: ['Data Flow Mapping', 'Interface Prototyping', 'Composition Layering', 'Fluid Animation Syncing'],
  },
  {
    id: '04', icon: <FaNodeJs />,
    title: 'Node.js Backend', fullTitle: 'Node.js Core Infrastructure',
    tag: 'Backend Engineering', span: 'b4', slug: 'nodejs-development',
    accent: '#16A34A', accentBg: '#F0FDF4', accentBorder: '#BBF7D0',
    headline: 'Event-Driven Microservices Built for High Concurrency',
    description: 'Powering your web ecosystem with asynchronous, scalable backends. Our Node.js structures easily process millions of requests, real-time audio/video streaming, and complex enterprise data layers.',
    features: ['RESTful & GraphQL API Infrastructure', 'Real-time WebSocket Sync Processing', 'Microservices & Gateway Configurations', 'Express/NestJS Framework Standardization'],
    process: ['Database & Schema Architecture', 'Asynchronous Endpoint Mapping', 'Load Testing & Concurrency Tuning', 'Deployment Readying'],
  },
  {
    id: '05', icon: <FaPhp />,
    title: 'PHP Dev', fullTitle: 'Custom PHP Solutions',
    tag: 'Backend Automation', span: 'b5', slug: 'php-development',
    accent: '#7C3AED', accentBg: '#F5F3FF', accentBorder: '#DDD6FE',
    headline: 'Reliable Server-Side Scripts & Relational Frameworks',
    description: 'From customized modular data scripts to full-scale legacy management architectures, we build robust PHP frameworks capable of handling extensive data transformations securely.',
    features: ['Custom PHP Procedural/OOP Codebases', 'Legacy Database Optimization Schemes', 'Secure Third-Party Gateway Bindings', 'Automated Enterprise Data Scripting'],
    process: ['Legacy Audit & Architecture Map', 'Data Pipeline Security Setup', 'Modular Script Coding', 'Stress-testing Verification'],
  },
  {
    id: '06', icon: <SiLaravel />,
    title: 'Laravel Dev', fullTitle: 'Laravel Frameworks',
    tag: 'Enterprise Backend', span: 'b6', slug: 'laravel',
    accent: '#DC2626', accentBg: '#FEF2F2', accentBorder: '#FECACA',
    headline: 'Clean MVC Structures Engineered for Absolute Security',
    description: 'Deploying robust web apps with native authentication, automated migration handling, and expressive backend syntaxes. Ideal for safe SaaS portals and secure financial applications.',
    features: ['Elegant MVC Structure Implementation', 'Native Eloquent ORM Tuning', 'Queue Management & Job Background Schedulers', 'Advanced Role-Based Access Controls (RBAC)'],
    process: ['Database Relationship Mapping', 'Security Protocol Layering', 'Job Queue Optimizations', 'Penetration Testing Review'],
  },
  {
    id: '07', icon: <FaWordpress />,
    title: 'WordPress Core', fullTitle: 'WordPress Core Setup',
    tag: 'Content Management', span: 'b7', slug: 'wordpress',
    accent: '#0369A1', accentBg: '#F0F9FF', accentBorder: '#BAE6FD',
    headline: 'Headless or Standalone CMS Configured for Velocity',
    description: 'Transforming standard content engines into absolute speed hubs. We deliver headless WordPress decoupled architectures using REST APIs or GraphQL alongside secure standard environments.',
    features: ['Headless Decoupled API Setups', 'Advanced Custom Fields (ACF) Blueprints', 'Hardened Core Security Implementations', 'Multi-Site Multi-Tenant Architectures'],
    process: ['CMS Strategy & Asset Scoping', 'Database Structure Modeling', 'Hardened Security Firewalls Config', 'API Route Optimization'],
  },
  {
    id: '08', icon: <FiLayers />,
    title: 'WP Themes', fullTitle: 'Bespoke Theme Engineering',
    tag: 'CMS Style Layer', span: 'b8', slug: 'wordpress',
    accent: '#0284c7', accentBg: '#F0FAFF', accentBorder: '#BEE7FD',
    headline: 'Zero Bloat, Pixel-Perfect Theme Infrastructure',
    description: 'We avoid pre-made heavy templates completely. Our customized WordPress themes are hand-coded from scratch using strict semantic guidelines to promise maximum conversions.',
    features: ['Custom Scratch Block-Theme Builds', 'Figma/AdobeXD to WordPress Conversion', 'Modular Layout Composition Blocks', 'Strict Layout-Shift (CLS) Asset Tuning'],
    process: ['Design System Ingestion', 'Semantic Theme Formatting', 'Responsive Breakpoint Profiling', 'Page-Speed Standardization'],
  },
  {
    id: '09', icon: <FiCode />,
    title: 'WP Plugins', fullTitle: 'Custom Plugin Development',
    tag: 'CMS Custom Engines', span: 'b9', slug: 'wordpress',
    accent: '#4F46E5', accentBg: '#EEF2FF', accentBorder: '#C7D2FE',
    headline: 'Tailored Functionalities with No Performance Drops',
    description: 'Extend your standard operations securely. We write precise WordPress plugins following WordPress.org official coding standards to integrate unique workflows without bloating systems.',
    features: ['Custom Admin Widgets & Control Triggers', 'Third-Party CRM Connection Engines', 'Automated Lifecycle Extension Webhooks', 'Secure Widget Core Packaging'],
    process: ['Hook & Filter Structural Scoping', 'Security Variable Sanitization', 'Plugin Code Execution', 'Compatibility Regression Testing'],
  },
  {
    id: '10', icon: <FiPackage />,
    title: 'Shopify Themes', fullTitle: 'Shopify Storefront Design',
    tag: 'eCommerce Retail', span: 'b10', slug: 'shopify',
    accent: '#059669', accentBg: '#ECFDF5', accentBorder: '#A7F3D0',
    headline: 'High-Converting Digital Stores Tuned for Sales',
    description: 'Maximize your average order values (AOV) with lightning-fast Liquid templates. We design custom storefront architectures built specifically to keep retention high and drop-offs minimal.',
    features: ['Custom Liquid & Online Store 2.0 Templates', 'Mobile-First Quick Checkout Structures', 'Dynamic In-Cart Up-Sell Layout Integrations', 'Cross-Browser Asset Rendering Fixes'],
    process: ['Conversion Funnel Analysis', 'Liquid Template Frameworking', 'Interactive Event Testing', 'Launch-Ready Performance Sync'],
  },
  {
    id: '11', icon: <FiShoppingCart />,
    title: 'Shopify Apps', fullTitle: 'Shopify App Frameworks',
    tag: 'eCommerce Utility', span: 'b11', slug: 'shopify',
    accent: '#0D9488', accentBg: '#F0FDFA', accentBorder: '#99F6E4',
    headline: 'Synchronize Catalog Dependencies via Custom Tools',
    description: 'Build robust internal or public Shopify extensions. Our team creates secure embedded applications that control inventory logic, logistics routing, and real-time custom product builders.',
    features: ['Embedded Shopify App Bridge Systems', 'Real-time Webhook Payload Schedulers', 'Inventory Automation Extensions', 'Custom ERP Synchronization Modules'],
    process: ['GraphQL Admin API Mapping', 'App Bridge Context Setup', 'Secure Middleware Ingestion', 'Shopify Store Regression Audit'],
  },
  {
    id: '12', icon: <FiCpu />,
    title: 'AI Chatbots', fullTitle: 'Autonomous AI Chatbots',
    tag: 'Artificial Intelligence', span: 'b12', slug: 'ai-chatbots',
    accent: '#E11D48', accentBg: '#FFF1F2', accentBorder: '#FECDD3',
    headline: 'Intelligent Support Agents Operating 24/7 Contextually',
    description: 'Automate customer queries up to 80% without losing human touch. We build conversational agents that understand customer intents and resolve system tickets dynamically.',
    features: ['Context-Aware LLM Response Logic', 'Live Multi-Platform Sync (WhatsApp, Web)', 'Custom Internal Ticketing System Routing', 'Automated Intent Training Triggers'],
    process: ['Intent & Knowledge Training Setups', 'Prompt Injection Defense Layout', 'Live Context Flow Mapping', 'Response Quality Scoring'],
  },
  {
    id: '13', icon: <FiGlobe />,
    title: 'AI Integration', fullTitle: 'Enterprise AI Syncing',
    tag: 'Artificial Intelligence', span: 'b13', slug: 'ai-automation',
    accent: '#D946EF', accentBg: '#FDF4FF', accentBorder: '#F5D0FE',
    headline: 'Embed Machine Learning Logic into Standard Workflows',
    description: 'Supercharge your daily enterprise tools. We link OpenAI, Anthropic, or fine-tuned custom open-source models right into your internal CRMs or product engines to handle automated categorization.',
    features: ['Vector Database Engineering (Pinecone/Chroma)', 'Retrieval-Augmented Generation (RAG) Architecture', 'Semantic Search & Categorization Pipelines', 'Automated Data Extraction Models'],
    process: ['Enterprise Data Asset Sifting', 'Vector Index Pipeline Design', 'LLM Guardrail Ingestion', 'Production Pipeline Live Validation'],
  },
];

const spanStyles = {
  b1: { gridColumn: 'span 2' }, b2: { gridColumn: 'span 2' }, b3: { gridColumn: 'span 2' },
  b4: { gridColumn: 'span 2' }, b5: { gridColumn: 'span 2' }, b6: { gridColumn: 'span 2' },
  b7: { gridColumn: 'span 2' }, b8: { gridColumn: 'span 2' }, b9: { gridColumn: 'span 2' },
  b10: { gridColumn: 'span 2' }, b11: { gridColumn: 'span 2' }, b12: { gridColumn: 'span 2' },
  b13: { gridColumn: 'span 4' },
};

const spanStylesDesktop = {
  b1: { gridColumn: 'span 2' }, b2: { gridColumn: 'span 2' }, b3: { gridColumn: 'span 2' },
  b4: { gridColumn: 'span 3' }, b5: { gridColumn: 'span 3' },
  b6: { gridColumn: 'span 2' }, b7: { gridColumn: 'span 2' }, b8: { gridColumn: 'span 2' },
  b9: { gridColumn: 'span 2' }, b10: { gridColumn: 'span 2' }, b11: { gridColumn: 'span 2' },
  b12: { gridColumn: 'span 3' }, b13: { gridColumn: 'span 3' },
};

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

function BentoBox({ service, spanStyle, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isWide = ['b4', 'b5', 'b12', 'b13'].includes(service.span);

  return (
    <div
      onClick={() => onSelect(service)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...spanStyle,
        borderRadius: '20px', padding: '1.5rem',
        border: `1.5px solid ${hovered ? service.accentBorder : '#f1f5f9'}`,
        background: hovered ? service.accentBg : '#fff',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.25s ease', cursor: 'pointer',
        boxShadow: hovered ? `0 8px 30px ${service.accent}20` : 'none',
        height: '100%', minHeight: isWide ? '140px' : '180px',
        display: 'flex', flexDirection: isWide ? 'row' : 'column',
        alignItems: isWide ? 'center' : 'flex-start', gap: isWide ? '1.5rem' : 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: service.accent, opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
      }} />
      <span style={{
        position: 'absolute', bottom: '-8px', right: '10px',
        fontSize: '4.5rem', fontWeight: 900, color: service.accent,
        opacity: 0.06, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>
        {service.id}
      </span>

      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', marginBottom: isWide ? 0 : '1rem',
          background: hovered ? '#fff' : service.accentBg,
          color: service.accent, border: `1.5px solid ${service.accentBorder}`,
          transition: 'background 0.2s', flexShrink: 0,
        }}>
          {service.icon}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: service.accent, margin: '0 0 4px 0' }}>
          {service.tag}
        </p>
        <h3 style={{
          fontSize: isWide ? '1.15rem' : '1rem', fontWeight: 700, color: '#0f172a',
          letterSpacing: '-0.01em', lineHeight: 1.2, margin: '0 0 6px 0',
        }}>
          {service.fullTitle}
        </h3>
        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, fontWeight: 500, flex: 1, margin: '0 0 0.8rem 0' }}>
          {service.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: service.accent }}>
            Explore
            <FiArrowRight size={11} style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
          </div>
          <Link
            href={`/services/${service.slug}`}
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}
            className="hover:underline"
          >
            Direct Page &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

const ServicesPage = () => {
  const width = useWindowWidth();
  const [selectedService, setSelectedService] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const gridCols = isMobile ? 'repeat(1, 1fr)' : isTablet ? 'repeat(4, 1fr)' : 'repeat(6, 1fr)';
  const getSpanStyle = (span) => {
    if (isMobile) return { gridColumn: 'span 1' };
    if (isTablet) return spanStyles[span];
    return spanStylesDesktop[span];
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
    setTimeout(() => setSelectedService(null), 300); // Clear data after animation completes
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        .services-section * { font-family: 'Roboto', sans-serif; box-sizing: border-box; }
        .cta-services-btn:hover { background: #7C3AED !important; }
        .drawer-close-btn:hover { background: #f1f5f9; transform: rotate(90deg); }
        .drawer-cta:hover { filter: brightness(1.1); }
      `}</style>

      <section className="services-section" style={{
        background: '#fff',
        padding: isMobile ? '6rem 1rem' : isTablet ? '8rem 1.5rem' : '12rem 1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background Radial Glow */}
        <div style={{
          position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '350px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '2px', background: '#7C3AED' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#7C3AED' }}>
                Our Technology Stack
              </span>
              <div style={{ width: '36px', height: '2px', background: '#7C3AED' }} />
            </div>
            <h1 style={{
              fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
            }}>
              Web Development{" "}
              <span style={{
                background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Services
              </span>
            </h1>
            <p style={{ fontSize: isMobile ? '14px' : '16px', color: '#64748b', marginTop: '0.75rem', fontWeight: 500, maxWidth: '650px', margin: '0.75rem auto 0', lineHeight: 1.6 }}>
              Production-ready web development covering Websites & Web Apps, WordPress, Shopify, APIs & Integrations, AI Solutions, and Dedicated Developers.
            </p>
          </div>

          <h2 className="sr-only">Website & Web Apps, WordPress & WooCommerce, Shopify & eCommerce, APIs, AI Solutions & Dedicated Developers</h2>

          {/* Bento Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: isMobile ? '10px' : '12px', marginBottom: '2.5rem' }}>
            {servicesData.map((s) => (
              <BentoBox key={s.id} service={s} spanStyle={getSpanStyle(s.span)} onSelect={handleSelectService} />
            ))}
          </div>
        </div>

        {/* ================= MODERN SIDEBAR DRAWER PANEL ================= */}
        {/* Backdrop Overlay */}
        <div
          onClick={handleCloseDrawer}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)',
            zIndex: 999, opacity: isDrawerOpen ? 1 : 0, pointerEvents: isDrawerOpen ? 'all' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Drawer Structure */}
        <div
          style={{
            position: 'fixed', backgroundColor: '#fff', zIndex: 1000,
            boxShadow: isMobile ? '0 -10px 35px rgba(0,0,0,0.12)' : '-10px 0 35px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex', flexDirection: 'column',
            ...(isMobile ? {
              bottom: 0, left: 0, width: '100%', height: '85vh',
              borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
              transform: isDrawerOpen ? 'translateY(0)' : 'translateY(100%)',
            } : {
              top: '8rem', right: 0, width: '520px', height: 'calc(100vh - 8rem)',
              transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
            })
          }}
        >
          {selectedService && (
            <>
              {/* Drawer Header */}
              <div style={{
                padding: '1.5rem', borderBottom: '1px solid #f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: selectedService.accentBg, color: selectedService.accent,
                    border: `1.5px solid ${selectedService.accentBorder}`, fontSize: '18px'
                  }}>
                    {selectedService.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: selectedService.accent }}>
                      {selectedService.tag}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                      {selectedService.fullTitle}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="drawer-close-btn"
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                    background: '#f8fafc', color: '#64748b', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Drawer Content Body (Scrollable) */}
              <div style={{ padding: '2rem 1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Headline Section */}
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {selectedService.headline}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                    {selectedService.description}
                  </p>
                </div>

                {/* Core Capabilities */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiShield style={{ color: selectedService.accent }} /> Core Capabilities
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {selectedService.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <FiCheckCircle size={15} style={{ color: selectedService.accent, marginTop: '2px', flexShrink: 0 }} />
                        <p style={{ fontSize: '13px', color: '#334155', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Roadmap */}
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiActivity style={{ color: selectedService.accent }} /> Deployment Roadmap
                  </h4>
                  <div style={{ borderLeft: `2px dashed ${selectedService.accentBorder}`, paddingLeft: '1.25rem', marginLeft: '6px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {selectedService.process.map((proc, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-27px', top: '3px', width: '12px', height: '12px', borderRadius: '50%', background: '#FFF', border: `3.5px solid ${selectedService.accent}` }} />
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Phase 0{idx + 1}</span>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#334155', margin: '1px 0 0 0' }}>{proc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer CTA */}
              <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #f1f5f9', background: '#fff', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href={`/services/${selectedService.slug}`} onClick={handleCloseDrawer} style={{ textDecoration: 'none' }}>
                  <button
                    className="drawer-cta"
                    style={{
                      width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                      background: selectedService.accent, color: '#fff', fontWeight: 700,
                      fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', transition: 'all 0.2s', boxShadow: `0 4px 20px ${selectedService.accent}30`
                    }}
                  >
                    View Full {selectedService.title.split(' ')[0]} Service Details <FiArrowRight size={14} />
                  </button>
                </Link>
                <Link
                  href="/customize-package"
                  onClick={handleCloseDrawer}
                  style={{ textDecoration: 'none', textAlign: 'center', fontSize: '12px', color: '#64748b', fontWeight: 600 }}
                >
                  Or customize your project package &rarr;
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;