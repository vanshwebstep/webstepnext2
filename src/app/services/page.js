import React from 'react';
import ServicesPage from '@/components/ServicesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services");
  return {
    title: dynamicSeo.title || "Web Development Services | WordPress, Shopify, Next.js",
    description: dynamicSeo.description || "Web development services covering WordPress, Shopify, WooCommerce, Next.js and Laravel, plus API integrations. See what we build and request a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <ServicesPage />;
}
