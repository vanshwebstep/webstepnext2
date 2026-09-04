// app/services/[slug]/page.jsx

import ServiceDetailPage from "@/components/Servicedetailpage";
import { fetchSeoMetadata } from "@/lib/contentApi";

// ─── All valid slugs (deduplicated + typo fixed) ──────────────────────────────
const services = [
  // General / marketing
  "web-development",
  "app-development",
  "ecommerce",
  "ui-ux",
  "seo",
  "branding",

  // Design-to-code
  "psd-to-html",
  "sketch-to-html",
  "email-templates",

  // Dev stack
  "mobile-app-development",
  "ui-ux-designing",
  "full-stack-development",
  "software-testing",
  "laravel-development",
  "nodejs-development",
  "php-development",
  "wordpress-website",

  // AI & framework aliases
  "ai",
  "ai-chatbots",
  "ai-integration",
  "react-js-dev",
  "next-js-dev",
  "vue-js-dev",
  "shopify",
  "shopify-development",
  "shopify-themes",
  "shopify-apps",
  "wp-themes",
  "wp-plugins",
  "mobileapp",
  "uiux",
  "fullstack",
  "softwaretesting",
  "laravel",
  "nodejs",
  "php",
  "wordpress",
  "react",
  "reactjs",
  "nextjs",
  "vue",
  "vuejs",
  "flutter",
  "react-native",
  "figma",
  "ui-design",
  "ux-design",
  "design",
  "testing",
  "qa",
  "qa-testing",
  "mobile",
  "web",
  "app",
];

// Pre-generates static HTML for every slug at build time (Next.js App Router)
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

  return {
    title: dynamicSeo.title || finalTitle,
    description: dynamicSeo.description || fallbackDesc,
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

// The page itself — passes slug down to the detail component
export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceDetailPage serviceSlug={slug} />;
}