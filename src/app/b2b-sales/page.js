import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("b2b-sales");
  return {
    title: dynamicSeo?.title || "Redirecting to Hire Dedicated Developers | Webstep Solutions",
    description: dynamicSeo?.description || "Redirecting to Webstep Solutions dedicated developers page.",
    alternates: {
      canonical: "https://webstepsolutions.com/hire-dedicated-developers/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/hire-dedicated-developers/" />
    </>
  );
}
