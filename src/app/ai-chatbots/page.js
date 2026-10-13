import React from 'react';
import AIChatbotsServicePage from '@/components/AIChatbots/AIChatbotsServicePage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("ai-chatbots");
  return {
    title: dynamicSeo.title || "AI Chatbot & Virtual Assistant Development Services | Webstep",
    description: dynamicSeo.description || "Custom AI chatbots and conversational assistants that handle support questions, qualify leads and book meetings 24/7 across web & WhatsApp.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : { keywords: "AI chatbots, virtual assistants, WhatsApp AI bot, customer support AI, webstep solutions" })
  };
}

export default function Page() {
  return <AIChatbotsServicePage />;
}
