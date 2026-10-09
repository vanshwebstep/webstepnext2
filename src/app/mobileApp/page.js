import React from 'react';
import MobileApp from '@/components/mobileapp/MobileApp';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("mobileApp");
  return {
    title: dynamicSeo.title || "Mobile App Development Company | iOS & Android | Webstep",
    description: dynamicSeo.description || "Native iOS apps in Swift and Android apps in Kotlin, from idea to App Store and Play Store launch. Share your app idea and get a quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <MobileApp />;
}
