import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("mobileApp");
  return {
    title: dynamicSeo.title || "Redirecting to Mobile App Development | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions mobile app development services.",
    alternates: {
      canonical: "https://webstepdev.com/services/app-development/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/app-development/" />
    </>
  );
}
