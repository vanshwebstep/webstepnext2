import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("nodejs");
  return {
    title: dynamicSeo.title || "Redirecting to Web Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions Node.js web development services.",
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
