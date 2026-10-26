import React from 'react';
import Casestudiespage from '@/components/CaseStudies/Casestudiespage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("case-study");
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
      <Casestudiespage />
    </>
  );
}
