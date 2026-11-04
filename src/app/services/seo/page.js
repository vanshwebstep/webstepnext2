import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/seo");
  return {
    title: dynamicSeo.title || "Technical SEO Services | Webstep Solutions",
    description: dynamicSeo.description || "Technical SEO audits, Core Web Vitals fixes and conversion improvements for business websites. Request an SEO audit.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/seo/",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="seo" />
    </>
  );
}
