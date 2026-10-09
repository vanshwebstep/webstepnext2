import React from 'react';
import B2BSalesPage from '@/components/B2BSalesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("b2b-sales");
  return {
    title: dynamicSeo.title || "Development Partner for Agencies | Webstep",
    description: dynamicSeo.description || "A reliable development partner for design and marketing agencies. WordPress, Shopify and custom builds with NDA-ready engagement.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <B2BSalesPage />;
}
