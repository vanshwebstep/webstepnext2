import React from 'react';
import AIAutomationPage from '@/components/AIAutomation/AIAutomationPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ai-automation");
  return {
    title: dynamicSeo.title || "AI Automation & Workflow Services | Webstep Solutions",
    description: dynamicSeo.description || "Intelligent workflow automation and AI integrations connecting your CRMs, ERPs, and databases with modern LLMs and machine learning models.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepsolutions.com/services/ai-automation/",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return (
    <>
      <AIAutomationPage />
    </>
  );
}
