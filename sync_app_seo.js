const fs = require('fs');
const path = require('path');

function createPageCode({ importComp, compJSX, slug, title, description, noIndex, canonical, jsonLd }) {
  const robotsLine = noIndex ? `,\n    robots: { index: false, follow: false }` : '';
  const canonicalLine = canonical ? `,\n    alternates: {\n      canonical: ${JSON.stringify(canonical)},\n    }` : '';
  
  let jsonLdJSX = '';
  if (jsonLd) {
    jsonLdJSX = `\n      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(jsonLd)}) }}
      />`;
  }

  return `import React from 'react';
${importComp}
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata(${JSON.stringify(slug)});
  return {
    title: dynamicSeo.title || ${JSON.stringify(title)},
    description: dynamicSeo.description || ${JSON.stringify(description)},
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})${canonicalLine}${robotsLine}
  };
}

export default function Page() {
  return (
    <>
      ${compJSX}${jsonLdJSX}
    </>
  );
}
`;
}

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Webstep Solutions",
  "url": "https://webstepdev.com/",
  "logo": "https://webstepdev.com/demo/webstepnext/logo.png",
  "image": "https://webstepdev.com/demo/webstepnext/development-company.png",
  "description": "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Dedicated developers available.",
  "telephone": "+917973938927",
  "email": "info@webstepsolutions.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "E-45 Industrial Area Phase-8",
    "addressLocality": "Mohali",
    "addressRegion": "Punjab",
    "postalCode": "160071",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.7046",
    "longitude": "76.7179"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/webstepsolutions/"
  ],
  "priceRange": "$$"
};

const hireFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How quickly can a developer start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically within 2 to 5 business days after requirements alignment and candidate selection."
      }
    },
    {
      "@type": "Question",
      "name": "What engagement models do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer Dedicated Full-Time (40 hrs/week), Part-Time (20 hrs/week), and custom Project-Based Pods with dedicated QA and PM."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle time-zone differences?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our developers provide 3-5 hours of daily overlap with US (EST/PST), UK (GMT), Canadian, and Australian business hours for standups and real-time collaboration."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns the source code and IP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do. You retain 100% full intellectual property (IP) rights, source code ownership, and repository access from day one."
      }
    },
    {
      "@type": "Question",
      "name": "What if the developer isn't the right fit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a zero-risk replacement guarantee. If a developer isn't the right fit within the first two weeks, we replace them at no extra charge or issue a full refund for that period."
      }
    },
    {
      "@type": "Question",
      "name": "Can I interview developers before hiring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can review CVs/portfolios and conduct live technical interviews before confirming any developer."
      }
    },
    {
      "@type": "Question",
      "name": "How do we communicate daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Via your preferred channels: Slack, Microsoft Teams, Discord, Jira, Trello, Asana, or GitHub, with daily async standups and weekly sprint calls."
      }
    },
    {
      "@type": "Question",
      "name": "Do you sign an NDA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We sign strict Non-Disclosure Agreements (NDAs) and confidentiality agreements before sharing any project materials or starting work."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if a developer is sick or unavailable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide immediate backup coverage from our in-house engineering bench so your delivery schedule and sprint milestones remain unaffected."
      }
    }
  ]
};

const pages = [
  // 1. Home
  {
    filePath: 'src/app/page.js',
    importComp: `import Home from '@/components/HomePage/Home';`,
    compJSX: `<Home />`,
    slug: '/',
    title: 'Web Development Company for Agencies & Growing Businesses | Webstep Solutions',
    description: 'Webstep Solutions delivers custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Dedicated developers available.',
    canonical: 'https://webstepdev.com/',
    jsonLd: homeSchema
  },

  // 2. About
  {
    filePath: 'src/app/about/page.js',
    importComp: `import AboutHero from '@/components/About/AboutHero';
import AboutStory from '@/components/About/AboutStory';
import AboutValues from '@/components/About/AboutValues';
import BlogReview from '@/components/Blog/BlogReview';
import Customer from '@/components/Customer';
import FormSection from '@/components/FormSection';`,
    compJSX: `<main className="bg-white min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <BlogReview />
      <Customer />
      <FormSection />
    </main>`,
    slug: 'about',
    title: 'About Webstep Solutions | Web Development Team & Culture',
    description: 'Meet Webstep Solutions — a dedicated web development company founded in 2014. We help agencies and growing brands build better digital products.',
    canonical: 'https://webstepdev.com/about/'
  },

  // 3. Services Hub
  {
    filePath: 'src/app/services/page.js',
    importComp: `import ServicesPage from '@/components/ServicesPage';`,
    compJSX: `<ServicesPage />`,
    slug: 'services',
    title: 'Web Development Services | WordPress, Shopify, Next.js, Laravel | Webstep Solutions',
    description: 'Explore Webstep Solutions\' full suite of web development services: WordPress, Shopify, WooCommerce, React.js, Next.js, Laravel, and AI integrations.',
    canonical: 'https://webstepdev.com/services/'
  },

  // 4. Web Development (Canonical under /services/web-development/)
  {
    filePath: 'src/app/services/web-development/page.js',
    importComp: `import FullStack from '@/components/Fullstack/FullStack';`,
    compJSX: `<FullStack />`,
    slug: 'services/web-development',
    title: 'Custom Web Development Services | Next.js, React & Laravel | Webstep Solutions',
    description: 'High-performance custom web applications built on Next.js, React, and modern full-stack architectures. Fast, accessible, and engineered for conversion.',
    canonical: 'https://webstepdev.com/services/web-development/'
  },
  {
    filePath: 'src/app/web-development/page.js',
    importComp: `import FullStack from '@/components/Fullstack/FullStack';`,
    compJSX: `<FullStack />`,
    slug: 'web-development',
    title: 'Custom Web Development Services | Next.js, React & Laravel | Webstep Solutions',
    description: 'High-performance custom web applications built on Next.js, React, and modern full-stack architectures. Fast, accessible, and engineered for conversion.',
    canonical: 'https://webstepdev.com/services/web-development/'
  },

  // 5. WordPress (Canonical under /services/wordpress/)
  {
    filePath: 'src/app/services/wordpress/page.js',
    importComp: `import Wp from '@/components/Wp/Wp';`,
    compJSX: `<Wp />`,
    slug: 'services/wordpress',
    title: 'Custom WordPress Development Company | Themes & Plugins | Webstep Solutions',
    description: 'Custom WordPress development by Webstep Solutions: hand-coded themes, bespoke plugins, WooCommerce, and headless WordPress with Next.js. No page builders.',
    canonical: 'https://webstepdev.com/services/wordpress/'
  },
  {
    filePath: 'src/app/wordpress/page.js',
    importComp: `import Wp from '@/components/Wp/Wp';`,
    compJSX: `<Wp />`,
    slug: 'wordpress',
    title: 'Custom WordPress Development Company | Themes & Plugins | Webstep Solutions',
    description: 'Custom WordPress development by Webstep Solutions: hand-coded themes, bespoke plugins, WooCommerce, and headless WordPress with Next.js. No page builders.',
    canonical: 'https://webstepdev.com/services/wordpress/'
  },

  // 6. Shopify (Canonical under /services/shopify/)
  {
    filePath: 'src/app/services/shopify/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="shopify" />`,
    slug: 'services/shopify',
    title: 'Shopify Development Services | Themes, Apps & Shopify Plus | Webstep Solutions',
    description: 'Custom Shopify themes, Liquid development, private apps, and Shopify Plus setups engineered to increase conversions and average order value.',
    canonical: 'https://webstepdev.com/services/shopify/'
  },
  {
    filePath: 'src/app/shopify/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="shopify" />`,
    slug: 'shopify',
    title: 'Shopify Development Services | Themes, Apps & Shopify Plus | Webstep Solutions',
    description: 'Custom Shopify themes, Liquid development, private apps, and Shopify Plus setups engineered to increase conversions and average order value.',
    canonical: 'https://webstepdev.com/services/shopify/'
  },

  // 7. WooCommerce (Canonical under /services/woocommerce/)
  {
    filePath: 'src/app/services/woocommerce/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="woocommerce" />`,
    slug: 'services/woocommerce',
    title: 'WooCommerce Development Services | Custom Online Stores | Webstep Solutions',
    description: 'Tailored WooCommerce development for high-volume stores: custom themes, payment gateway integration, subscription architecture, and speed optimization.',
    canonical: 'https://webstepdev.com/services/woocommerce/'
  },
  {
    filePath: 'src/app/woocommerce/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="woocommerce" />`,
    slug: 'woocommerce',
    title: 'WooCommerce Development Services | Custom Online Stores | Webstep Solutions',
    description: 'Tailored WooCommerce development for high-volume stores: custom themes, payment gateway integration, subscription architecture, and speed optimization.',
    canonical: 'https://webstepdev.com/services/woocommerce/'
  },

  // 8. Laravel (Canonical under /services/laravel/)
  {
    filePath: 'src/app/services/laravel/page.js',
    importComp: `import Laravel from '@/components/laravel/Laravel';`,
    compJSX: `<Laravel />`,
    slug: 'services/laravel',
    title: 'Laravel Development Company | Custom PHP Web Applications | Webstep Solutions',
    description: 'Secure, scalable Laravel web applications and REST APIs built with clean MVC architecture, database optimization, and enterprise-grade security.',
    canonical: 'https://webstepdev.com/services/laravel/'
  },
  {
    filePath: 'src/app/laravel/page.js',
    importComp: `import Laravel from '@/components/laravel/Laravel';`,
    compJSX: `<Laravel />`,
    slug: 'laravel',
    title: 'Laravel Development Company | Custom PHP Web Applications | Webstep Solutions',
    description: 'Secure, scalable Laravel web applications and REST APIs built with clean MVC architecture, database optimization, and enterprise-grade security.',
    canonical: 'https://webstepdev.com/services/laravel/'
  },

  // 9. React.js & Next.js (Canonical under /services/reactjs/)
  {
    filePath: 'src/app/services/reactjs/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="reactjs" />`,
    slug: 'services/reactjs',
    title: 'React.js & Next.js Development Services | Webstep Solutions',
    description: 'Dynamic, blazing-fast web applications built with React.js and Next.js. Server-side rendering, optimized performance, and pixel-perfect UI execution.',
    canonical: 'https://webstepdev.com/services/reactjs/'
  },
  {
    filePath: 'src/app/reactjs/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="reactjs" />`,
    slug: 'reactjs',
    title: 'React.js & Next.js Development Services | Webstep Solutions',
    description: 'Dynamic, blazing-fast web applications built with React.js and Next.js. Server-side rendering, optimized performance, and pixel-perfect UI execution.',
    canonical: 'https://webstepdev.com/services/reactjs/'
  },

  // 10. PHP Development (Canonical under /services/php-development/)
  {
    filePath: 'src/app/services/php-development/page.js',
    importComp: `import Php from '@/components/php/Php';`,
    compJSX: `<Php />`,
    slug: 'services/php-development',
    title: 'Custom PHP Development Services | Webstep Solutions',
    description: 'Custom PHP development, legacy code modernization, database optimization, and third-party API integrations by senior PHP engineers.',
    canonical: 'https://webstepdev.com/services/php-development/'
  },
  {
    filePath: 'src/app/php/page.js',
    importComp: `import Php from '@/components/php/Php';`,
    compJSX: `<Php />`,
    slug: 'php',
    title: 'Custom PHP Development Services | Webstep Solutions',
    description: 'Custom PHP development, legacy code modernization, database optimization, and third-party API integrations by senior PHP engineers.',
    canonical: 'https://webstepdev.com/services/php-development/'
  },

  // 11. eCommerce (Canonical under /services/ecommerce/)
  {
    filePath: 'src/app/services/ecommerce/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="ecommerce" />`,
    slug: 'services/ecommerce',
    title: 'eCommerce Development Services | Shopify & WooCommerce | Webstep Solutions',
    description: 'End-to-end eCommerce development on Shopify, WooCommerce, and custom headless stacks. Optimized product catalogs, checkout flows, and ERP integrations.',
    canonical: 'https://webstepdev.com/services/ecommerce/'
  },
  {
    filePath: 'src/app/ecommerce/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="ecommerce" />`,
    slug: 'ecommerce',
    title: 'eCommerce Development Services | Shopify & WooCommerce | Webstep Solutions',
    description: 'End-to-end eCommerce development on Shopify, WooCommerce, and custom headless stacks. Optimized product catalogs, checkout flows, and ERP integrations.',
    canonical: 'https://webstepdev.com/services/ecommerce/'
  },

  // 12. Website Maintenance (Canonical under /services/website-maintenance/)
  {
    filePath: 'src/app/services/website-maintenance/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="website-maintenance" />`,
    slug: 'services/website-maintenance',
    title: 'Website Maintenance & Support Plans | Webstep Solutions',
    description: 'Proactive website maintenance for WordPress, Shopify, and custom stacks: security patching, plugin updates, speed monitoring, and dedicated developer hours.',
    canonical: 'https://webstepdev.com/services/website-maintenance/'
  },
  {
    filePath: 'src/app/website-maintenance/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="website-maintenance" />`,
    slug: 'website-maintenance',
    title: 'Website Maintenance & Support Plans | Webstep Solutions',
    description: 'Proactive website maintenance for WordPress, Shopify, and custom stacks: security patching, plugin updates, speed monitoring, and dedicated developer hours.',
    canonical: 'https://webstepdev.com/services/website-maintenance/'
  },

  // 13. AI Chatbots (Canonical under /services/ai-chatbots/)
  {
    filePath: 'src/app/services/ai-chatbots/page.js',
    importComp: `import AIChatbotsServicePage from '@/components/AIChatbots/AIChatbotsServicePage';`,
    compJSX: `<AIChatbotsServicePage />`,
    slug: 'services/ai-chatbots',
    title: 'Custom AI Chatbot Development & Virtual Assistants | Webstep Solutions',
    description: 'Custom AI chatbots and virtual assistants that handle customer support, qualify leads, and automate workflows 24/7 across web and WhatsApp.',
    canonical: 'https://webstepdev.com/services/ai-chatbots/'
  },
  {
    filePath: 'src/app/ai-chatbots/page.js',
    importComp: `import AIChatbotsServicePage from '@/components/AIChatbots/AIChatbotsServicePage';`,
    compJSX: `<AIChatbotsServicePage />`,
    slug: 'ai-chatbots',
    title: 'Custom AI Chatbot Development & Virtual Assistants | Webstep Solutions',
    description: 'Custom AI chatbots and virtual assistants that handle customer support, qualify leads, and automate workflows 24/7 across web and WhatsApp.',
    canonical: 'https://webstepdev.com/services/ai-chatbots/'
  },

  // 14. AI Automation (Canonical under /services/ai-automation/)
  {
    filePath: 'src/app/services/ai-automation/page.js',
    importComp: `import AIAutomationPage from '@/components/AIAutomation/AIAutomationPage';`,
    compJSX: `<AIAutomationPage />`,
    slug: 'services/ai-automation',
    title: 'AI Automation & Workflow Integration Services | Webstep Solutions',
    description: 'Intelligent workflow automation and AI integrations connecting your CRMs, ERPs, and databases with modern LLMs and machine learning models.',
    canonical: 'https://webstepdev.com/services/ai-automation/'
  },
  {
    filePath: 'src/app/ai-automation/page.js',
    importComp: `import AIAutomationPage from '@/components/AIAutomation/AIAutomationPage';`,
    compJSX: `<AIAutomationPage />`,
    slug: 'ai-automation',
    title: 'AI Automation & Workflow Integration Services | Webstep Solutions',
    description: 'Intelligent workflow automation and AI integrations connecting your CRMs, ERPs, and databases with modern LLMs and machine learning models.',
    canonical: 'https://webstepdev.com/services/ai-automation/'
  },

  // 15. AI Powered Websites (Canonical under /services/ai-powered-websites/)
  {
    filePath: 'src/app/services/ai-powered-websites/page.js',
    importComp: `import AIPoweredWebsitesPage from '@/components/AIPoweredWebsites/AIPoweredWebsitesPage';`,
    compJSX: `<AIPoweredWebsitesPage />`,
    slug: 'services/ai-powered-websites',
    title: 'AI-Powered Website Development | Webstep Solutions',
    description: 'Next-generation websites with built-in AI search, personalized recommendations, automated content pipelines, and intelligent user experiences.',
    canonical: 'https://webstepdev.com/services/ai-powered-websites/'
  },
  {
    filePath: 'src/app/ai-powered-websites/page.js',
    importComp: `import AIPoweredWebsitesPage from '@/components/AIPoweredWebsites/AIPoweredWebsitesPage';`,
    compJSX: `<AIPoweredWebsitesPage />`,
    slug: 'ai-powered-websites',
    title: 'AI-Powered Website Development | Webstep Solutions',
    description: 'Next-generation websites with built-in AI search, personalized recommendations, automated content pipelines, and intelligent user experiences.',
    canonical: 'https://webstepdev.com/services/ai-powered-websites/'
  },

  // 16. Brand Design (Canonical under /services/brand-design/)
  {
    filePath: 'src/app/services/brand-design/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="brand-design" />`,
    slug: 'services/brand-design',
    title: 'Brand Design & Identity Services | Webstep Solutions',
    description: 'Complete brand identity design: logos, design systems, typography guidelines, and brand collateral that make your business instantly recognizable.',
    canonical: 'https://webstepdev.com/services/brand-design/'
  },
  {
    filePath: 'src/app/brand-design/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="brand-design" />`,
    slug: 'brand-design',
    title: 'Brand Design & Identity Services | Webstep Solutions',
    description: 'Complete brand identity design: logos, design systems, typography guidelines, and brand collateral that make your business instantly recognizable.',
    canonical: 'https://webstepdev.com/services/brand-design/'
  },

  // 17. Email Marketing (Canonical under /services/email-marketing/)
  {
    filePath: 'src/app/services/email-marketing/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="email-marketing" />`,
    slug: 'services/email-marketing',
    title: 'Responsive Email Template Design & Development | Webstep Solutions',
    description: 'Hand-coded, responsive HTML email templates tested across all major email clients (Gmail, Outlook, Apple Mail) and marketing automation platforms.',
    canonical: 'https://webstepdev.com/services/email-marketing/'
  },
  {
    filePath: 'src/app/email-marketing/page.js',
    importComp: `import ServiceDetailPage from '@/components/Servicedetailpage';`,
    compJSX: `<ServiceDetailPage serviceSlug="email-marketing" />`,
    slug: 'email-marketing',
    title: 'Responsive Email Template Design & Development | Webstep Solutions',
    description: 'Hand-coded, responsive HTML email templates tested across all major email clients (Gmail, Outlook, Apple Mail) and marketing automation platforms.',
    canonical: 'https://webstepdev.com/services/email-marketing/'
  },

  // 18. Social Media (Canonical under /services/social-media/)
  {
    filePath: 'src/app/services/social-media/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/social-media" />`,
    slug: 'services/social-media',
    title: 'Social Media Creative & Digital Assets | Webstep Solutions',
    description: 'High-impact visual assets and creative collateral for social media campaigns that reinforce your brand identity and drive engagement.',
    canonical: 'https://webstepdev.com/services/social-media/'
  },
  {
    filePath: 'src/app/social-media/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="social-media" />`,
    slug: 'social-media',
    title: 'Social Media Creative & Digital Assets | Webstep Solutions',
    description: 'High-impact visual assets and creative collateral for social media campaigns that reinforce your brand identity and drive engagement.',
    canonical: 'https://webstepdev.com/services/social-media/'
  },

  // 19. Hire Developers
  {
    filePath: 'src/app/hire-full-time-developers/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="hire-full-time-developers" />`,
    slug: 'hire-full-time-developers',
    title: 'Hire Dedicated Developers for Your Web Projects | Webstep Solutions',
    description: 'Hire dedicated full-time WordPress, Shopify, React, and Laravel developers monthly. Flexible engagement models, US/CA/AU time-zone overlap, NDA protected.',
    canonical: 'https://webstepdev.com/hire-full-time-developers/',
    jsonLd: hireFaqSchema
  },
  {
    filePath: 'src/app/b2b-sales/page.js',
    importComp: `import B2BSalesPage from '@/components/B2BSalesPage';`,
    compJSX: `<B2BSalesPage />`,
    slug: 'b2b-sales',
    title: 'Hire Dedicated Developers for Your Web Projects | Webstep Solutions',
    description: 'Hire dedicated full-time WordPress, Shopify, React, and Laravel developers monthly. Flexible engagement models, US/CA/AU time-zone overlap, NDA protected.',
    canonical: 'https://webstepdev.com/hire-full-time-developers/'
  },

  // 20. Case Studies
  {
    filePath: 'src/app/case-study/page.js',
    importComp: `import Casestudiespage from '@/components/CaseStudies/Casestudiespage';`,
    compJSX: `<Casestudiespage />`,
    slug: 'case-study',
    title: 'Case Studies & Portfolio | Web Development Work | Webstep Solutions',
    description: 'Explore Webstep Solutions\' portfolio: 120+ delivered projects across healthcare, fintech, SaaS, eCommerce, and education with verified metrics.',
    canonical: 'https://webstepdev.com/case-study/'
  },
  {
    filePath: 'src/app/works/page.js',
    importComp: `import WorkPortfolio from '@/components/ourworks/WorkPortfolio';`,
    compJSX: `<WorkPortfolio />`,
    slug: 'works',
    title: 'Case Studies & Portfolio | Web Development Work | Webstep Solutions',
    description: 'Explore Webstep Solutions\' portfolio: 120+ delivered projects across healthcare, fintech, SaaS, eCommerce, and education with verified metrics.',
    canonical: 'https://webstepdev.com/case-study/'
  },
  {
    filePath: 'src/app/projects/page.js',
    importComp: `import OurProjects from '@/components/Projects/OurProjects';`,
    compJSX: `<OurProjects />`,
    slug: 'projects',
    title: 'Case Studies & Portfolio | Web Development Work | Webstep Solutions',
    description: 'Explore Webstep Solutions\' portfolio: 120+ delivered projects across healthcare, fintech, SaaS, eCommerce, and education with verified metrics.',
    canonical: 'https://webstepdev.com/case-study/'
  },

  // 21. Packages
  {
    filePath: 'src/app/packages/page.js',
    importComp: `import Packages from '@/components/Packages';`,
    compJSX: `<Packages />`,
    slug: 'packages',
    title: 'Web Development Packages & Transparent Pricing | Webstep Solutions',
    description: 'Transparent web development packages for websites, eCommerce stores, and dedicated developer hiring. Compare plans and request a custom quote.',
    canonical: 'https://webstepdev.com/packages/'
  },

  // 22. Customize Package
  {
    filePath: 'src/app/customize-package/page.js',
    importComp: `import CustomizePackage from '@/components/CustomizePackage';`,
    compJSX: `<React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading package customizer...</div>}>
      <CustomizePackage />
    </React.Suspense>`,
    slug: 'customize-package',
    title: 'Customize Your Web Development Package | Webstep Solutions',
    description: 'Build a custom web development package tailored to your exact project scope, technology requirements, and timeline. Instant quote estimate.',
    canonical: 'https://webstepdev.com/customize-package/'
  },

  // 23. Contact
  {
    filePath: 'src/app/contact/page.js',
    importComp: `import Contact from '@/components/contactus/Contact';`,
    compJSX: `<Contact />`,
    slug: 'contact',
    title: 'Contact Webstep Solutions | Start Your Web Project Today',
    description: 'Get in touch with Webstep Solutions for a detailed project consultation. We respond within one business day. Call +91 7973938927 or send your requirements.',
    canonical: 'https://webstepdev.com/contact/'
  },
  {
    filePath: 'src/app/contactus/page.js',
    importComp: `import Contact from '@/components/contactus/Contact';`,
    compJSX: `<Contact />`,
    slug: 'contactus',
    title: 'Contact Webstep Solutions | Start Your Web Project Today',
    description: 'Get in touch with Webstep Solutions for a detailed project consultation. We respond within one business day. Call +91 7973938927 or send your requirements.',
    canonical: 'https://webstepdev.com/contact/'
  },

  // 24. Blog
  {
    filePath: 'src/app/blog/page.js',
    importComp: `import Blog from '@/components/Blog/Blog';`,
    compJSX: `<Blog />`,
    slug: 'blog',
    title: 'Web Development Insights, Guides & Trends | Webstep Solutions Blog',
    description: 'Practical guides, architecture deep-dives, and performance tips on WordPress, Shopify, React, Next.js, and Laravel from the Webstep Solutions team.',
    canonical: 'https://webstepdev.com/blog/'
  },

  // 25. Privacy Policy
  {
    filePath: 'src/app/privacy-policy/page.js',
    importComp: `import PrivacyPolicy from '@/components/PrivacyPolicy';`,
    compJSX: `<PrivacyPolicy />`,
    slug: 'privacy-policy',
    title: 'Privacy Policy | Webstep Solutions',
    description: 'Read Webstep Solutions\' Privacy Policy to learn how we collect, use, and protect your personal information when visiting our website.',
    canonical: 'https://webstepdev.com/privacy-policy/'
  },
  {
    filePath: 'src/app/privacy/page.js',
    importComp: `import PrivacyPolicy from '@/components/PrivacyPolicy';`,
    compJSX: `<PrivacyPolicy />`,
    slug: 'privacy',
    title: 'Privacy Policy | Webstep Solutions',
    description: 'Read Webstep Solutions\' Privacy Policy to learn how we collect, use, and protect your personal information when visiting our website.',
    canonical: 'https://webstepdev.com/privacy-policy/',
    noIndex: true
  },

  // 26. Terms and Conditions
  {
    filePath: 'src/app/terms-and-conditions/page.js',
    importComp: `import TermsConditions from '@/components/TermsConditions';`,
    compJSX: `<TermsConditions />`,
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions | Webstep Solutions',
    description: 'Review the Terms and Conditions governing your use of Webstep Solutions\' website and web development services.',
    canonical: 'https://webstepdev.com/terms-and-conditions/'
  },
  {
    filePath: 'src/app/terms/page.js',
    importComp: `import TermsConditions from '@/components/TermsConditions';`,
    compJSX: `<TermsConditions />`,
    slug: 'terms',
    title: 'Terms and Conditions | Webstep Solutions',
    description: 'Review the Terms and Conditions governing your use of Webstep Solutions\' website and web development services.',
    canonical: 'https://webstepdev.com/terms-and-conditions/',
    noIndex: true
  },

  // UI/UX & Mobile App & Fullstack (Secondary / Alias)
  {
    filePath: 'src/app/uiux/page.js',
    importComp: `import Ui from '@/components/uiux/Ui';`,
    compJSX: `<Ui />`,
    slug: 'uiux',
    title: 'UI/UX Design Services | Web & App Design | Webstep Solutions',
    description: 'User-first interface design for websites and apps, from wireframes to approved Figma designs, ready for development. Request a design quote.',
    canonical: 'https://webstepdev.com/services/ui-ux/'
  },
  {
    filePath: 'src/app/mobileApp/page.js',
    importComp: `import MobileApp from '@/components/mobileapp/MobileApp';`,
    compJSX: `<MobileApp />`,
    slug: 'mobileApp',
    title: 'Mobile App Development Company | iOS & Android | Webstep Solutions',
    description: 'Native iOS apps in Swift and Android apps in Kotlin, from idea to App Store and Play Store launch. Share your app idea and get a quote.',
    canonical: 'https://webstepdev.com/services/app-development/'
  },
  {
    filePath: 'src/app/fullstack/page.js',
    importComp: `import FullStack from '@/components/Fullstack/FullStack';`,
    compJSX: `<FullStack />`,
    slug: 'fullstack',
    title: 'Full Stack Development Services | Node.js, Vue & APIs | Webstep Solutions',
    description: 'Full stack developers for Vue, Node.js and PHP projects, API integrations and AI chatbot builds. Get a clear scope and quote for your project.',
    canonical: 'https://webstepdev.com/services/web-development/'
  },
  {
    filePath: 'src/app/seo/page.js',
    importComp: `import Seo from '@/components/seo/Seo';`,
    compJSX: `<Seo />`,
    slug: 'seo',
    title: 'SEO Services | Technical SEO & Core Web Vitals | Webstep Solutions',
    description: 'Technical SEO audits, Core Web Vitals fixes and conversion improvements for business websites. Request an SEO audit.',
    canonical: 'https://webstepdev.com/services/seo/'
  },
  {
    filePath: 'src/app/our-team/page.js',
    importComp: `import OurTeamPage from '@/components/team/OurTeamPage';`,
    compJSX: `<OurTeamPage />`,
    slug: 'our-team',
    title: 'Our Team | Developers Behind Webstep Solutions',
    description: 'Meet the developers, designers and project managers who build and support your projects at Webstep Solutions.',
    canonical: 'https://webstepdev.com/about/'
  },
  {
    filePath: 'src/app/team/page.js',
    importComp: `import OurTeamPage from '@/components/team/OurTeamPage';`,
    compJSX: `<OurTeamPage />`,
    slug: 'team',
    title: 'Our Team | Developers Behind Webstep Solutions',
    description: 'Meet the developers, designers and project managers who build and support your projects at Webstep Solutions.',
    canonical: 'https://webstepdev.com/about/'
  },

  // Private / Internal routes (noindex)
  {
    filePath: 'src/app/industrial-training/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="industrial-training" />`,
    slug: 'industrial-training',
    title: 'Industrial Training in Web Development, Mohali | Webstep Solutions',
    description: 'Career-ready web development training programs in Mohali for students and freshers. Check the courses and apply.',
    noIndex: true
  }
];

const projectRoot = __dirname;

for (const p of pages) {
  const absPath = path.join(projectRoot, p.filePath);
  const dir = path.dirname(absPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const code = createPageCode(p);
  fs.writeFileSync(absPath, code, 'utf8');
  console.log(`Generated page: ${p.filePath}`);
}

console.log('Successfully written clean page code with Section 3a titles, descriptions, and canonicals to all routes!');
