import React from 'react';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("privacy");
  return {
    title: dynamicSeo.title || "Privacy Policy | Webstep Solutions",
    description: dynamicSeo.description || "Read Webstep Solutions' Privacy Policy to learn how we collect, use, and protect your personal information when visiting our website.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/privacy-policy/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
}
