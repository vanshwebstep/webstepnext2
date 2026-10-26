import React from 'react';
import WorkPortfolio from '@/components/ourworks/WorkPortfolio';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("works");
  return {
    title: dynamicSeo.title || "Case Studies & Portfolio | Web Development Work | Webstep Solutions",
    description: dynamicSeo.description || "Explore Webstep Solutions' portfolio: 120+ delivered projects across healthcare, fintech, SaaS, eCommerce, and education with verified metrics.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/case-study/",
    }
  };
}

export default function Page() {
  return (
    <>
      <WorkPortfolio />
    </>
  );
}
