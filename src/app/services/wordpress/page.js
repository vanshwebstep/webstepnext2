import React from 'react';
import Wp from '@/components/Wp/Wp';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/wordpress");
  return {
    title: dynamicSeo.title || "WordPress Development Services | Themes & Plugins | Webstep Solutions",
    description: dynamicSeo.description || "Custom WordPress development by Webstep Solutions: hand-coded themes, bespoke plugins, WooCommerce, and headless WordPress with Next.js. Fast, secure, and SEO-ready.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/wordpress/",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return (
    <>
      <Wp />
    </>
  );
}
