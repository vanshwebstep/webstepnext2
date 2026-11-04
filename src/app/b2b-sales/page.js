import React from 'react';
import B2BSalesPage from '@/components/B2BSalesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("b2b-sales");
  return {
    title: dynamicSeo.title || "Development Partner for Agencies | Webstep Solutions",
    description: dynamicSeo.description || "White-label web development and dedicated engineering teams for digital agencies. Fast onboarding, US/CA/AU overlap, and strict NDA protection.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/b2b-sales/",
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
      <B2BSalesPage />
    </>
  );
}
