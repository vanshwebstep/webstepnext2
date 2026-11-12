import React from 'react';
import B2BSalesPage from '@/components/B2BSalesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = (await fetchSeoMetadata("hire-dedicated-developers")) || (await fetchSeoMetadata("b2b-sales"));
  return {
    title: dynamicSeo?.title || "Hire Dedicated Developers & Agency Development Partner | Webstep Solutions",
    description: dynamicSeo?.description || "Dedicated developers and white-label engineering teams for agencies and growing businesses. Onboarded in 2 to 5 business days, US/CA/AU overlap, and strict NDA protection.",
    ...(dynamicSeo?.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepsolutions.com/hire-dedicated-developers/",
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
      <B2BSalesPage />
    </>
  );
}
