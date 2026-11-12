import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("ai-automation");
  return {
    title: dynamicSeo.title || "AI Automation & Workflow Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions AI Automation Services.",
    alternates: {
      canonical: "https://webstepsolutions.com/services/ai-automation/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/ai-automation/" />
    </>
  );
}
