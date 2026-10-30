import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("woocommerce");
  return {
    title: dynamicSeo.title || "Redirecting to WooCommerce Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions WooCommerce Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/woocommerce/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/woocommerce/" />
    </>
  );
}
