import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/brand-design");
  return {
    title: dynamicSeo.title || "Brand Design & Identity Services | Webstep Solutions",
    description: dynamicSeo.description || "Complete brand identity design: logos, design systems, typography guidelines, and brand collateral that make your business instantly recognizable.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/brand-design/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="brand-design" />
    </>
  );
}
