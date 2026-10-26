import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ecommerce");
  return {
    title: dynamicSeo.title || "eCommerce Development Services | Shopify & WooCommerce | Webstep Solutions",
    description: dynamicSeo.description || "End-to-end eCommerce development on Shopify, WooCommerce, and custom headless stacks. Optimized product catalogs, checkout flows, and ERP integrations.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/ecommerce/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="ecommerce" />
    </>
  );
}
