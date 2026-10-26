import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/woocommerce");
  return {
    title: dynamicSeo.title || "WooCommerce Development Services | Custom Online Stores | Webstep Solutions",
    description: dynamicSeo.description || "Tailored WooCommerce development for high-volume stores: custom themes, payment gateway integration, subscription architecture, and speed optimization.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/woocommerce/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="woocommerce" />
    </>
  );
}
