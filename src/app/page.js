import React from 'react';
import Home from '@/components/HomePage/Home';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("/");
  return {
    title: dynamicSeo.title || "Web Development Company & Dedicated Developers | Webstep",
    description: dynamicSeo.description || "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Hire dedicated developers monthly. Request a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Home />;
}
