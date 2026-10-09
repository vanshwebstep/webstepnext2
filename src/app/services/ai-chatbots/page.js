import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ai-chatbots");
  return {
    title: dynamicSeo.title || "AI Chatbot Development Services | Custom Chatbots",
    description: dynamicSeo.description || "Custom AI chatbots and API integrations that handle support questions, qualify leads and automate routine work. Tell us what you want to automate.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="services/ai-chatbots" />;
}
