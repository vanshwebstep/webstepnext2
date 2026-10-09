import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/woocommerce");
  return {
    title: dynamicSeo.title || "WooCommerce Development Services | Custom Online Stores",
    description: dynamicSeo.description || "Custom WooCommerce stores with tailored product types, checkout flows and payment gateways. Migrations and plugin development included.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="services/woocommerce" />;
}
