import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("web-development");
  return {
    title: dynamicSeo.title || "Redirecting to Web Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions Web Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/web-development/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/web-development/" />
    </>
  );
}
