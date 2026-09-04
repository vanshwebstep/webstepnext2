import Seo from '@/components/seo/Seo';
import React from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('seo');
  return {
    title: dynamicSeo.title || "SEO Services | Webstep Solutions",
    description: dynamicSeo.description || "Search Engine Optimization & SEO Services by Webstep Solutions.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function SeoPage() {
  return <Seo/>;
}
