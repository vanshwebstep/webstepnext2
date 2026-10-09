import React from 'react';
import OurProjects from '@/components/Projects/OurProjects';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("projects");
  return {
    title: dynamicSeo.title || "Web Development Portfolio | Webstep Solutions",
    description: dynamicSeo.description || "Recent projects built with React, Next.js, Laravel and WordPress for healthcare, SaaS, infrastructure and non-profit clients. See the results.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <OurProjects />;
}
