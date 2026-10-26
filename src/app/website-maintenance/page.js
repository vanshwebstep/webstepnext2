import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("website-maintenance");
  return {
    title: dynamicSeo.title || "Website Maintenance & Support Plans | Webstep Solutions",
    description: dynamicSeo.description || "Proactive website maintenance for WordPress, Shopify, and custom stacks: security patching, plugin updates, speed monitoring, and dedicated developer hours.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/website-maintenance/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="website-maintenance" />
    </>
  );
}
