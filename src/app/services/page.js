import React from 'react';
import ServicesPage from '@/components/ServicesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services");
  return {
    title: dynamicSeo.title || "Web Development Services | WordPress, Shopify, Next.js, Laravel | Webstep Solutions",
    description: dynamicSeo.description || "Explore Webstep Solutions' full suite of web development services: WordPress, Shopify, WooCommerce, React.js, Next.js, Laravel, and AI integrations.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServicesPage />
    </>
  );
}
