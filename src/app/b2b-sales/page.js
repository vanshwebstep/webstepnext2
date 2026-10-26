import React from 'react';
import B2BSalesPage from '@/components/B2BSalesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("b2b-sales");
  return {
    title: dynamicSeo.title || "Hire Dedicated Developers for Your Web Projects | Webstep Solutions",
    description: dynamicSeo.description || "Hire dedicated full-time WordPress, Shopify, React, and Laravel developers monthly. Flexible engagement models, US/CA/AU time-zone overlap, NDA protected.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/hire-full-time-developers/",
    }
  };
}

export default function Page() {
  return (
    <>
      <B2BSalesPage />
    </>
  );
}
