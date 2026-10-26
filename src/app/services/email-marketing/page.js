import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/email-marketing");
  return {
    title: dynamicSeo.title || "Responsive Email Template Design & Development | Webstep Solutions",
    description: dynamicSeo.description || "Hand-coded, responsive HTML email templates tested across all major email clients (Gmail, Outlook, Apple Mail) and marketing automation platforms.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/email-marketing/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="email-marketing" />
    </>
  );
}
