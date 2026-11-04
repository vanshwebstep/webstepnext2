import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/ui-ux");
  return {
    title: dynamicSeo.title || "UI/UX Design Services | Webstep Solutions",
    description: dynamicSeo.description || "User-first interface design for websites and apps, from wireframes to approved Figma designs, ready for development. Request a design quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/ui-ux/",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="ui-ux" />
    </>
  );
}
