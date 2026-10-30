import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("php");
  return {
    title: dynamicSeo.title || "Redirecting to PHP Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions PHP Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/php-development/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/php-development/" />
    </>
  );
}
