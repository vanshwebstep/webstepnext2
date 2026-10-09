import React from 'react';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("privacy");
  return {
    title: dynamicSeo.title || "Privacy Policy | Webstep Solutions",
    description: dynamicSeo.description || "Privacy Policy | Webstep Solutions",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    robots: { index: false, follow: true }
  };
}

export default function Page() {
  return <PrivacyPolicy />;
}
