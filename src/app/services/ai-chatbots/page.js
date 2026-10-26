import React from 'react';
import AIChatbotsServicePage from '@/components/AIChatbots/AIChatbotsServicePage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ai-chatbots");
  return {
    title: dynamicSeo.title || "Custom AI Chatbot Development & Virtual Assistants | Webstep Solutions",
    description: dynamicSeo.description || "Custom AI chatbots and virtual assistants that handle customer support, qualify leads, and automate workflows 24/7 across web and WhatsApp.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/ai-chatbots/",
    }
  };
}

export default function Page() {
  return (
    <>
      <AIChatbotsServicePage />
    </>
  );
}
