import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("shopify");
  return {
    title: dynamicSeo.title || "Redirecting to Shopify Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions Shopify Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/shopify/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/shopify/" />
    </>
  );
}
