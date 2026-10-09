import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("email-marketing");
  return {
    title: dynamicSeo.title || "Email Marketing Services | Webstep",
    description: dynamicSeo.description || "Email campaigns and automation that bring customers back. Tell us your goal and get a plan.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="email-marketing" />;
}
