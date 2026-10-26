import React from 'react';
import AIAutomationPage from '@/components/AIAutomation/AIAutomationPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("ai-automation");
  return {
    title: dynamicSeo.title || "AI Automation & Workflow Integration Services | Webstep Solutions",
    description: dynamicSeo.description || "Intelligent workflow automation and AI integrations connecting your CRMs, ERPs, and databases with modern LLMs and machine learning models.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/ai-automation/",
    }
  };
}

export default function Page() {
  return (
    <>
      <AIAutomationPage />
    </>
  );
}
