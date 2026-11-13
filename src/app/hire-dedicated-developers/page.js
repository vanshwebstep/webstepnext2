import React from 'react';
import B2BSalesPage from '@/components/B2BSalesPage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = (await fetchSeoMetadata("hire-dedicated-developers")) || (await fetchSeoMetadata("b2b-sales"));
  const title = dynamicSeo?.title || "Hire Dedicated Developers & Agency Development Partner | Webstep Solutions";
  const description = dynamicSeo?.description || "Dedicated developers and white-label engineering teams for agencies and growing businesses. Onboarded in 2 to 3 business days, US/CA/AU overlap, and strict NDA protection.";
  const canonicalUrl = "https://webstepsolutions.com/hire-dedicated-developers/";
  const imageUrl = "https://webstepsolutions.com/webstepassets/img/logo.png";

  return {
    title,
    description,
    ...(dynamicSeo?.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Webstep Solutions",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Webstep Solutions - Hire Dedicated Developers",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return (
    <>
      <B2BSalesPage />
    </>
  );
}
