import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("privacy");
  return {
    title: dynamicSeo.title || "Redirecting to Privacy Policy | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions Privacy Policy.",
    alternates: {
      canonical: "https://webstepdev.com/privacy-policy/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/privacy-policy/" />
    </>
  );
}
