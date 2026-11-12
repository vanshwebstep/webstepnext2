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
  "wordpress",
  "ui-ux",
  "app-development",
  "seo"
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
    title: "UI/UX Design Services | Webstep Solutions",
    description: "User-first interface design for websites and apps, from wireframes to approved Figma designs, ready for development. Request a design quote.",
  },
  "app-development": {
    title: "Mobile App Development | iOS & Android | Webstep Solutions",
    description: "Native iOS apps in Swift and Android apps in Kotlin, from idea to App Store and Play Store launch. Share your app idea and get a quote.",
  },
  "seo": {
    title: "Technical SEO Services | Webstep Solutions",
    description: "Technical SEO audits, Core Web Vitals fixes and conversion improvements for business websites. Request an SEO audit.",
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
    const targetUrl = `https://webstepsolutions.com${REDIRECT_MAP[slug]}`;
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
        canonical: `https://webstepsolutions.com/services/${slug}/`
      },
      robots: { index: false, follow: false }
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
  const canonicalUrl = `https://webstepsolutions.com/services/${slug}/`;

  return {
    title: dynamicSeo.title || finalTitle,
    description: dynamicSeo.description || fallbackDesc,
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: canonicalUrl
    },
    robots: { index: false, follow: false }
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