// app/services/[slug]/page.jsx

import ServiceDetailPage from "@/components/Servicedetailpage";
import RedirectClient from "@/components/RedirectClient";
import { fetchSeoMetadata } from "@/lib/contentApi";

// Static route folders exist for these 15 primary services:
const staticServiceFolders = new Set([
  "ai-automation",
  "ai-chatbots",
  "ai-powered-websites",
  "brand-design",
  "ecommerce",
  "email-marketing",
  "laravel",
  "php-development",
  "reactjs",
  "shopify",
  "social-media",
  "web-development",
  "website-maintenance",
  "woocommerce",
  "wordpress"
]);

// Aliases and redirect mappings for old URLs
const REDIRECT_MAP = {
  "wordpress-website": "/services/wordpress/",
  "wp-themes": "/services/wordpress/",
  "wp-plugins": "/services/wordpress/",
  "shopify-development": "/services/shopify/",
  "shopify-themes": "/services/shopify/",
  "shopify-apps": "/services/shopify/",
  "woocommerce-development": "/services/woocommerce/",
  "woo": "/services/woocommerce/",
  "full-stack-development": "/fullstack/",
  "fullstack": "/fullstack/",
  "branding": "/services/brand-design/",
  "ai": "/services/ai-powered-websites/",
  "ai-websites": "/services/ai-powered-websites/",
  "ai-integration": "/services/ai-automation/",
  "laravel-development": "/services/laravel/",
  "php": "/services/php-development/",
  "react-js-dev": "/services/reactjs/",
  "next-js-dev": "/services/reactjs/",
  "react": "/services/reactjs/",
  "nextjs": "/services/reactjs/",
  "nodejs-development": "/services/web-development/",
  "nodejs": "/services/web-development/",
  "vue-js-dev": "/services/web-development/",
  "vue": "/services/web-development/",
  "vuejs": "/services/web-development/",
  "psd-to-html": "/services/web-development/",
  "sketch-to-html": "/services/web-development/",
  "software-testing": "/services/web-development/",
  "softwaretesting": "/services/web-development/",
  "testing": "/services/web-development/",
  "qa": "/services/web-development/",
  "qa-testing": "/services/web-development/",
};

// Unique metadata for dynamic primary service pages (P1.3)
const SERVICE_SEO = {
  "ui-ux": {
    title: "UI/UX Design Services | Figma, Wireframing & Prototyping | Webstep Solutions",
    description: "Human-centered UI/UX design services. We craft intuitive user journeys, wireframes, interactive Figma prototypes, and complete design systems for web and mobile apps.",
  },
  "app-development": {
    title: "Mobile App Development Services | iOS & Android Apps | Webstep Solutions",
    description: "Custom mobile application development for iOS and Android using Flutter and React Native. Scalable backends, smooth UI, and end-to-end store deployment.",
  },
  "seo": {
    title: "Technical SEO & Search Engine Optimization Services | Webstep Solutions",
    description: "Data-backed SEO services for sustainable organic growth: comprehensive technical SEO audits, Core Web Vitals optimization, and on-page search strategy.",
  },
};

// All secondary/alias slugs (excluding static route folders to prevent conflict)
const services = [
  // App & Mobile
  "app-development",
  "mobile-app-development",
  "mobileapp",
  "mobile",
  "app",
  "flutter",
  "react-native",

  // UI/UX
  "ui-ux",
  "uiux",
  "ui-ux-designing",
  "figma",
  "ui-design",
  "ux-design",
  "design",

  // SEO & Branding
  "seo",
  "branding",

  // Dev stack aliases
  "full-stack-development",
  "fullstack",
  "nodejs-development",
  "nodejs",
  "php",
  "software-testing",
  "softwaretesting",
  "laravel-development",
  "wordpress-website",
  "wp-themes",
  "wp-plugins",
  "shopify-development",
  "shopify-themes",
  "shopify-apps",
  "woocommerce-development",
  "woo",
  "react-js-dev",
  "next-js-dev",
  "vue-js-dev",
  "react",
  "nextjs",
  "vue",
  "vuejs",
  "psd-to-html",
  "sketch-to-html",
  "email-templates",
  "testing",
  "qa",
  "qa-testing",

  // AI aliases
  "ai",
  "ai-websites",
  "ai-integration"
].filter((slug) => !staticServiceFolders.has(slug));

// Pre-generates static HTML for every dynamic slug at build time
export async function generateStaticParams() {
  return services.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // If this is an alias/old URL that redirects, give it noindex and point canonical to target
  if (REDIRECT_MAP[slug]) {
    const targetUrl = `https://webstepdev.com${REDIRECT_MAP[slug]}`;
    return {
      title: "Redirecting... | Webstep Solutions",
      description: "Redirecting to current service page...",
      robots: { index: false, follow: false },
      alternates: {
        canonical: targetUrl
      }
    };
  }

  // If we have custom rich SEO (P1.3)
  if (SERVICE_SEO[slug]) {
    const dynamicSeo = await fetchSeoMetadata(`services/${slug}`);
    return {
      title: dynamicSeo.title || SERVICE_SEO[slug].title,
      description: dynamicSeo.description || SERVICE_SEO[slug].description,
      ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
      alternates: {
        canonical: `https://webstepdev.com/services/${slug}/`
      }
    };
  }

  let formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  if (slug === "ui-ux" || slug === "uiux" || slug === "ui-ux-designing") {
    formattedTitle = "UI/UX Design";
  } else if (slug === "seo") {
    formattedTitle = "SEO";
  } else if (slug === "php" || slug === "php-development") {
    formattedTitle = "PHP Development";
  } else if (slug === "nodejs" || slug === "nodejs-development") {
    formattedTitle = "Node.js Development";
  }

  const finalTitle = formattedTitle.endsWith("Services") || formattedTitle.endsWith("Design") || formattedTitle.endsWith("Development")
    ? `${formattedTitle} | Webstep Solutions`
    : `${formattedTitle} Services | Webstep Solutions`;

  const fallbackDesc = `Learn more about our ${formattedTitle} services at Webstep Solutions.`;
  const dynamicSeo = await fetchSeoMetadata(`services/${slug}`);
  const canonicalUrl = `https://webstepdev.com/services/${slug}/`;

  return {
    title: dynamicSeo.title || finalTitle,
    description: dynamicSeo.description || fallbackDesc,
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: canonicalUrl
    }
  };
}

// The page itself — redirects aliases or renders detail component
export default async function Page({ params }) {
  const { slug } = await params;
  if (REDIRECT_MAP[slug]) {
    return <RedirectClient target={REDIRECT_MAP[slug]} />;
  }
  return <ServiceDetailPage serviceSlug={slug} />;
}