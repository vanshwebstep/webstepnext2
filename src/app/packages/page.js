import React from 'react';
import Packages from '@/components/Packages';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("packages");
  return {
    title: dynamicSeo.title || "Web Development Packages & Transparent Pricing | Webstep Solutions",
    description: dynamicSeo.description || "Transparent web development packages for websites, eCommerce stores, and dedicated developer hiring. Compare plans and request a custom quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/packages/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Packages />
    </>
  );
}
