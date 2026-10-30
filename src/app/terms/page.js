import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("terms");
  return {
    title: dynamicSeo.title || "Redirecting to Terms and Conditions | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions Terms and Conditions.",
    alternates: {
      canonical: "https://webstepdev.com/terms-and-conditions/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/terms-and-conditions/" />
    </>
  );
}
