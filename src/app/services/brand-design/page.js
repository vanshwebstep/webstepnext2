import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/brand-design");
  return {
    title: dynamicSeo.title || "Brand Design & Logo Design Services | Webstep Solutions",
    description: dynamicSeo.description || "Strategic brand identity, visual guidelines, logo design, and UI kits crafted to make your brand recognizable and memorable. Request a brand quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepsolutions.com/services/brand-design/",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="brand-design" />
    </>
  );
}
