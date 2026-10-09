import React from 'react';
import FullStack from '@/components/Fullstack/FullStack';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("fullstack");
  return {
    title: dynamicSeo.title || "Full Stack Development Services | Node.js, Vue & APIs",
    description: dynamicSeo.description || "Full stack developers for Vue, Node.js and PHP projects, API integrations and AI chatbot builds. Get a clear scope and quote for your project.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <FullStack />;
}
