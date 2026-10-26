import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/social-media");
  return {
    title: dynamicSeo.title || "Social Media Creative & Digital Assets | Webstep Solutions",
    description: dynamicSeo.description || "High-impact visual assets and creative collateral for social media campaigns that reinforce your brand identity and drive engagement.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/social-media/",
    }
  };
}

export default function Page() {
  return (
    <>
      <DynamicServiceLanding slug="services/social-media" />
    </>
  );
}
