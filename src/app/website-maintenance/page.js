import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("website-maintenance");
  return {
    title: dynamicSeo.title || "Website Maintenance & Support Services | Webstep",
    description: dynamicSeo.description || "Ongoing website maintenance for WordPress, Shopify and custom sites: updates, security, bug fixes and speed checks. Ask about a monthly plan.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="website-maintenance" />;
}
