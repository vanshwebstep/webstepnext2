import React from 'react';
import RedirectClient from '@/components/RedirectClient';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("contact");
  return {
    title: dynamicSeo.title || "Redirecting to Contact Us | Webstep Solutions",
    description: dynamicSeo.description || "Redirecting to Webstep Solutions contact page.",
    alternates: {
      canonical: "https://webstepdev.com/contactus/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <RedirectClient target="/contactus/" />
    </>
  );
}
