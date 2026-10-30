import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("laravel");
  return {
    title: dynamicSeo.title || "Redirecting to Laravel Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions Laravel Development Services.",
    alternates: {
      canonical: "https://webstepdev.com/services/laravel/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/services/laravel/" />
    </>
  );
}
