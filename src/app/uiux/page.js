import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("uiux");
  return {
    title: dynamicSeo.title || "Redirecting to UI/UX Design Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions UI/UX design services.",
    alternates: {
      canonical: "https://webstepdev.com/services/ui-ux/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/ui-ux/" />
    </>
  );
}
