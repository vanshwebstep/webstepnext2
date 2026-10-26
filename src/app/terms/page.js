import React from 'react';
import TermsConditions from '@/components/TermsConditions';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("terms");
  return {
    title: dynamicSeo.title || "Terms and Conditions | Webstep Solutions",
    description: dynamicSeo.description || "Review the Terms and Conditions governing your use of Webstep Solutions' website and web development services.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/terms-and-conditions/",
    },
    robots: { index: false, follow: false }
  };
}

export default function Page() {
  return (
    <>
      <TermsConditions />
    </>
  );
}
