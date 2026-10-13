import React from 'react';
import AIPoweredWebsitesPage from '@/components/AIPoweredWebsites/AIPoweredWebsitesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ai-powered-websites");
  return {
    title: dynamicSeo.title || "AI-Powered Website Development Services | Next.js & LLMs",
    description: dynamicSeo.description || "Build high-performance, intelligent Next.js websites integrated with custom LLMs, vector semantic RAG search, dynamic personalization, and autonomous lead capture.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : { keywords: "AI powered websites, Next.js AI, LLM integration, intelligent websites, webstep solutions" })
  };
}

export default function Page() {
  return <AIPoweredWebsitesPage />;
}
