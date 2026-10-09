import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("hire-full-time-developers");
  return {
    title: dynamicSeo.title || "Hire Dedicated Developers | Monthly Remote Teams | Webstep",
    description: dynamicSeo.description || "Hire vetted React, Laravel, WordPress and Shopify developers monthly. Work with them directly, with QA and weekly reporting. NDA-ready.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="hire-full-time-developers" />;
}
