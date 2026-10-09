import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("industrial-training");
  return {
    title: dynamicSeo.title || "Industrial Training in Web Development, Mohali | Webstep",
    description: dynamicSeo.description || "Career-ready web development training programs in Mohali for students and freshers. Check the courses and apply.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    robots: { index: false, follow: true }
  };
}

export default function Page() {
  return <DynamicServiceLanding slug="industrial-training" />;
}
