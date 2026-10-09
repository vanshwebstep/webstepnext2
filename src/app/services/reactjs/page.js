import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/reactjs");
  return {
    title: dynamicSeo.title || "React & Next.js Development Services | Webstep",
    description: dynamicSeo.description || "Fast, SEO-friendly web apps built with React and Next.js, with server-side rendering and clean, scalable code. Tell us about your project.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="services/reactjs" />;
}
