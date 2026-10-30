import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("seo");
  return {
    title: dynamicSeo.title || "Redirecting to SEO Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions SEO services.",
    alternates: {
      canonical: "https://webstepdev.com/services/seo/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/seo/" />
    </>
  );
}
