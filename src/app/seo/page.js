import React from 'react';
import Seo from '@/components/seo/Seo';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("seo");
  return {
    title: dynamicSeo.title || "SEO Services | Technical SEO & Core Web Vitals | Webstep",
    description: dynamicSeo.description || "Technical SEO audits, Core Web Vitals fixes and conversion improvements for business websites. Request an SEO audit.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Seo />;
}
