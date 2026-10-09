import React from 'react';
import TermsConditions from '@/components/TermsConditions';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("terms");
  return {
    title: dynamicSeo.title || "Terms of Service | Webstep Solutions",
    description: dynamicSeo.description || "Terms of Service | Webstep Solutions",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    robots: { index: false, follow: true }
  };
}

export default function Page() {
  return <TermsConditions />;
}
