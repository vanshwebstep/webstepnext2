import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("wordpress");
  return {
    title: dynamicSeo.title || "Redirecting to WordPress Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions WordPress Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/wordpress/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/wordpress/" />
    </>
  );
}
