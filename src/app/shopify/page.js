import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("shopify");
  return {
    title: dynamicSeo.title || "Shopify Development Services | Custom Themes & Apps",
    description: dynamicSeo.description || "Custom Shopify themes, Liquid development and private apps for brands and agencies. Shopify Plus and store migrations supported. Get a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="shopify" />;
}
