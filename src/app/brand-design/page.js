import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("brand-design");
  return {
    title: dynamicSeo.title || "Brand Design & Logo Design Services | Webstep",
    description: dynamicSeo.description || "Logos and brand identity design for new and growing businesses. Share your brand idea and get a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="brand-design" />;
}
