import React from 'react';
import Wp from '@/components/Wp/Wp';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("wordpress");
  return {
    title: dynamicSeo.title || "Custom WordPress Development Company | Themes & Plugins | Webstep Solutions",
    description: dynamicSeo.description || "Custom WordPress development by Webstep Solutions: hand-coded themes, bespoke plugins, WooCommerce, and headless WordPress with Next.js. No page builders.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/wordpress/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Wp />
    </>
  );
}
