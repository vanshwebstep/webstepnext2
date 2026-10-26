import React from 'react';
import AIPoweredWebsitesPage from '@/components/AIPoweredWebsites/AIPoweredWebsitesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ai-powered-websites");
  return {
    title: dynamicSeo.title || "AI-Powered Website Development | Webstep Solutions",
    description: dynamicSeo.description || "Next-generation websites with built-in AI search, personalized recommendations, automated content pipelines, and intelligent user experiences.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/ai-powered-websites/",
    }
  };
}

export default function Page() {
  return (
    <>
      <AIPoweredWebsitesPage />
    </>
  );
}
