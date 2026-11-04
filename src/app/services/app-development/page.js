import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/app-development");
  return {
    title: dynamicSeo.title || "Mobile App Development | iOS & Android | Webstep Solutions",
    description: dynamicSeo.description || "Native iOS apps in Swift and Android apps in Kotlin, from idea to App Store and Play Store launch. Share your app idea and get a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/app-development/",
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
      <ServiceDetailPage serviceSlug="app-development" />
    </>
  );
}
