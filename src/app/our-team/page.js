import React from 'react';
import OurTeamPage from '@/components/team/OurTeamPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("our-team");
  return {
    title: dynamicSeo.title || "Our Team | Developers Behind Webstep Solutions",
    description: dynamicSeo.description || "Meet the developers, designers and project managers who build and support your projects at Webstep Solutions.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <OurTeamPage />;
}
