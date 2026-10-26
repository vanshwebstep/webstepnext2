import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("shopify");
  return {
    title: dynamicSeo.title || "Shopify Development Services | Themes, Apps & Shopify Plus | Webstep Solutions",
    description: dynamicSeo.description || "Custom Shopify themes, Liquid development, private apps, and Shopify Plus setups engineered to increase conversions and average order value.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/shopify/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="shopify" />
    </>
  );
}
