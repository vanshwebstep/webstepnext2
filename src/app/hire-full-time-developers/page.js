import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("hire-full-time-developers");
  return {
    title: dynamicSeo.title || "Redirecting to Hire Dedicated Developers | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions dedicated developer hiring page.",
    alternates: {
      canonical: "https://webstepdev.com/hire-dedicated-developers/",
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
