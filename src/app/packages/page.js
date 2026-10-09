import React from 'react';
import Packages from '@/components/Packages';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("packages");
  return {
    title: dynamicSeo.title || "Web Development Packages & Pricing | Webstep",
    description: dynamicSeo.description || "Choose a clear web development package for your project, or customize one to fit your needs. See what is included and request a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Packages />;
}
