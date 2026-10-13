import React from 'react';
import AIAutomationPage from '@/components/AIAutomation/AIAutomationPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("ai-automation");
  return {
    title: dynamicSeo.title || "AI Automation & Smart Workflows | Webstep Solutions",
    description: dynamicSeo.description || "Automate repetitive business workflows, CRM synchronization, intelligent document processing, and multi-agent systems with custom AI solutions.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : { keywords: "AI automation, AI workflows, multi-agent AI, intelligent document processing, webstep solutions" })
  };
}

export default function Page() {
  return <AIAutomationPage />;
}
