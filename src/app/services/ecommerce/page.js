import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ecommerce");
  return {
    title: dynamicSeo.title || "eCommerce Development Company | Shopify & WooCommerce",
    description: dynamicSeo.description || "Build or migrate your online store on Shopify, WooCommerce or a headless setup. Conversion-focused design, ERP and POS integrations, ongoing support.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="services/ecommerce" />;
}
