import React from 'react';
import Casestudiespage from '@/components/CaseStudies/Casestudiespage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("case-study");
  return {
    title: dynamicSeo.title || "Web Development Case Studies | Webstep",
    description: dynamicSeo.description || "See how we planned, built and delivered web projects for real clients, with the problem, the tech used and the results.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Casestudiespage />;
}
