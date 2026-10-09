const fs = require('fs');
const path = require('path');

function createPageCode({ importComp, compJSX, slug, title, description, noIndex }) {
  const robotsLine = noIndex ? `,\n    robots: { index: false, follow: true }` : '';
  return `import React from 'react';
${importComp}
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata(${JSON.stringify(slug)});
  return {
    title: dynamicSeo.title || ${JSON.stringify(title)},
    description: dynamicSeo.description || ${JSON.stringify(description)},
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})${robotsLine}
  };
}

export default function Page() {
  return ${compJSX};
}
`;
}

const pages = [
  // Home
  {
    filePath: 'src/app/page.js',
    importComp: `import Home from '@/components/HomePage/Home';`,
    compJSX: `<Home />`,
    slug: '/',
    title: 'Web Development Company & Dedicated Developers | Webstep',
    description: 'Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Hire dedicated developers monthly. Request a quote.'
  },

  // Services page
  {
    filePath: 'src/app/services/page.js',
    importComp: `import ServicesPage from '@/components/ServicesPage';`,
    compJSX: `<ServicesPage />`,
    slug: 'services',
    title: 'Web Development Services | WordPress, Shopify, Next.js',
    description: 'Web development services covering WordPress, Shopify, WooCommerce, Next.js and Laravel, plus API integrations. See what we build and request a quote.'
  },

  // Web Development
  {
    filePath: 'src/app/web-development/page.js',
    importComp: `import FullStack from '@/components/Fullstack/FullStack';`,
    compJSX: `<FullStack />`,
    slug: 'web-development',
    title: 'Custom Web Development Services | Next.js, React, Laravel',
    description: 'Custom websites and web apps built on Next.js, React and Laravel. Fast, SEO-ready code from a dedicated team. Tell us about your project.'
  },
  {
    filePath: 'src/app/services/web-development/page.js',
    importComp: `import FullStack from '@/components/Fullstack/FullStack';`,
    compJSX: `<FullStack />`,
    slug: 'services/web-development',
    title: 'Custom Web Development Services | Next.js, React, Laravel',
    description: 'Custom websites and web apps built on Next.js, React and Laravel. Fast, SEO-ready code from a dedicated team. Tell us about your project.'
  },

  // WordPress
  {
    filePath: 'src/app/wordpress/page.js',
    importComp: `import Wp from '@/components/Wp/Wp';`,
    compJSX: `<Wp />`,
    slug: 'wordpress',
    title: 'WordPress Development Services | Custom Themes & Plugins',
    description: 'Hand-coded WordPress themes, custom plugins and headless builds from your Figma designs. No page-builder bloat. Request a WordPress quote.'
  },
  {
    filePath: 'src/app/services/wordpress/page.js',
    importComp: `import Wp from '@/components/Wp/Wp';`,
    compJSX: `<Wp />`,
    slug: 'services/wordpress',
    title: 'WordPress Development Services | Custom Themes & Plugins',
    description: 'Hand-coded WordPress themes, custom plugins and headless builds from your Figma designs. No page-builder bloat. Request a WordPress quote.'
  },

  // WooCommerce
  {
    filePath: 'src/app/woocommerce/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="woocommerce" />`,
    slug: 'woocommerce',
    title: 'WooCommerce Development Services | Custom Online Stores',
    description: 'Custom WooCommerce stores with tailored product types, checkout flows and payment gateways. Migrations and plugin development included.'
  },
  {
    filePath: 'src/app/services/woocommerce/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/woocommerce" />`,
    slug: 'services/woocommerce',
    title: 'WooCommerce Development Services | Custom Online Stores',
    description: 'Custom WooCommerce stores with tailored product types, checkout flows and payment gateways. Migrations and plugin development included.'
  },

  // Shopify
  {
    filePath: 'src/app/shopify/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="shopify" />`,
    slug: 'shopify',
    title: 'Shopify Development Services | Custom Themes & Apps',
    description: 'Custom Shopify themes, Liquid development and private apps for brands and agencies. Shopify Plus and store migrations supported. Get a quote.'
  },
  {
    filePath: 'src/app/services/shopify/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/shopify" />`,
    slug: 'services/shopify',
    title: 'Shopify Development Services | Custom Themes & Apps',
    description: 'Custom Shopify themes, Liquid development and private apps for brands and agencies. Shopify Plus and store migrations supported. Get a quote.'
  },

  // eCommerce
  {
    filePath: 'src/app/ecommerce/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="ecommerce" />`,
    slug: 'ecommerce',
    title: 'eCommerce Development Company | Shopify & WooCommerce',
    description: 'Build or migrate your online store on Shopify, WooCommerce or a headless setup. Conversion-focused design, ERP and POS integrations, ongoing support.'
  },
  {
    filePath: 'src/app/services/ecommerce/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/ecommerce" />`,
    slug: 'services/ecommerce',
    title: 'eCommerce Development Company | Shopify & WooCommerce',
    description: 'Build or migrate your online store on Shopify, WooCommerce or a headless setup. Conversion-focused design, ERP and POS integrations, ongoing support.'
  },

  // Laravel
  {
    filePath: 'src/app/laravel/page.js',
    importComp: `import Laravel from '@/components/laravel/Laravel';`,
    compJSX: `<Laravel />`,
    slug: 'laravel',
    title: 'Laravel Development Company | Custom PHP Web Apps',
    description: 'Secure Laravel applications, REST APIs and custom PHP development, from MVPs to systems built to scale. Talk to a Laravel developer.'
  },
  {
    filePath: 'src/app/services/laravel/page.js',
    importComp: `import Laravel from '@/components/laravel/Laravel';`,
    compJSX: `<Laravel />`,
    slug: 'services/laravel',
    title: 'Laravel Development Company | Custom PHP Web Apps',
    description: 'Secure Laravel applications, REST APIs and custom PHP development, from MVPs to systems built to scale. Talk to a Laravel developer.'
  },

  // Hire Developers
  {
    filePath: 'src/app/hire-full-time-developers/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="hire-full-time-developers" />`,
    slug: 'hire-full-time-developers',
    title: 'Hire Dedicated Developers | Monthly Remote Teams | Webstep',
    description: 'Hire vetted React, Laravel, WordPress and Shopify developers monthly. Work with them directly, with QA and weekly reporting. NDA-ready.'
  },

  // Website Maintenance & Support
  {
    filePath: 'src/app/website-maintenance/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="website-maintenance" />`,
    slug: 'website-maintenance',
    title: 'Website Maintenance & Support Services | Webstep',
    description: 'Ongoing website maintenance for WordPress, Shopify and custom sites: updates, security, bug fixes and speed checks. Ask about a monthly plan.'
  },
  {
    filePath: 'src/app/services/website-maintenance/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/website-maintenance" />`,
    slug: 'services/website-maintenance',
    title: 'Website Maintenance & Support Services | Webstep',
    description: 'Ongoing website maintenance for WordPress, Shopify and custom sites: updates, security, bug fixes and speed checks. Ask about a monthly plan.'
  },

  // Portfolio
  {
    filePath: 'src/app/works/page.js',
    importComp: `import WorkPortfolio from '@/components/ourworks/WorkPortfolio';`,
    compJSX: `<WorkPortfolio />`,
    slug: 'works',
    title: 'Web Development Portfolio | Webstep Solutions',
    description: 'Recent projects built with React, Next.js, Laravel and WordPress for healthcare, SaaS, infrastructure and non-profit clients. See the results.'
  },
  {
    filePath: 'src/app/projects/page.js',
    importComp: `import OurProjects from '@/components/Projects/OurProjects';`,
    compJSX: `<OurProjects />`,
    slug: 'projects',
    title: 'Web Development Portfolio | Webstep Solutions',
    description: 'Recent projects built with React, Next.js, Laravel and WordPress for healthcare, SaaS, infrastructure and non-profit clients. See the results.'
  },

  // About
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
    title: 'About Webstep | Web Development Team Since 2012',
    description: 'Mohali-based team with 12+ years building WordPress, Shopify and custom web apps for clients in 15+ countries. Meet the people behind Webstep.'
  },

  // Contact
  {
    filePath: 'src/app/contactus/page.js',
    importComp: `import Contact from '@/components/contactus/Contact';`,
    compJSX: `<Contact />`,
    slug: 'contactus',
    title: 'Contact Webstep | Request a Web Development Quote',
    description: 'Tell us about your project or the developers you need. Share your requirements and we will reply within one business day.'
  },

  // App Development
  {
    filePath: 'src/app/mobileApp/page.js',
    importComp: `import MobileApp from '@/components/mobileapp/MobileApp';`,
    compJSX: `<MobileApp />`,
    slug: 'mobileApp',
    title: 'Mobile App Development Company | iOS & Android | Webstep',
    description: 'Native iOS apps in Swift and Android apps in Kotlin, from idea to App Store and Play Store launch. Share your app idea and get a quote.'
  },

  // Full Stack Development
  {
    filePath: 'src/app/fullstack/page.js',
    importComp: `import FullStack from '@/components/Fullstack/FullStack';`,
    compJSX: `<FullStack />`,
    slug: 'fullstack',
    title: 'Full Stack Development Services | Node.js, Vue & APIs',
    description: 'Full stack developers for Vue, Node.js and PHP projects, API integrations and AI chatbot builds. Get a clear scope and quote for your project.'
  },

  // AI Chatbots
  {
    filePath: 'src/app/ai-chatbots/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="ai-chatbots" />`,
    slug: 'ai-chatbots',
    title: 'AI Chatbot Development Services | Custom Chatbots',
    description: 'Custom AI chatbots and API integrations that handle support questions, qualify leads and automate routine work. Tell us what you want to automate.'
  },
  {
    filePath: 'src/app/services/ai-chatbots/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/ai-chatbots" />`,
    slug: 'services/ai-chatbots',
    title: 'AI Chatbot Development Services | Custom Chatbots',
    description: 'Custom AI chatbots and API integrations that handle support questions, qualify leads and automate routine work. Tell us what you want to automate.'
  },

  // UI/UX Design
  {
    filePath: 'src/app/uiux/page.js',
    importComp: `import Ui from '@/components/uiux/Ui';`,
    compJSX: `<Ui />`,
    slug: 'uiux',
    title: 'UI/UX Design Services | Web & App Design | Webstep',
    description: 'User-first interface design for websites and apps, from wireframes to approved Figma designs, ready for development. Request a design quote.'
  },

  // React & Next.js
  {
    filePath: 'src/app/services/reactjs/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/reactjs" />`,
    slug: 'services/reactjs',
    title: 'React & Next.js Development Services | Webstep',
    description: 'Fast, SEO-friendly web apps built with React and Next.js, with server-side rendering and clean, scalable code. Tell us about your project.'
  },
  {
    filePath: 'src/app/reactjs/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="reactjs" />`,
    slug: 'reactjs',
    title: 'React & Next.js Development Services | Webstep',
    description: 'Fast, SEO-friendly web apps built with React and Next.js, with server-side rendering and clean, scalable code. Tell us about your project.'
  },

  // PHP
  {
    filePath: 'src/app/php/page.js',
    importComp: `import Php from '@/components/php/Php';`,
    compJSX: `<Php />`,
    slug: 'php',
    title: 'PHP Development Services | Custom PHP & Laravel Apps',
    description: 'Custom PHP development, from web applications and APIs to upgrades of older systems. Talk to a PHP developer about your project.'
  },
  {
    filePath: 'src/app/services/php-development/page.js',
    importComp: `import Php from '@/components/php/Php';`,
    compJSX: `<Php />`,
    slug: 'services/php-development',
    title: 'PHP Development Services | Custom PHP & Laravel Apps',
    description: 'Custom PHP development, from web applications and APIs to upgrades of older systems. Talk to a PHP developer about your project.'
  },

  // Case Studies
  {
    filePath: 'src/app/case-study/page.js',
    importComp: `import Casestudiespage from '@/components/CaseStudies/Casestudiespage';`,
    compJSX: `<Casestudiespage />`,
    slug: 'case-study',
    title: 'Web Development Case Studies | Webstep',
    description: 'See how we planned, built and delivered web projects for real clients, with the problem, the tech used and the results.'
  },

  // Packages
  {
    filePath: 'src/app/packages/page.js',
    importComp: `import Packages from '@/components/Packages';`,
    compJSX: `<Packages />`,
    slug: 'packages',
    title: 'Web Development Packages & Pricing | Webstep',
    description: 'Choose a clear web development package for your project, or customize one to fit your needs. See what is included and request a quote.'
  },

  // For Agencies
  {
    filePath: 'src/app/b2b-sales/page.js',
    importComp: `import B2BSalesPage from '@/components/B2BSalesPage';`,
    compJSX: `<B2BSalesPage />`,
    slug: 'b2b-sales',
    title: 'Development Partner for Agencies | Webstep',
    description: 'A reliable development partner for design and marketing agencies. WordPress, Shopify and custom builds with NDA-ready engagement.'
  },

  // Our Team
  {
    filePath: 'src/app/our-team/page.js',
    importComp: `import OurTeamPage from '@/components/team/OurTeamPage';`,
    compJSX: `<OurTeamPage />`,
    slug: 'our-team',
    title: 'Our Team | Developers Behind Webstep Solutions',
    description: 'Meet the developers, designers and project managers who build and support your projects at Webstep Solutions.'
  },
  {
    filePath: 'src/app/team/page.js',
    importComp: `import OurTeamPage from '@/components/team/OurTeamPage';`,
    compJSX: `<OurTeamPage />`,
    slug: 'team',
    title: 'Our Team | Developers Behind Webstep Solutions',
    description: 'Meet the developers, designers and project managers who build and support your projects at Webstep Solutions.'
  },

  // Blog
  {
    filePath: 'src/app/blog/page.js',
    importComp: `import Blog from '@/components/Blog/Blog';`,
    compJSX: `<Blog />`,
    slug: 'blog',
    title: 'Web Development Blog | Webstep Solutions',
    description: 'Practical guides on choosing platforms, hiring developers and building better websites, from the Webstep development team.'
  },

  // Get a Quote
  {
    filePath: 'src/app/customize-package/page.js',
    importComp: `import CustomizePackage from '@/components/CustomizePackage';`,
    compJSX: `<CustomizePackage />`,
    slug: 'customize-package',
    title: 'Get a Free Quote | Customize Your Project | Webstep',
    description: 'Tell us what you need built and get a clear quote. Choose your services and share your requirements in two minutes.'
  },

  // SEO Services
  {
    filePath: 'src/app/seo/page.js',
    importComp: `import Seo from '@/components/seo/Seo';`,
    compJSX: `<Seo />`,
    slug: 'seo',
    title: 'SEO Services | Technical SEO & Core Web Vitals | Webstep',
    description: 'Technical SEO audits, Core Web Vitals fixes and conversion improvements for business websites. Request an SEO audit.'
  },

  // Social Media
  {
    filePath: 'src/app/social-media/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="social-media" />`,
    slug: 'social-media',
    title: 'Social Media Marketing Services | Webstep',
    description: 'Social media content and paid ads for businesses. Plan your campaigns with our team.'
  },
  {
    filePath: 'src/app/services/social-media/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/social-media" />`,
    slug: 'services/social-media',
    title: 'Social Media Marketing Services | Webstep',
    description: 'Social media content and paid ads for businesses. Plan your campaigns with our team.'
  },

  // Email Marketing
  {
    filePath: 'src/app/email-marketing/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="email-marketing" />`,
    slug: 'email-marketing',
    title: 'Email Marketing Services | Webstep',
    description: 'Email campaigns and automation that bring customers back. Tell us your goal and get a plan.'
  },
  {
    filePath: 'src/app/services/email-marketing/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/email-marketing" />`,
    slug: 'services/email-marketing',
    title: 'Email Marketing Services | Webstep',
    description: 'Email campaigns and automation that bring customers back. Tell us your goal and get a plan.'
  },

  // Brand Design
  {
    filePath: 'src/app/brand-design/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="brand-design" />`,
    slug: 'brand-design',
    title: 'Brand Design & Logo Design Services | Webstep',
    description: 'Logos and brand identity design for new and growing businesses. Share your brand idea and get a quote.'
  },
  {
    filePath: 'src/app/services/brand-design/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="services/brand-design" />`,
    slug: 'services/brand-design',
    title: 'Brand Design & Logo Design Services | Webstep',
    description: 'Logos and brand identity design for new and growing businesses. Share your brand idea and get a quote.'
  },

  // Industrial Training
  {
    filePath: 'src/app/industrial-training/page.js',
    importComp: `import DynamicServiceLanding from '@/components/DynamicServiceLanding';`,
    compJSX: `<DynamicServiceLanding slug="industrial-training" />`,
    slug: 'industrial-training',
    title: 'Industrial Training in Web Development, Mohali | Webstep',
    description: 'Career-ready web development training programs in Mohali for students and freshers. Check the courses and apply.',
    noIndex: true
  },

  // Privacy Policy
  {
    filePath: 'src/app/privacy/page.js',
    importComp: `import PrivacyPolicy from '@/components/PrivacyPolicy';`,
    compJSX: `<PrivacyPolicy />`,
    slug: 'privacy',
    title: 'Privacy Policy | Webstep Solutions',
    description: 'Privacy Policy | Webstep Solutions',
    noIndex: true
  },

  // Terms of Service
  {
    filePath: 'src/app/terms/page.js',
    importComp: `import TermsConditions from '@/components/TermsConditions';`,
    compJSX: `<TermsConditions />`,
    slug: 'terms',
    title: 'Terms of Service | Webstep Solutions',
    description: 'Terms of Service | Webstep Solutions',
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

console.log('Successfully written clean page code to all routes!');
