// app/services/[slug]/page.jsx

import ServiceDetailPage from "@/components/Servicedetailpage";
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

// ─── All secondary/alias slugs (excluding static route folders to prevent conflict) ────────
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

// Canonical resolution for dynamic slugs
const CANONICAL_MAP = {
  "shopify-development": "https://webstepdev.com/services/shopify/",
  "shopify-themes": "https://webstepdev.com/services/shopify/",
  "shopify-apps": "https://webstepdev.com/services/shopify/",
  "woocommerce-development": "https://webstepdev.com/services/woocommerce/",
  "woo": "https://webstepdev.com/services/woocommerce/",
  "wordpress-website": "https://webstepdev.com/services/wordpress/",
  "wp-themes": "https://webstepdev.com/services/wordpress/",
  "wp-plugins": "https://webstepdev.com/services/wordpress/",
  "laravel-development": "https://webstepdev.com/services/laravel/",
  "php": "https://webstepdev.com/services/php-development/",
  "react-js-dev": "https://webstepdev.com/services/reactjs/",
  "next-js-dev": "https://webstepdev.com/services/reactjs/",
  "react": "https://webstepdev.com/services/reactjs/",
  "nextjs": "https://webstepdev.com/services/reactjs/",
  "full-stack-development": "https://webstepdev.com/services/web-development/",
  "fullstack": "https://webstepdev.com/services/web-development/",
  "nodejs-development": "https://webstepdev.com/services/web-development/",
  "nodejs": "https://webstepdev.com/services/web-development/",
  "vue-js-dev": "https://webstepdev.com/services/web-development/",
  "vue": "https://webstepdev.com/services/web-development/",
  "vuejs": "https://webstepdev.com/services/web-development/",
  "psd-to-html": "https://webstepdev.com/services/web-development/",
  "sketch-to-html": "https://webstepdev.com/services/web-development/",
  "software-testing": "https://webstepdev.com/services/web-development/",
  "softwaretesting": "https://webstepdev.com/services/web-development/",
  "testing": "https://webstepdev.com/services/web-development/",
  "qa": "https://webstepdev.com/services/web-development/",
  "qa-testing": "https://webstepdev.com/services/web-development/",
  "app-development": "https://webstepdev.com/services/app-development/",
  "mobile-app-development": "https://webstepdev.com/services/app-development/",
  "mobileapp": "https://webstepdev.com/services/app-development/",
  "mobile": "https://webstepdev.com/services/app-development/",
  "app": "https://webstepdev.com/services/app-development/",
  "flutter": "https://webstepdev.com/services/app-development/",
  "react-native": "https://webstepdev.com/services/app-development/",
  "ui-ux": "https://webstepdev.com/services/ui-ux/",
  "uiux": "https://webstepdev.com/services/ui-ux/",
  "ui-ux-designing": "https://webstepdev.com/services/ui-ux/",
  "figma": "https://webstepdev.com/services/ui-ux/",
  "ui-design": "https://webstepdev.com/services/ui-ux/",
  "ux-design": "https://webstepdev.com/services/ui-ux/",
  "design": "https://webstepdev.com/services/ui-ux/",
  "seo": "https://webstepdev.com/services/seo/",
  "branding": "https://webstepdev.com/services/brand-design/",
  "email-templates": "https://webstepdev.com/services/email-marketing/",
  "ai": "https://webstepdev.com/services/ai-powered-websites/",
  "ai-websites": "https://webstepdev.com/services/ai-powered-websites/",
  "ai-integration": "https://webstepdev.com/services/ai-automation/"
};

// Pre-generates static HTML for every dynamic slug at build time
export async function generateStaticParams() {
  return services.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
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
  const canonicalUrl = CANONICAL_MAP[slug] || `https://webstepdev.com/services/${slug}/`;

  return {
    title: dynamicSeo.title || finalTitle,
    description: dynamicSeo.description || fallbackDesc,
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: canonicalUrl
    }
  };
}

// The page itself — passes slug down to the detail component
export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceDetailPage serviceSlug={slug} />;
}