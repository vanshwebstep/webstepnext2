import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("reactjs");
  return {
    title: dynamicSeo.title || "Redirecting to React.js Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions React.js Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/reactjs/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/reactjs/" />
    </>
  );
}
