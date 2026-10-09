import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/social-media");
  return {
    title: dynamicSeo.title || "Social Media Marketing Services | Webstep",
    description: dynamicSeo.description || "Social media content and paid ads for businesses. Plan your campaigns with our team.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="services/social-media" />;
}
